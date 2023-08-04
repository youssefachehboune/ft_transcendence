export interface Player {
  userId: number;
  socketId: string;
  score: number;
  ready : boolean;
}

export interface GameDto {
  gameId: string;
  player1: Player;
  player2: Player;
  ball: {
    x: number;
    y: number;
    radius: number;
    startAngle: number;
    endAngle: number;
    speed: number;
    dx: number;
    dy: number;
    color: string;
  },
  paddles: {
    speed: number;
    color: string;
    width: number;
    height: number;
    paddle1: {
      x: number;
      y: number;
      dx: number;
    },
    paddle2: {
      x: number;
      y: number;
      dx: number;
    }
  },
  tableWidth: number;
  tableHeight: number;
  gameState: "waiting" | "playing" | "ended";
}