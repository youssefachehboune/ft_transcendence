import {WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { GameDto, Player } from './game.dto';
import { GameService } from './game.service';
import { v4 as uuidv4 } from 'uuid';
interface User
{
    userId: number;
    socketId: string;
}

@WebSocketGateway({ cors: { origin: '*' }, namespace: "bot" })
export class BotGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor( private authService: AuthService,private gameService: GameService) { }
    @WebSocketServer()
    server: any;

    private extractJwtFromSocket(socket: Socket): string | null {
        const cookieHeaderValue = socket.request.headers.cookie?.split(";");
        return cookieHeaderValue?.at(0)?.split("=")[1] || null;
    }

    private async getUserId(socket: Socket) {
        const jwt = this.extractJwtFromSocket(socket);
        if (jwt) {
            const payload = await this.authService.getUserFromToken(jwt);
            return payload["sub"];
        }
        return null;
    }

    async handleConnection(socket: Socket) {
        const userId = await this.getUserId(socket);
        if (userId) {
            const gameId = uuidv4();
            const user: User = { userId, socketId: socket.id };
            const player1: Player = { userId, socketId: socket.id ,score: 0, ready: false, ratio: 1};
            const player2: Player = { userId : 1337, socketId: "" ,score: 0, ready: true, ratio: 1}; // bot
            const gameData: GameDto = this.gameService.create(gameId, player1, player2, "bot");
            this.server.to(user.socketId).emit("startBot", gameData);
        }
    }

    async handleDisconnect(socket: Socket) {
        console.log("disconnect");
    }
}

