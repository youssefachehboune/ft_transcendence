import {WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { GameDto, Player } from './game.dto';
import { GameService } from './game.service';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../user/user.service';


@WebSocketGateway({ cors: { origin: '*' }, namespace: "bot" })
export class BotGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor( private authService: AuthService,private gameService: GameService, private userService: UserService) { }
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
            console.log("connected one to game mode bot", userId);
            const gameId = uuidv4();
            const user: any  = await this.userService.getUserDataByUserId(userId);
            const bot : any = await this.userService.getUserDataByUserId(1337);
            if (!user || !bot) {
                return;
            }
            const player1: Player = { ...user, socketId: socket.id, score: 0, ready: true, ratio: 1 };
            const player2: Player = { ...bot, socketId: "bot", score: 0, ready: true, ratio: 1 };
            const gameData: GameDto = this.gameService.create(gameId, player1, player2, "bot");
            this.server.to(player1.socketId).emit("startBot", gameData);
        }
    }

    async handleDisconnect(socket: Socket) {
        console.log("disconnect");
    }
}

