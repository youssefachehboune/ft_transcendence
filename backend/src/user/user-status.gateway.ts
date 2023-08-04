import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { AuthService } from "../auth/auth.service";
import { v4 as uuidv4 } from 'uuid';
import { FriendsService } from "../friend/friends.service";
import { GameDto, Player } from "../game/game.dto";
import { GameService } from "../game/game.service";

interface User {
    userId: number;
    socketId: string;
}

@WebSocketGateway({ cors: { origin: '*' }, namespace: "status" })
export class UserStatusGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private authService: AuthService,
        private friendService: FriendsService,
        private gameService: GameService,

    ) { }
    private users: User[] = [];

    private async getUserId(socket: Socket) {
        const cookieHeaderValue = socket.request.headers.cookie?.split(";");
        const jwt = cookieHeaderValue?.at(0)?.split("=")[1];
        if (jwt) {
            const payload = await this.authService.getUserFromToken(jwt);
            return payload["sub"];
        }
        return null;
    }

    private addUser(userId: number, socketId: string) {
        if (!this.users.some((user) => user.userId === userId)) {
            this.users.push({ userId, socketId });
            console.log(this.users);
        }
    }

    private removeUser(socketId: string) {
        this.users = this.users.filter((user) => user.socketId !== socketId);
        console.log(this.users);
    }

    private async getFriendsOnline(userId: number) {
        const friends = await this.friendService.getFriendsFromUser(userId);
        if (friends?.length === 0) return [];
        return this.users.filter((user) => friends?.includes(user.userId));
    }

    @WebSocketServer() server: Server;
    async handleConnection(socket: Socket) {
        const userId = await this.getUserId(socket);
        if (userId) {
            console.log("new One connected", userId);
            this.addUser(userId, socket.id);
            const onlineFriends = await this.getFriendsOnline(userId);
            this.server.to(socket.id).emit("onlineFriends", onlineFriends.map((friend) => friend.userId));
            onlineFriends.forEach((Friend) => { this.server.to(Friend.socketId).emit("onlineOne", { userId, status: true, }); });
        }
    }

    async handleDisconnect(socket: Socket) {
        const user = this.users.find((user) => user.socketId === socket.id);
        if (user) {
            console.log("One disconnected", user);
            this.removeUser(socket.id);
            const onlineFriends = await this.getFriendsOnline(user.userId);
            onlineFriends.forEach((Friend) => {
                this.server.to(Friend.socketId).emit("onlineOne", {
                    userId: user.userId,
                    status: false,
                });
            });
        }
    }

    @SubscribeMessage("play")
    async handlePlay(socket: Socket, data: any) {
        console.log("play", data);
        const sender = this.users.find((user) => user.userId === data.sender);
        const receiver = this.users.find((user) => user.userId === data.receiver);
        if (receiver && sender) {
            console.log("emit invitation", receiver.socketId);
            this.server.to(receiver.socketId).emit("invitation", data);
        }
    }

    @SubscribeMessage("accept")
    async handleAccept(socket: Socket, data: any) {
        const gameId = uuidv4();
        const sender = this.users.find((user) => user.userId === data.sender);
        const receiver = this.users.find((user) => user.userId === data.receiver);
        if (receiver && sender) {
            const player1: Player = { ...sender, score: 0, ready: false };
            const player2: Player = { ...receiver, score: 0, ready: false };
            const gameData: GameDto = this.gameService.create(gameId, player1, player2);
            // this.games.set(gameId, gameData);
            this.server.to(sender.socketId).emit("start", gameData);
            this.server.to(receiver.socketId).emit("start", gameData);
            // this.startGame(gameId);
        }
    }
}