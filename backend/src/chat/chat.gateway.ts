import { ConnectedSocket, MessageBody,
	SubscribeMessage, WebSocketGateway, WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@WebSocketGateway({
	 cors: {
		origin: '*'
	}
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

	private connectedUsers: Map<string, Socket> = new Map();

  constructor( private readonly chatService: ChatService ) {}

  async handleConnection(socket: any | Socket) {
		const user = await this.chatService.getUserFromSocket(socket);
		if (!user) {
			await socket.disconnect();
			return ;
		}
		socket.username = user.userProfile[0].username;
		this.connectedUsers.set(socket.username, socket);
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
			socket.join(channels[i].Channel.name);
  }
	
	handleDisconnect(socket: Socket | any) {
    this.connectedUsers.delete(socket.username);
  }

  @SubscribeMessage('send_message')
  async listenForMessages( @MessageBody() content: { username: string, message: string } , @ConnectedSocket() socket: Socket ) {
		const author = await this.chatService.getUserFromSocket(socket);
		await this.chatService.saveMessage(content, author);
		const recipient_socket = this.connectedUsers.get(content.username);
		if (recipient_socket)
			recipient_socket.emit('receive_message', content.message);
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
			const recipient_socket = this.connectedUsers.get(username);
			if (recipient_socket)
				recipient_socket.emit('mark_read');
		} catch(e) {
			console.log('something went wrong when marking a message as read');
		}
	}

	@SubscribeMessage('send_channel_message')
	async set_channel_message( @MessageBody() content: {channel: string, message: string}, @ConnectedSocket() socket: Socket) {
		const user = await this.chatService.getUserFromSocket(socket);
		await this.chatService.saveChannelMessage(content, user);
		socket.to(content.channel).emit('receive_channel_message', content.message)
	}
}