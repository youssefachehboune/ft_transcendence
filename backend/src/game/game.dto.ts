export interface Player {
  userId: number;
  username: string;
  fullname: string;
  avatar: string;
  socketId: string;
  score: number;
  ready: boolean;
  ratio: number;
}

export interface Paddles {
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
}

export interface Ball {
  x: number;
  y: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  speed: number;
  dx: number;
  dy: number;
  color: string;
}



export interface GameDto {
  gameId: string;
  player1: Player;
  player2: Player;
  ball: Ball;
  paddles: Paddles;
  tableWidth: number;
  tableHeight: number;
  gameState: "waiting" | "playing" | "ended";
  gametype: "bot" | "multiplayer";
}


export interface Players {
  sender: Player;
  receiver: Player;
}