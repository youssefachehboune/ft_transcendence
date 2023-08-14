import { ConnectedSocket, MessageBody,
	SubscribeMessage, WebSocketGateway, WebSocketServer, WsException
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@WebSocketGateway({
	 cors: {
		origin: '*'
	},
	namespace: 'chat'
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

	private connectedUsers: Map<string, Socket[]> = new Map();

  constructor( private readonly chatService: ChatService ) {}

  async handleConnection(socket: any | Socket) {
		const user = await this.chatService.getUserFromSocket(socket);
		if (!user) {
			await socket.disconnect();
			return ;
		}
		socket.username = user.userProfile[0].username;
		const sockets = this.connectedUsers.get(socket.username);
		if (!sockets || !sockets.length)
			this.connectedUsers.set(socket.username, [socket]);
		else
			this.connectedUsers.set(socket.username, [...sockets, socket])
		const channels = await prisma.channelMembers.findMany({
			where: {
				user_id: user.id,
				OR: [
					{ MemberType: 'MEMBER'},
					{ MemberType: 'ADMIN'},
					{ MemberType: 'OWNER'}
				]
			},
			include: { Channel: true }
		});
		for (let i = 0; i < channels.length; i++)
			if (channels[i].Channel.type !== 'NOTACTIVE')
				socket.join(`${channels[i].Channel.id}`);
  }
	
	handleDisconnect(socket: Socket | any) {
		const sockets = this.connectedUsers.get(socket.username);
		if (!sockets) return;
		for (let i = 0; i < sockets.length; i++) {
			if (sockets[i].id  === socket.id)
				this.connectedUsers.set(socket.username, sockets.filter((socket) => socket.id !== sockets[i].id))
		}
  }

  @SubscribeMessage('send_message')
  async listenForMessages( @MessageBody() content: { username: string, message: string } , @ConnectedSocket() socket: Socket | any ) {
		const author = await this.chatService.getUserFromSocket(socket);
		const friend_id = (await prisma.userProfile.findUnique({
			where: { username : content.username }
		})).user_id;
		const IsFriend = await prisma.friendship.findFirst({
			where: {
				OR: [
					{ user_id: friend_id, friend_id: author.id, status: 'FRIENDS' },
					{ user_id: author.id, friend_id: friend_id, status: 'FRIENDS' }
				]
			}
		});
		if (!IsFriend)
			throw new WsException('You are not friends');
		await this.chatService.saveMessage(content, author);
		const recipient_sockets = this.connectedUsers.get(content.username);
		const sender = await prisma.userProfile.findFirst({
			where: { user_id: author.id}
		})
		const sender_sockets = this.connectedUsers.get(sender.username);
		if (sender_sockets)
			sender_sockets.forEach(sender_socket => sender_socket.emit('message_sent', content.message))
		if (recipient_sockets)
			recipient_sockets.forEach(recipient_socket => recipient_socket.emit('receive_message', content.message))
  }

	@SubscribeMessage('read_message')
	async message_read(@MessageBody() username: string , @ConnectedSocket() socket: Socket) {
		try {
			const user = await this.chatService.getUserFromSocket(socket);
			const sender_id = (await prisma.userProfile.findUnique({
				where: { username: username }
			})).user_id;
			await prisma.chat.updateMany({
				where: {
					sender_id: sender_id , recipient_id: user.id, readAt: null
				},
				data: { readAt: new Date() }
			});
			const recipient_sockets = this.connectedUsers.get(username);
			if (recipient_sockets)
				recipient_sockets.forEach(recipient_socket => recipient_socket.emit('mark_read'))
		} catch(err) {
			console.log(err);
		}
	}

	@SubscribeMessage('send_channel_message')
	async set_channel_message( @MessageBody() content: {channel: string, message: string}, @ConnectedSocket() socket: Socket) {
		const user = await this.chatService.getUserFromSocket(socket);
		const channel = await prisma.channel.findUnique({
			where: { name: content.channel }
		});
		const member = await prisma.channelMembers.findFirst({
			where: { user_id: user.id , channel_id: channel.id }
		});
		if (member.MemberType !== 'ADMIN' && member.MemberType !== 'OWNER' && member.MemberType !== 'MEMBER')
			throw new WsException('You are not a member of the channel');
		await this.chatService.saveChannelMessage(content, user);
		const blockedUsernames = await this.chatService.getBlockedUsers(Array.from(this.connectedUsers.keys()), user.id)
		const blockedSocketIds: any[] = [];
		blockedUsernames.forEach(username => {
			const sockets = this.connectedUsers.get(username);
			sockets.forEach(socket => blockedSocketIds.push(socket.id));
		});
		this.server.to(`${channel.id}`).except(blockedSocketIds).emit('receive_channel_message', {avatar: user.userProfile[0].avatar , message: content.message})
	}

	@SubscribeMessage('add_channel')
	async add_channel(@MessageBody() name: string, @ConnectedSocket() socket: Socket) {
		const channel = await prisma.channel.findUnique({
			where: { name: name }
		});
		socket.join(`${channel.id}`);
	}


	@SubscribeMessage('add_user_to_channel')
	async addUserToChannel(@MessageBody() content: { channelName: string, username:string }) {
		const channel = await prisma.channel.findUnique({
			where: { name: content.channelName }
		});
		const sockets = this.connectedUsers.get(content.username);
		if (sockets)
			sockets.forEach(socket => {
				socket.join(`${channel.id}`);
				socket.emit('request_accepted', channel);
			});
	}

	@SubscribeMessage('update_channel')
	async leave_channel(@MessageBody() content :{new?: string, username?: string,name: string, action: 'update' | 'delete' | 'Ban'}, @ConnectedSocket() socket: Socket) {
		if (content.action === 'update') {
			const channel = await prisma.channel.findUnique({
				where: { name: content.new }
			});
			this.server.to(`${channel.id}`).except(socket.id).emit('refresh', content);
		} else if (content.action == 'delete') {
			const channel = await prisma.channel.findUnique({
				where: { name: content.name }
			});
			socket.leave(`${channel.id}`);
			this.server.to(`${channel.id}`).except(socket.id).emit('refresh', content);
		} else if (content.action === 'Ban') {
			const channel = await prisma.channel.findUnique({
				where: { name: content.name }
			});
			const sockets = this.connectedUsers.get(content.username);
			if (sockets) {
				sockets.forEach(socket => socket.leave(`${channel.id}`));
				sockets.forEach(socket => socket.emit('refresh', content));
			}
		}
	}
}