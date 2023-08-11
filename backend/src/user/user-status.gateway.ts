import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { v4 as uuidv4 } from 'uuid';
import { GameDto, Player, Players } from "../game/game.dto";
import { GameService } from "../game/game.service";
import { AuthService } from "src/auth/auth.service";
import { FriendsService } from 'src/friend/friends.service';
import { UserService } from "./user.service";
import { AchievementsService } from "src/achievements/achievements.service";

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
        private userService: UserService,
        private achievementsService: AchievementsService
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
            this.removeUser(userId, socket);
            const onlineFriends = await this.getFriendsOnline(userId);
            onlineFriends.forEach((Friend) => {
                this.server.to(Friend.socketId).emit("updateStatus", { userId: userId, type: "offline" });
            });
        }
    }

    @SubscribeMessage("play")
    async handlePlay(socket: Socket, data: any) {
        if (!data.sender || !data.receiver) {
            return;
        }
        // check if receiver is not in block list of sender
        const isBlocked = await this.friendsService.isBlocked(data.sender, data.receiver);
        if (isBlocked) {
            return;
        }


        const senderData = await this.userService.getUserDataByUserId(data.sender);
        const receiverData = await this.userService.getUserDataByUserId(data.receiver);
        const sender = Array.from(usersMap.values()).find(sockets => sockets.some(s => s.socket.id === socket.id))?.[0];
        const receiver = usersMap.get(data.receiver);
        if (receiver && sender && sender.type === "online") {
            receiver.forEach((s) => {
                if (s.type === "online") {
                    const DataInvite: Players = { sender: { ...senderData, socketId: socket.id, score: 0, ready: false, ratio: 1 }, receiver: { ...receiverData, socketId: s.socket.id, score: 0, ready: false, ratio: 1 } };
                    this.server.to(s.socket.id).emit("invitation", DataInvite);
                }
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


    emitAchievement(userId: number, achievementId: number) {
        const sockets = usersMap.get(userId);
        if (sockets) {
            sockets.forEach((s) => {
                if (s.type === "online") {
                    this.server.to(s.socket.id).emit("achievement", achievementId);
                }
            });
        }
    }

    async updateAchievWin(userId: number, loserScoore: number) {
        if (await this.achievementsService.updateAchievements(userId, 7, false))
            this.emitAchievement(userId, 7);
        if (await this.achievementsService.updateAchievements(userId, 10, false))
            this.emitAchievement(userId, 10);
        if (await this.achievementsService.updateAchievements(userId, 15, false))
            this.emitAchievement(userId, 15);
        if (await this.achievementsService.updateAchievements(userId, 1, false))
            this.emitAchievement(userId, 7);
        if (await this.achievementsService.updateAchievements(userId, 5, false))
            this.emitAchievement(userId, 10);
        if (await this.achievementsService.updateAchievements(userId, 13, false))
            this.emitAchievement(userId, 15);
        if (loserScoore === 0) {
            if (await this.achievementsService.updateAchievements(userId, 1, false))
                this.emitAchievement(userId, 4);
            if (await this.achievementsService.updateAchievements(userId, 5, false))
                this.emitAchievement(userId, 9);
            if (await this.achievementsService.updateAchievements(userId, 13, false))
                this.emitAchievement(userId, 12);
        }
    }

    async updateAchievLose(userId: number) {
        if (await this.achievementsService.updateAchievements(userId, 7, true))
            this.emitAchievement(userId, 7);
        if (await this.achievementsService.updateAchievements(userId, 10, true))
            this.emitAchievement(userId, 10);
        if (await this.achievementsService.updateAchievements(userId, 15, true))
            this.emitAchievement(userId, 15);
    }

    async updateAchievBot(userId: number) {

        if (await this.achievementsService.updateAchievements(userId, 2, false))
            this.emitAchievement(userId, 2);
        if (await this.achievementsService.updateAchievements(userId, 6, false))
            this.emitAchievement(userId, 6);
        if (await this.achievementsService.updateAchievements(userId, 11, false))
            this.emitAchievement(userId, 11);
        return;
    }

    @SubscribeMessage("endgame")
    async handleEndgame(socket: Socket, data: any) {
        const userId = await this.getUserIdFromSocket(socket);
        if (userId) {
            this.changeSocketsType(userId, "online");
            if (data.loser.userId === 1) {
                await this.updateAchievBot(userId);
                return;
            }
            if (data.winner.userId === userId) {
                await this.updateAchievWin(userId, data.loser.score);
            }
            else if (data.loser.userId === userId) {
                await this.updateAchievLose(userId);
            }
        }
    }

    async changeSocketsType(userId: number, type: string) {
        if (userId === 1) // 1 is the id of the bot
            return;
        const sockets = usersMap.get(userId);
        if (sockets) {
            sockets.forEach((s) => s.type = type);
        }
        const onlineFriends = await this.getFriendsOnline(userId);
        onlineFriends.forEach((Friend) => {
            this.server.to(Friend.socketId).emit("updateStatus", { userId: userId, type: type });
        });
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
        sockets.push(mysocket);
        usersMap.set(userId, sockets);
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
    }

    async getFriendsOnline(userId: number) {
        const friends = await this.friendsService.getFriendsFromUser(userId);
        if (friends?.length === 0) return [];
        return Array.from(usersMap.entries()).filter(([id]) => friends.includes(id)).map(([id]) => ({ userId: id, socketId: usersMap.get(id)?.[0]?.socket.id || '' }));
    }
}
