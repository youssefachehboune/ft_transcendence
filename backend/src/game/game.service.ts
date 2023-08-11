import { Injectable } from '@nestjs/common';
import { GameDto, Player } from './game.dto';
import { PrismaClient } from '@prisma/client';
import { HistoryService } from '../history/history.service';

const games = new Map<string, GameDto>();
@Injectable()
export class GameService {
  private prisma: PrismaClient;

  constructor(private readonly historyService: HistoryService) {
    this.prisma = new PrismaClient();
  }

  create(gameId: string, player1: Player, player2: Player, type: "multiplayer" | "bot"): GameDto {
    const TableWidth = 350;
    const TableHeight = TableWidth * 16 / 9;
    const paddleWidth = 100;
    const paddleHeight = 20;
    let ballSpeed = 10;
    let ballLunchAngle = (Math.PI / 2) * 0.5;
    let ballLunchSpeed = 5;

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
        dx: ballLunchSpeed * Math.cos(ballLunchAngle),
        dy: ballLunchSpeed * Math.sin(ballLunchAngle),
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
      gametype: type,
    };
    games.set(gameId, gameData);
    console.log("create A " + type + " game", gameData);
    return gameData;
  }

  getGame(gameId: string): GameDto {
    return games.get(gameId);
  }

  getGameByUserId(userId: number, socketId: string) {
    const game = Array.from(games.values()).find((game) => game.player1.userId === userId || game.player2.userId === userId);
    if (game) {
      if (game.player1.userId === userId) {
        game.player1.socketId = socketId;
        game.player1.ready = true;
      } else {
        game.player2.socketId = socketId;
        game.player2.ready = true;
      }
      return game;
    }
    return null;
  }
  deleteGame(gameId: string) {
    games.delete(gameId);
  }

  calculeteLevel(level: number, points: number) {
    const levelPoints = points / ((Math.floor(level) + 1) * 100);
    return (Math.floor(levelPoints) + (Math.round((levelPoints - Math.floor(levelPoints)) * 100) / 100));
  }



  async saveToCareer(winner: Player, loser: Player) {
    console.log("save to db")   
    await this.historyService.addMatch(loser.userId, winner.userId,  winner.score, loser.score);
    const winnerProfile = await this.prisma.userProfile.findUnique({
      where: {
        user_id: winner.userId,
      },
    });

    const newLevel = winnerProfile.level + this.calculeteLevel(winnerProfile.level, 50);
    await this.prisma.userProfile.update({
      where: {
        user_id: winner.userId,
      },
      data: {
        points: {
          increment: 50,
        },
        won: {
          increment: 1,
        },
        winStreak: {
          increment: 1,
        },
        level: newLevel
      },
    });

    await this.prisma.userProfile.update({
      where: {
        user_id: loser.userId,
      },
      data: {
        lost: {
          increment: 1,
        },
        winStreak: 0,
      },
    });
  }
}