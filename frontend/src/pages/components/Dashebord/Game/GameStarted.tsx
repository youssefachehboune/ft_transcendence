import { useEffect, useState, useRef } from "react";
import { GameData } from "./FriendsGame";
import { Socket } from "socket.io-client";

interface GameStartedProps {
  data: GameData;
  socket: Socket | null;
}

export default function GameStarted({ data, socket }: GameStartedProps) {
  const canvasGame = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [player1info, setPlayer1info] = useState<any>(undefined);
  const [player2info, setPlayer2info] = useState<any>(undefined);
  const [gameData, setGameData] = useState<GameData | undefined>(undefined);
  const [gameWidth, setGameWidth] = useState<number>(0);
  const [gameHeight, setGameHeight] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [gameId, setGameId] = useState<string>("");

  const fetchInfo = async (user_id: number) => {
    const response = await fetch(`http://localhost:3000/user/data/${user_id}`, {
      credentials: "include",
    });
    const data = await response.json();
    return data;
  };

  const fetchUserId = async () => {
    const response = await fetch("http://localhost:3000/user/id", {
      credentials: "include",
    });
    const data = await response.json();
    setUserId(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!data) {
        return;
      }

      const player1Data = await fetchInfo(data.player1.userId);
      const player2Data = await fetchInfo(data.player2.userId);
      await fetchUserId();
      setPlayer1info(player1Data);
      setPlayer2info(player2Data);
    };
    fetchData();
    setGameData(data);
    setGameId(data.gameId);
  }, [data]);

  useEffect(() => {
    // console.log("gameData", gameData);

    const canvas = canvasGame.current;
    const ctx = canvas?.getContext("2d");
    const ball = gameData?.ball;
    const paddles = gameData?.paddles;
    const tableWidth = gameData?.tableWidth;
    const tableHeight = gameData?.tableHeight;
    setGameWidth(tableWidth!);
    setGameHeight(tableHeight!);
    
    const draw = () => {
      if (!ctx || !ball || !paddles) return;
      // Clear the canvas
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      // Draw the ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, ball.startAngle, ball.endAngle);
      ctx.fillStyle = ball.color;
      ctx.fill();
      ctx.closePath();

      // Draw the paddles
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
      animationFrameRef.current = requestAnimationFrame(draw)
    };
    draw();

    socket?.on("move", (id: number, ballPos: any, paddles: any) => {
      const paddel1 = paddles.paddle1;
      const paddel2 = paddles.paddle2;
      const ballx = ballPos.x;
      const bally = ballPos.y;
      if (gameData) {
        gameData.ball.x = ballx;
        gameData.ball.y = bally;
        if (id === userId) {
          gameData.paddles.paddle1.x = paddel1.x;
          gameData.paddles.paddle2.x = paddel2.x;
        } else {
          gameData.paddles.paddle1.x = paddel2.x;
          gameData.paddles.paddle2.x = paddel1.x;
        }
        setGameData({ ...gameData });
      }
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      socket?.off("move");
    };

  }, [gameData]);

  const stopMoving = () => {
    socket?.emit("stop", userId, gameId);
  };

  const startMoving = (direction: string) => {
    socket?.emit("move", direction, gameId);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
      startMoving("left");
    } else if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
      startMoving("right");
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft" || e.key === "d" || e.key === "D" || e.key === "ArrowRight")
      stopMoving();
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
    <div id="game" style={{}} className=" bg-red-400">
      <div id="scoor-section">
        <div id="player1">
          <img src={player1info?.avatar} />
          <h1 id="name">{player1info?.name}</h1>
          <h4 id="username">{player1info?.username}</h4>

        </div>
        <div id="score">
          <h1 id="player1-score">0</h1>
          <h1 id="spe"> : </h1>
          <h1 id="player2-score">0</h1>
        </div>
        <div id="player2">
          <img src={player2info?.avatar} />
          <h1 id="name">{player2info?.name}</h1>
          <h4 id="username">{player2info?.username}</h4>
        </div>
      </div>

      <canvas
        id="game-canvas"
        ref={canvasGame}
        width={gameWidth}
        height={gameHeight}>
      </canvas>
    </div>
  )
}