import { Injectable } from '@nestjs/common';
import { GameDto, Player } from './game.dto';

@Injectable()
export class GameService {

    create(gameId: string, player1: Player, player2: Player): GameDto {
        const TableWidth = 400;
        const TableHeight = TableWidth * 16 / 9;
        const paddleWidth = 80;
        const paddleHeight = 20;
        let ballSpeed = 10;
        let ballLunchAngle = (Math.PI / 2) * 0.5;
        let firstTimeBallHit = false;
    
        const gameData: GameDto = {
          gameId: gameId,
          player1: player1,
          player2: player2,
          ball: {
            x: TableWidth / 2,
            y: TableHeight / 2,
            radius: 10,
            startAngle: 0,
            endAngle: 2 * Math.PI,
            speed: ballSpeed,
            firstTimeBallHit: false,
            dx: 4 * Math.cos(ballLunchAngle),
            dy: 4 * Math.sin(ballLunchAngle),
            color: "#fff",
          },
          paddles: {
            speed: 10,
            color: "#C0C0C0",
            width: paddleWidth,
            height: paddleHeight,
            paddle1: {
              x: (TableWidth - paddleWidth) / 2,
              y: 20,
              dx: 0,
            },
            paddle2: {
              x: (TableWidth - paddleWidth) / 2,
              y: TableHeight - 20 - paddleHeight,
              dx: 0,
            },
          },
          tableWidth: TableWidth,
          tableHeight: TableHeight,
          gameState: "waiting",
        };
        return gameData;
    }

}
