import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { AuthService } from "../auth/auth.service";
import { FriendsService } from "../friend/friends.service";
import { v4 as uuidv4 } from 'uuid';
import { GameService } from "../game/game.service";
import { GameDto, Player } from "../game/game.dto";
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
    private games = new Map<number, GameDto>();



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

    private updatePaddlesPosition(gameData: GameDto) {
        const paddles = gameData.paddles;
        const width = gameData.tableWidth;

        if (paddles.paddle1.x + paddles.paddle1.dx >= 0 && paddles.paddle1.x + paddles.paddle1.dx + paddles.width <= width) {
            paddles.paddle1.x += paddles.paddle1.dx;
        }
        if (paddles.paddle2.x + paddles.paddle2.dx >= 0 && paddles.paddle2.x + paddles.paddle2.dx + paddles.width <= width) {
            paddles.paddle2.x += paddles.paddle2.dx;
        }
    }

    private updateAiPaddlePosition(gameData: GameDto) {

        const paddles = gameData.paddles;
        const ball = gameData.ball;

        const paddle1Middle = paddles.paddle1.x + paddles.width / 2;
        const paddle2Middle = paddles.paddle2.x + paddles.width / 2;
        let randomPos = Math.random() * 20;

        if (ball.x > paddle2Middle + randomPos) {
            paddles.paddle2.dx = paddles.speed;
        }
        else if (ball.x < paddle2Middle - randomPos) {
            paddles.paddle2.dx = -paddles.speed;
        } else {
            paddles.paddle2.dx = 0;
        }


        // paddle 1
        if (ball.x > paddle1Middle + randomPos) {
            paddles.paddle1.dx = paddles.speed;
        }
        else if (ball.x < paddle1Middle - randomPos) {
            paddles.paddle1.dx = -paddles.speed;
        }
        else {
            paddles.paddle1.dx = 0;
        }
    }

    private restBallPosition(gameData: GameDto) {
        const ball = gameData.ball;
        const width = gameData.tableWidth;
        const height = gameData.tableHeight;
        ball.x = width / 2;
        ball.y = height / 2;
        ball.dy *= -1;
        ball.dx *= -1;
      }

    private handleBall(gameData: GameDto) {
        const ball = gameData.ball;
        const paddles = gameData.paddles;
        const width = gameData.tableWidth;
        let newBallX = ball.x + ball.dx;
        let newBallY = ball.y + ball.dy;

        // handle ball and wall collision
        if (newBallX - ball.radius <= 0 || newBallX + ball.radius >= width) {
            ball.dx *= -1;
        }


        // Check for collision with paddle 2 (bottom paddle)
        if (newBallY + ball.radius >= paddles.paddle2.y
            && newBallX + ball.radius >= paddles.paddle2.x
            && newBallX - ball.radius <= paddles.paddle2.x + paddles.width
        ) {
            // console.log("paddle 2 hit");
            let middlePaddle2 = paddles.paddle2.x + paddles.width / 2;
            let distanceBallXPaddleMiddle = ball.x - middlePaddle2;
            let newAngel = (((paddles.width / 2) - (distanceBallXPaddleMiddle)) / (paddles.width / 2)) * (Math.PI / 2);
            ball.dx = ball.speed * (Math.cos(newAngel));
            ball.dy = ball.speed * (Math.sin(newAngel));
            ball.dy *= -1;
        }

        // Check for collision with paddle 1 (top paddle)
        if (newBallY - ball.radius <= paddles.paddle1.y + paddles.height
            && newBallX + ball.radius >= paddles.paddle1.x
            && newBallX - ball.radius <= paddles.paddle1.x + paddles.width) {
            // console.log("paddle 1 hit");
            let middlePaddle1 = newBallX + paddles.width / 2;
            let distanceBallXPaddleMiddle = paddles.paddle1.x - middlePaddle1;
            let newAngel = (((paddles.width / 2) - (distanceBallXPaddleMiddle)) / (paddles.width / 2)) * (Math.PI / 2);
            ball.dx = ball.speed * (Math.cos(newAngel));
            ball.dy = ball.speed * (Math.sin(newAngel));
            ball.dy *= -1;
        }

        // check for Goal
        if (newBallY + ball.radius >= paddles.paddle2.y + (paddles.height)) {
            // console.log("Goal for player 1");
            this.restBallPosition(gameData);
        }

        if (newBallY - ball.radius <= paddles.paddle1.y) {
            // console.log("Goal for player 2");
            this.restBallPosition(gameData);
        }

        ball.x += ball.dx;
        ball.y += ball.dy;

    }

    private startGame(gameId: number) {
        const gameData = this.games.get(gameId);
        // console.log("start game and the users Sockets are: ", gameData.player1.socketId, " and ", gameData.player2.socketId);
        if (gameData.player1 && gameData.player2) {
            const interval = setInterval(() => {
                this.updatePaddlesPosition(gameData);
                this.updateAiPaddlePosition(gameData);
                this.handleBall(gameData);
                const client1Ball = { ...gameData.ball };
                const client2Ball = { ...gameData.ball };
                this.server.to(gameData.player1.socketId).emit("move", gameData.player2.userId, client1Ball, gameData.paddles);
                client2Ball.y = gameData.tableHeight - client2Ball.y;
                this.server.to(gameData.player2.socketId).emit("move", gameData.player2.userId, client2Ball, gameData.paddles);
            }, 1000 / 60);
        }
    }


    @WebSocketServer() server: Server;
    async handleConnection(socket: Socket) {
        const userId = await this.getUserId(socket);
        // console.log("new One connected", userId);
        if (userId) {
            this.addUser(userId, socket.id);
            const onlineFriends = await this.getFriendsOnline(userId);
            this.server.to(socket.id).emit("onlineFriends", onlineFriends.map((friend) => friend.userId));
            onlineFriends.forEach((Friend) => { this.server.to(Friend.socketId).emit("onlineOne", { userId, status: true, }); });
        }
    }

    async handleDisconnect(socket: Socket) {
        const user = this.users.find((user) => user.socketId === socket.id);
        console.log("One disconnected", user);
        if (user) {
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
        const sender = this.users.find((user) => user.userId === data.sender);
        const receiver = this.users.find((user) => user.userId === data.receiver);
        if (receiver && sender) {
            this.server.to(receiver.socketId).emit("invitation", data);
        }
    }

    @SubscribeMessage("accept")
    async handleAccept(socket: Socket, data: any) {
        const gameId = uuidv4();
        const sender = this.users.find((user) => user.userId === data.sender);
        const receiver = this.users.find((user) => user.userId === data.receiver);
        if (receiver && sender) {
            const player1: Player = { ...sender, score: 0 };
            const player2: Player = { ...receiver, score: 0 };
            const gameData: GameDto = this.gameService.create(gameId, player1, player2);
            this.games.set(gameId, gameData);
            this.server.to(sender.socketId).emit("start", gameData);
            this.server.to(receiver.socketId).emit("start", gameData);
            this.startGame(gameId);
        }
    }


}