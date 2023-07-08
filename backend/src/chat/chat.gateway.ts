import { ConnectedSocket, MessageBody, OnGatewayConnection,
	SubscribeMessage, WebSocketGateway, WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

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
  }
	
	handleDisconnect(socket: Socket | any) {
    this.connectedUsers.delete(socket.username);
  }

  @SubscribeMessage('send_message')
  async listenForMessages( @MessageBody() content: { username: string, message: string } , @ConnectedSocket() socket: any | Socket ) {
		const author = await this.chatService.getUserFromSocket(socket);
		await this.chatService.saveMessage(content, author);
		const recipient_socket = this.connectedUsers.get(content.username);
		if (recipient_socket)
			recipient_socket.emit('receive_message', content.message);
  }
}