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

    @SubscribeMessage("request_accepted")
    async handleRequestAccepted(socket: Socket, data: any) {
        const senderid = await this.getUserIdFromSocket(socket);
        const sender = usersMap.get(senderid);
        const receiver = usersMap.get(data);
        if (sender && receiver) {
            sender.forEach((s) => {
                if (s.type === "online") {
                    this.server.to(s.socket.id).emit("updateStatus", { userId: data, type: "online" });
                }
            });
            receiver.forEach((r) => {
                if (r.type === "online") {
                    this.server.to(r.socket.id).emit("updateStatus", { userId: senderid, type: "online" });
                }
            });
        }
    }



    async emitAchievement(userId: number, ashevname: string) {
        const sockets = usersMap.get(userId);
        if (sockets) {
            sockets.forEach((s) => {
                if (s.type === "online") {
                    this.server.to(s.socket.id).emit("achievement", ashevname);
                }
            });
        }
    }

    async updateAchievWin(userId: number, loserScoore: number) {
        if (await this.achievementsService.updateAchievements(userId, 'Novic', false))
            this.emitAchievement(userId, 'Novic');
        if (await this.achievementsService.updateAchievements(userId, 'Virtuoso', false))
            this.emitAchievement(userId, 'Virtuoso');
        if (await this.achievementsService.updateAchievements(userId, 'Luminary', false))
            this.emitAchievement(userId, 'Luminary');
        if (await this.achievementsService.updateAchievements(userId, 'Win Streak', false))
            this.emitAchievement(userId, 'Win Streak');
        if (await this.achievementsService.updateAchievements(userId, 'Win Streak 2', false))
            this.emitAchievement(userId, 'Win Streak 2');
        if (await this.achievementsService.updateAchievements(userId, 'Win Streak 3', false))
            this.emitAchievement(userId, 'Win Streak 3');
        if (loserScoore === 0) {
            if (await this.achievementsService.updateAchievements(userId, 'Perfect Game', false))
                this.emitAchievement(userId, 'Perfect Game');
            if (await this.achievementsService.updateAchievements(userId, 'Perfect Game 2', false))
                this.emitAchievement(userId, 'Perfect Game 2');
            if (await this.achievementsService.updateAchievements(userId, 'Perfect Game 3', false))
                this.emitAchievement(userId, 'Perfect Game 3');
        }
    }

    async updateAchievLose(userId: number) {
        if (await this.achievementsService.updateAchievements(userId, 'Win Streak', true))
            this.emitAchievement(userId, 'Win Streak');
        if (await this.achievementsService.updateAchievements(userId, 'Win Streak 2', true))
            this.emitAchievement(userId, 'Win Streak 2');
        if (await this.achievementsService.updateAchievements(userId, 'Win Streak 3', true))
            this.emitAchievement(userId, 'Win Streak 3');
    }

    async updateAchievBot(userId: number) {

        if (await this.achievementsService.updateAchievements(userId, 'Electronic Elite', false))
            this.emitAchievement(userId, 'Electronic Elite');
        if (await this.achievementsService.updateAchievements(userId, 'Electronic Elite 2', false))
            this.emitAchievement(userId, 'Electronic Elite 2');
        if (await this.achievementsService.updateAchievements(userId, 'Electronic Elite 3', false))
            this.emitAchievement(userId, 'Electronic Elite 3');
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
		@SubscribeMessage("myoppdisconnected")
    async handleMyOppDisconnected(socket: Socket, data: any) {
        const opp = usersMap.get(data);
        if (opp) {
            this.changeSocketsType(data, "online");
        }
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
