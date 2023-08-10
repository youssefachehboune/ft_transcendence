import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { v4 as uuidv4 } from 'uuid';
import { GameDto, Player, Players } from "../game/game.dto";
import { GameService } from "../game/game.service";
import { AuthService } from "src/auth/auth.service";
import { FriendsService } from 'src/friend/friends.service';
import { UserService } from "./user.service";

interface Sock {
    socket: Socket;
    type: string;
}

let usersMap = new Map<number, Sock[]>();

@WebSocketGateway({ cors: { origin: '*' }, namespace: "status" })
export class UserStatusGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private gameService: GameService,
        private authService: AuthService,
        private friendsService: FriendsService,
        private userService: UserService
    ) { }


    @WebSocketServer() server: Server;

    async handleConnection(socket: Socket) {
        const userId = await this.getUserIdFromSocket(socket);
        if (userId) {
            this.addUser(userId, socket);
            const onlineFriends = await this.getFriendsOnline(userId);
            onlineFriends.forEach((Friend) => { this.server.to(Friend.socketId).emit("updateStatus", { userId: userId, type: "online" }); });
            this.server.to(socket.id).emit("onlineFriends", onlineFriends.map((friend) => friend.userId));
        }
    }

    async handleDisconnect(socket: Socket) {
        const userId = Array.from(usersMap.entries()).find(([id, sockets]) => sockets.some(s => s.socket.id === socket.id))?.[0];

        if (userId !== undefined) {
            console.log("One disconnected from Dashboard", userId, socket.id);
            this.removeUser(userId, socket);
            const onlineFriends = await this.getFriendsOnline(userId);
            onlineFriends.forEach((Friend) => {
                this.server.to(Friend.socketId).emit("updateStatus", { userId: userId, type: "offline" });
            });
        }
    }

    @SubscribeMessage("play")
    async handlePlay(socket: Socket, data: any) {
        console.log("play", data);
        if(!data.sender || !data.receiver){
            return;
        }
        const senderData = await this.userService.getUserDataByUserId(data.sender);
        const receiverData = await this.userService.getUserDataByUserId(data.receiver);
        const sender = Array.from(usersMap.values()).find(sockets => sockets.some(s => s.socket.id === socket.id))?.[0];
        const receiver = usersMap.get(data.receiver);
        if (receiver && sender && sender.type === "online") {
            receiver.forEach((s) => {
                if(s.type === "online"){
                    const DataInvite: Players = { sender: {...senderData, socketId: socket.id, score: 0, ready: false, ratio: 1 }, receiver: {...receiverData, socketId: s.socket.id, score: 0, ready: false, ratio: 1 } };
                    this.server.to(s.socket.id).emit("invitation", DataInvite);
                }
            // this.server.to(receiver.socket.id).emit("invitation", DataInvite);
            });
        }

    }

    @SubscribeMessage("accept")
    async handleAccept(socket: Socket, data: Players) {
        const gameId = uuidv4();
        const senders = usersMap.get(data.sender.userId);
        const receivers = usersMap.get(data.receiver.userId);

        const sender = senders.find((s) => s.socket.id === data.sender.socketId && s.type === "online");
        const receiver = receivers.find((r) => r.socket.id === data.receiver.socketId);

        if (receiver && sender) {
            const gameData: GameDto = this.gameService.create(gameId, data.sender, data.receiver, "multiplayer");
            this.server.to(sender.socket.id).emit("start", gameData);
            this.server.to(receiver.socket.id).emit("start", gameData);
        }
    }

    @SubscribeMessage("ingame")
    async handleIngame(socket: Socket) {
        const userId = await this.getUserIdFromSocket(socket);
        if (userId) {
            this.changeSocketsType(userId, "ingame");
        }
    }

    @SubscribeMessage("endgame")
    async handleEndgame(socket: Socket) {
        const userId = await this.getUserIdFromSocket(socket);
        if (userId) {
            this.changeSocketsType(userId, "online");
        }
    }



    async changeSocketsType(userId: number, type: string) {
        if (userId === 1337) // 1337 is the id of the bot
            return;
        const sockets = usersMap.get(userId);
        if (sockets) {
            sockets.forEach((s) => s.type = type);
        }
        const onlineFriends = await this.getFriendsOnline(userId);
        onlineFriends.forEach((Friend) => {
            this.server.to(Friend.socketId).emit("updateStatus", { userId: userId, type: type });
        });
        console.log(usersMap);
    }

    async getUserIdFromSocket(socket: Socket) {
        const cookieHeaderValue = socket.request.headers.cookie?.split(";");
        const jwt = cookieHeaderValue?.at(0)?.split("=")[1];
        if (jwt) {
            const payload = await this.authService.getUserFromToken(jwt);
            return payload["sub"];
        }
        return null;
    }

    addUser(userId: number, socket: Socket) {
        const sockets = usersMap.get(userId) || [];
        const mysocket: Sock = { socket, type: "online" };
        // check if socket already exists
        // const index = sockets.findIndex((s) => s.socket.id === socket.id);
        // if (index !== -1) {
        //     sockets[index] = mysocket;
        // } else {
            sockets.push(mysocket);
            usersMap.set(userId, sockets);
            console.log(usersMap);
        // }
    }

    removeUser(userId: number, socket: Socket) {
        const sockets = usersMap.get(userId);
        if (sockets) {
            const index = sockets.findIndex((s) => s.socket.id === socket.id);
            if (index !== -1) {
                sockets.splice(index, 1);
                if (sockets.length === 0) {
                    usersMap.delete(userId);
                }
            }
        }
        console.log(usersMap);
    }

    async getFriendsOnline(userId: number) {
        const friends = await this.friendsService.getFriendsFromUser(userId);
        if (friends?.length === 0) return [];
        return Array.from(usersMap.entries()).filter(([id]) => friends.includes(id)).map(([id]) => ({ userId: id, socketId: usersMap.get(id)?.[0]?.socket.id || '' }));
    }
}
