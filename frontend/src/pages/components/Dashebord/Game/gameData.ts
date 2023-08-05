export interface Player {
    userId: number;
    socketId: string;
    score: number;
    ready: boolean;
    ratio: number;
}

interface Ball {
    x: number;
    y: number;
    radius: number;
    startAngle: number;
    endAngle: number;
    speed: number;
    firstTimeBallHit: boolean;
    dx: number;
    dy: number;
    color: string;
}
interface Paddle {
    x: number;
    y: number;
    dx: number;
}

interface Paddles {
    paddle1: Paddle;
    paddle2: Paddle;
    width: number;
    height: number;
    color: string;
    speed: number;
}

export interface GameData {
    gameId: string;
    player1: Player;
    player2: Player;
    ball: Ball;
    paddles: Paddles;
    tableWidth: number;
    tableHeight: number;
    gameState: "waiting" | "playing" | "ended";
}
