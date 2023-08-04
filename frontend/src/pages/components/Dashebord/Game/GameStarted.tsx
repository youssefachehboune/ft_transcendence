import React, { useEffect, useState, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { GameData } from "./gameData";
import { GameDto } from '../../../../../../backend/dist/src/game/game.dto';

interface PlayerInfo {
  avatar: string;
  name: string;
  username: string;
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

interface ExtendedGameData extends GameData {
  ball: Ball;
  paddles: Paddles;
  tableWidth: number;
  tableHeight: number;
}

interface GameStartedProps {
  data: GameData;
}

const GameStarted: React.FC<GameStartedProps> = ({ data }) => {
  const canvasGame = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const [player1info, setPlayer1info] = useState<PlayerInfo | undefined>();
  const [player2info, setPlayer2info] = useState<PlayerInfo | undefined>();
  const [gameData, setGameData] = useState<ExtendedGameData | undefined>();
  const [gameWidth, setGameWidth] = useState<number>(0);
  const [gameHeight, setGameHeight] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [gameId, setGameId] = useState<string>("");
  const [scorePlayer1, setScorePlayer1] = useState<number>(0);
  const [scorePlayer2, setScorePlayer2] = useState<number>(0);

  const fetchUserData = useCallback(async (user_id: number) => {
    const response = await fetch(`http://localhost:3000/user/data/${user_id}`, {
      credentials: "include",
    });
    const userData = await response.json();
    return userData;
  }, []);

  const fetchUserId = useCallback(async () => {
    const response = await fetch("http://localhost:3000/user/id", {
      credentials: "include",
    });
    const userData = await response.json();
    setUserId(userData);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!data) return;
      const player1Data = await fetchUserData(data.player1.userId);
      const player2Data = await fetchUserData(data.player2.userId);
      await fetchUserId();
      setPlayer1info(player1Data);
      setPlayer2info(player2Data);
    };
    fetchData();
    setGameData(data);
    setGameId(data.gameId);
  }, [data, fetchUserData, fetchUserId]);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000/game", {
      transports: ["websocket"],
      withCredentials: true,
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasGame.current;
    const ctx = canvas?.getContext("2d");
    const ball = gameData?.ball;
    const paddles = gameData?.paddles;
    const tableWidth = gameData?.tableWidth;
    const tableHeight = gameData?.tableHeight;

    if (ctx && ball && paddles) {
      setGameWidth(tableWidth!);
      setGameHeight(tableHeight!);

      const draw = () => {
        ctx.clearRect(0, 0, canvas!.width, canvas!.height);

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, ball.startAngle, ball.endAngle);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.rect(
          paddles.paddle1.x,
          paddles.paddle1.y,
          paddles.width,
          paddles.height
        );
        ctx.rect(
          paddles.paddle2.x,
          paddles.paddle2.y,
          paddles.width,
          paddles.height
        );
        ctx.fillStyle = paddles.color;
        ctx.fill();
        ctx.closePath();
        animationFrameRef.current = requestAnimationFrame(draw);
      };
      draw();
    }

    const endGame = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      ctx?.clearRect(0, 0, canvas!.width, canvas!.height);

      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);

      socketRef.current?.off("move");
      socketRef.current?.off("gameOver");

      canvas?.remove();

      setGameData(undefined);
      setPlayer1info(undefined);
      setPlayer2info(undefined);
      setGameWidth(0);
      setGameHeight(0);
      setUserId(0);
      setGameId("");
      setScorePlayer1(0);
      setScorePlayer2(0);

      const scoorSection = document.getElementById("scoor-section");
      if (scoorSection) {
        scoorSection.style.display = "none";
      }
    };

    socketRef.current?.on("move", (id: number, ballPos: any, paddles: any, player1Scoor: any, Player2Scoor: any) => {
      if (gameData) {
        gameData.ball.x = ballPos.x;
        gameData.ball.y = ballPos.y;

        if (id === userId) {
          gameData.paddles.paddle1.x = paddles.paddle1.x;
          gameData.paddles.paddle2.x = paddles.paddle2.x;
        } else {
          gameData.paddles.paddle1.x = paddles.paddle2.x;
          gameData.paddles.paddle2.x = paddles.paddle1.x;
        }

        setScorePlayer1(player1Scoor);
        setScorePlayer2(Player2Scoor);
        setGameData({ ...gameData });
      }
    });

    socketRef.current?.on("gameOver", (winner: number, player1Scoor: number, player2Scoor: number) => {
      const outcome = winner === userId ? "win" : "lose";
      console.log(`You ${outcome} ${player1Scoor} : ${player2Scoor}`);
      endGame();
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      socketRef.current?.off("move");
      socketRef.current?.off("gameOver");
    };

  }, [gameData, userId]);

  const stopMoving = () => {
    socketRef.current?.emit("stop", userId, gameId);
  };

  const startMoving = (direction: string) => {
    socketRef.current?.emit("move", direction, gameId);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (["a", "A", "ArrowLeft"].includes(e.key)) {
      startMoving("left");
    } else if (["d", "D", "ArrowRight"].includes(e.key)) {
      startMoving("right");
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (["a", "A", "ArrowLeft", "d", "D", "ArrowRight"].includes(e.key)) {
      stopMoving();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [userId, gameId]);

  return (
    <div id="game" style={{}}>
      <div id="scoor-section">
        <div id="player1">
          <img src={player1info?.avatar} alt="Player 1" />
          <h1 id="name">{player1info?.name}</h1>
          <h4 id="username">{player1info?.username}</h4>
        </div>
        <div id="score">
          <h1 id="player1-score">{scorePlayer1}</h1>
          <h1 id="spe"> : </h1>
          <h1 id="player2-score">{scorePlayer2}</h1>
        </div>
        <div id="player2">
          <img src={player2info?.avatar} alt="Player 2" />
          <h1 id="name">{player2info?.name}</h1>
          <h4 id="username">{player2info?.username}</h4>
        </div>
      </div>

      <canvas
        id="game-canvas"
        ref={canvasGame}
        width={gameWidth}
        height={gameHeight}
      />
    </div>
  );
};

export default GameStarted;
