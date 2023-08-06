import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { Player , GameDto } from 'src/game/game.dto';
import { GameService } from './game.service';
import { v4 as uuidv4 } from 'uuid';

interface User
{
    userId: number;
    socketId: string;
}

@WebSocketGateway({ cors: { origin: '*' }, namespace: "random" })
export class RandomGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private authService: AuthService,
        private gameService: GameService,

    ) { }
    private waitingList: User[] = [];

    private addUserToWaitingList(userId: number, socketId: string) {
        if (!this.waitingList.some((user) => user.userId === userId)) {
            this.waitingList.push({ userId, socketId });
            console.log(this.waitingList);
        }
    }

    private removeUserFromWaitingList(socketId: string) {
        this.waitingList = this.waitingList.filter((user) => user.socketId !== socketId);
        console.log(this.waitingList);
    }


    @WebSocketServer()
    server: Server;

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
            console.log("New User connected to Play in random mode:", userId);
            this.addUserToWaitingList(userId, socket.id);
            if (this.waitingList.length >= 2) {
                const gameId = uuidv4();
                const user1: User = { ...this.waitingList.shift() };
                const user2: User = { ...this.waitingList.shift() };
                const player1: Player = { ...user1 ,score: 0, ready: false, ratio: 1};
                const player2: Player = { ...user2 ,score: 0, ready: false, ratio: 1};
                const gameData: GameDto = this.gameService.create(gameId, player1, player2);
                this.server.to(user1.socketId).emit("startRandom", gameData);
                this.server.to(user2.socketId).emit("startRandom", gameData);
            }
        }
    }

    async handleDisconnect(socket: Socket) {
        const userId = await this.getUserId(socket);
        if (userId) {
            console.log("The user leave the random mode :", userId);
            this.removeUserFromWaitingList(socket.id);
        }
    }
}
