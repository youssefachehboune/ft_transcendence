import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { GameService } from "./game.service";
import { GameDto, Ball } from "../game/game.dto";
import { AuthService } from "../auth/auth.service";


@WebSocketGateway({ cors: { origin: '*' }, namespace: "game" })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(
        private gameService: GameService,
        private authService: AuthService,

    ) { }

    @WebSocketServer() server: Server;

    async handleConnection(socket: Socket) {
        const userId = await this.getUserId(socket);
        if (userId) {
            console.log("connected one to game", userId);
            const game = this.gameService.getGameByUserId(userId, socket.id);
            if (game && game.player1.ready && game.player2.ready) {
                await this.startGame(game.gameId);
            }
        }
    }

    async handleDisconnect(socket: Socket) {
        const userId = await this.getUserId(socket);
        if (userId) {
            console.log("disconnected one from game", userId);
            const game = this.gameService.getGameByUserId(userId, socket.id);
            if (game) {
                if (game.player2.socketId === socket.id)
                    this.server.to(game.player1.socketId).emit("opponentDisconnected");
                else if (game.player1.socketId === socket.id)
                    this.server.to(game.player2.socketId).emit("opponentDisconnected");
                this.gameService.deleteGame(game.gameId);
            }
        }
    }

    private async getUserId(socket: Socket) {
        const jwt = this.extractJwtFromSocket(socket);
        if (jwt) {
            const payload = await this.authService.getUserFromToken(jwt);
            return payload["sub"];
        }
        return null;
    }

    private extractJwtFromSocket(socket: Socket): string | null {
        const cookieHeaderValue = socket.request.headers.cookie?.split(";");
        return cookieHeaderValue?.at(0)?.split("=")[1] || null;
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


    private restBallPosition(gameData: GameDto) {
        const ball = gameData.ball;
        const width = gameData.tableWidth;
        const height = gameData.tableHeight;
        ball.x = width / 2;
        ball.y = height / 2;
        ball.dy *= -1;
        ball.dx *= -1;
    }

    private async handleBall(gameData: GameDto): Promise<boolean> {
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
            let middlePaddle1 = paddles.paddle1.x + paddles.width / 2;
            let distanceBallXPaddleMiddle = ball.x - middlePaddle1;
            let newAngel = (((paddles.width / 2) - (distanceBallXPaddleMiddle)) / (paddles.width / 2)) * (Math.PI / 2);
            ball.dx = ball.speed * (Math.cos(newAngel));
            ball.dy = -ball.speed * (Math.sin(newAngel));
            ball.dy *= -1;
        }

        // check for Goal
        if (newBallY + ball.radius >= paddles.paddle2.y + (paddles.height)) {
            gameData.player1.score++;
            this.restBallPosition(gameData);
        }

        if (newBallY - ball.radius <= paddles.paddle1.y) {
            gameData.player2.score++;
            this.restBallPosition(gameData);
        }
        if (gameData.player2.score === 3 || gameData.player1.score === 3) {
            if (gameData.player2.score === 3) {
                this.gameService.saveToCareer(gameData.player2, gameData.player1);
                const result = { winner:{ userId: gameData.player2.userId, username: gameData.player2.username , avatar : gameData.player2.avatar, scoor : gameData.player2.score }, loser: { userId: gameData.player1.userId, username: gameData.player1.username , avatar : gameData.player1.avatar, scoor : gameData.player1.score } };
                this.server.to(gameData.player2.socketId).emit("gameOver", result);
                this.server.to(gameData.player1.socketId).emit("gameOver", result);
            }
            else if (gameData.player1.score === 3) {
                this.gameService.saveToCareer(gameData.player1, gameData.player2);
                const result = { winner:{ userId: gameData.player1.userId, username: gameData.player1.username , avatar : gameData.player1.avatar, scoor : gameData.player1.score }, loser: { userId: gameData.player2.userId, username: gameData.player2.username , avatar : gameData.player2.avatar, scoor : gameData.player2.score } };
                this.server.to(gameData.player1.socketId).emit("gameOver", result);
                this.server.to(gameData.player2.socketId).emit("gameOver", result);
            }
            this.gameService.deleteGame(gameData.gameId);
            return false;
        }
        ball.x += ball.dx;
        ball.y += ball.dy;
        return true;

    }

    private resizeGame(gameData: GameDto, ball: Ball, ratio: number): GameDto {
        const resizedGameData: GameDto = {
            ...gameData,
            tableWidth: gameData.tableWidth * ratio,
            tableHeight: gameData.tableHeight * ratio,
            ball: {
                ...ball,
                x: ball.x * ratio,
                y: ball.y * ratio,
                radius: ball.radius * ratio,
            },
            paddles: {
                ...gameData.paddles,
                width: gameData.paddles.width * ratio,
                height: gameData.paddles.height * ratio,
                paddle1: {
                    ...gameData.paddles.paddle1,
                    x: gameData.paddles.paddle1.x * ratio,
                    y: gameData.paddles.paddle1.y * ratio,
                },
                paddle2: {
                    ...gameData.paddles.paddle2,
                    x: gameData.paddles.paddle2.x * ratio,
                    y: gameData.paddles.paddle2.y * ratio,
                },
            },
        };

        return resizedGameData;
    }

    private updateBotPaddlePosition(gameData: GameDto) {
        const paddles = gameData.paddles;
        const ball = gameData.ball;

        if(ball.dy < 0) return;
        const paddle2Middle = paddles.paddle2.x + paddles.width / 2;
        let randomPos = Math.random() * 20;

        if (ball.x > paddle2Middle + randomPos) {
            paddles.paddle2.dx = (paddles.speed - 3);
        }
        else if (ball.x < paddle2Middle - randomPos) {
            paddles.paddle2.dx = -(paddles.speed - 3);
        } else {
            paddles.paddle2.dx = 0;
        }
    }

    private startGame(gameId: string) {
        const gameData = this.gameService.getGame(gameId);
        console.log("game started", gameData);
        let gamePlayed = true;
        if (gameData && gameData.player1 && gameData.player2) {
            const interval = setInterval(async () => {
                this.updatePaddlesPosition(gameData);
                if (gameData.gametype === "bot")
                    this.updateBotPaddlePosition(gameData);
                gamePlayed = await this.handleBall(gameData);
                if (!gamePlayed) {
                    console.log("game over");
                    clearInterval(interval);
                    return;
                }
                const client1Ball = { ...gameData.ball };
                const client2Ball = { ...gameData.ball };
                if (gameData.gametype !== "bot") {
                    this.server.to(gameData.player2.socketId).emit("move", this.resizeGame(gameData, client1Ball, gameData.player2.ratio), gameData.player2.userId);
                }
                client2Ball.y = gameData.tableHeight - client2Ball.y;
                this.server.to(gameData.player1.socketId).emit("move", this.resizeGame(gameData, client2Ball, gameData.player1.ratio), gameData.player2.userId);
            }, 1000 / 60);
        }
    }

    @SubscribeMessage("move")
    async handleMove(socket: Socket, data: any) {
        const gameId = data[1];
        const gameData = this.gameService.getGame(gameId);
        const user = await this.getUserId(socket);
        if (gameData && user) {
            const paddles = gameData.paddles;
            if (user === gameData.player1.userId) {
                paddles.paddle1.dx = data[0] === "left" ? -paddles.speed : paddles.speed;
            } else if (user === gameData.player2.userId) {
                paddles.paddle2.dx = data[0] === "left" ? -paddles.speed : paddles.speed;
            }
        }
    }

    @SubscribeMessage("stop")
    async handleStop(socket: Socket, data: any) {
        const gameId = data[1];
        const gameData = this.gameService.getGame(gameId);
        const user = await this.getUserId(socket);

        if (gameData && user) {
            const paddles = gameData.paddles;
            if (user === gameData.player1.userId) {
                paddles.paddle1.dx = 0;
            } else if (user === gameData.player2.userId) {
                paddles.paddle2.dx = 0;
            }
        }
    }

    @SubscribeMessage("resize")
    async handleResize(socket: Socket, data: any) {
        const { newWidth, gameId } = data;
        const gameData = this.gameService.getGame(gameId);
        const user = await this.getUserId(socket);
        if (gameData && newWidth < 400) {
            const ratio = newWidth / gameData.tableWidth;
            if (user === gameData.player1.userId)
                gameData.player1.ratio = ratio;
            else if (user === gameData.player2.userId)
                gameData.player2.ratio = ratio;
        }
    }
}