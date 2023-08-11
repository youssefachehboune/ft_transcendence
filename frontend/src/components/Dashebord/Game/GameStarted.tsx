import React, { useEffect, useState, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { GameData , Player} from "./gameData";
import user_socket from "@/userSocket";
import Image from "next/image";
import { useDisclosure } from "@chakra-ui/react";
import GameResult from "./gameResult";
import { useRouter } from "next/router";
import GetContext from "@/context";
interface GameStartedProps {
  data: GameData;
}

const GameStarted: React.FC<GameStartedProps> = ({ data }) => {
  const canvasGame = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const router = useRouter();
  const [player1info, setPlayer1info] = useState<Player | undefined>();
  const [player2info, setPlayer2info] = useState<Player | undefined>();
  const [gameData, setGameData] = useState<GameData | undefined>();
  const [gameWidth, setGameWidth] = useState<number>(0);
  const [gameHeight, setGameHeight] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [gameId, setGameId] = useState<string>("");
  const [scorePlayer1, setScorePlayer1] = useState<number>(0);
  const [scorePlayer2, setScorePlayer2] = useState<number>(0);
  const [result, setResult] = useState<any>();
  let golobal = GetContext()
  const { isOpen: ispopresult, onOpen: onopenresult, onClose: oncloseresult } = useDisclosure()
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
      await fetchUserId();
    };
    fetchData();
    setPlayer1info(data.player1);
    setPlayer2info(data.player2);
    setGameData(data);
    setGameId(data.gameId);
  }, [data, fetchUserId]);

  useEffect(() => {
    if(golobal.socketRef.current) return;
    user_socket.emit("ingame");
    golobal.socketRef.current = io("http://localhost:3000/game", {
      transports: ["websocket"],
      withCredentials: true,
    });
  }, []);

  const handleResize = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    const game = document.getElementById("game");
    golobal.socketRef.current?.emit("resize", {
      newWidth: game?.clientWidth,
      gameId
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [gameId]);

  useEffect(() => {
    golobal.socketRef.current?.on("resized", (newGameData: GameData) => {
      setGameData(newGameData);
    });

    return () => {
      golobal.socketRef.current?.off("resized");
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


    const endGame = (result: any) => {
      const residandscore = {winner: {userId:  result.winner.userId , scoor: result.winner.scoor}, loser: {userId: result.loser.userId, scoor: result.loser.scoor}};
      user_socket.emit("endgame", residandscore);
      golobal.socketRef.current?.disconnect();
      setResult(result);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      ctx?.clearRect(0, 0, canvas!.width, canvas!.height);

      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);

      canvas?.remove();

      setGameData(undefined);
      setGameWidth(0);
      setGameHeight(0);
      setGameId("");
      setScorePlayer1(0);
      setScorePlayer2(0);
      
      const scoorSection = document.getElementById("scoor-section");
      if (scoorSection) {
        scoorSection.style.display = "none";
      }

      onopenresult();

      setTimeout(() => {
        oncloseresult();
        golobal.setGameData(undefined);
        router.push("/Home");
      }, 5000);
    };

    golobal.socketRef.current?.on("move", (newgameData: GameData, id: number) => {
      const paddles = newgameData.paddles;
      const player1Scoor = newgameData.player1.score;
      const Player2Scoor = newgameData.player2.score;
      if (gameData) {
        gameData.ball.x = newgameData.ball.x;
        gameData.ball.y = newgameData.ball.y;
        gameData.ball.radius = newgameData.ball.radius;
        gameData.tableWidth = newgameData.tableWidth;
        gameData.tableHeight = newgameData.tableHeight;
        gameData.paddles.width = paddles.width;
        gameData.paddles.height = paddles.height;
        gameData.paddles.paddle1.y = paddles.paddle1.y;
        gameData.paddles.paddle2.y = paddles.paddle2.y;
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

    golobal.socketRef.current?.on("gameOver", (result: any) => {
      endGame(result);
    });

    golobal.socketRef.current?.on("opponentDisconnected", (result: any) => {
      endGame(result);
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      golobal.socketRef.current?.off("move");
      golobal.socketRef.current?.off("gameOver");
      golobal.socketRef.current?.off("opponentDisconnected");
    };

  }, [gameData, userId]);

  const stopMoving = () => {
    golobal.socketRef.current?.emit("stop", userId, gameId);
  };

  const startMoving = (direction: string) => {
    golobal.socketRef.current?.emit("move", direction, gameId);
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
    const leftButton = document.getElementById("move-left");
    const rightButton = document.getElementById("move-right");
    if (leftButton && rightButton) {
      leftButton.addEventListener("pointerdown", () => {startMoving("left");});
      leftButton.addEventListener("pointerup", () => {stopMoving();});
      rightButton.addEventListener("pointerdown", () => {startMoving("right");});
      rightButton.addEventListener("pointerup", () => { stopMoving();});
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      leftButton?.removeEventListener("pointerdown", () => {startMoving("left");});
      leftButton?.removeEventListener("pointerup", () => {stopMoving();});
      rightButton?.removeEventListener("pointerdown", () => {startMoving("right");});
      rightButton?.removeEventListener("pointerup", () => { stopMoving();});
    };
  }, [userId, gameId]);

  return (
    <div id="game" className="w-full h-full relative overflow-y-auto overflow-x-hidden">
      <div id="move-left" className="w-[50%] absolute float-left h-full hidden xl:block 2xl:block z-40"></div>
      <div id="move-right" className="w-[50%] absolute float-right right-0 h-full hidden xl:block 2xl:block z-40"></div>
      <div id="scoor-section" className="w-[60%] xl:w-[90%] min-h-[70px] flex rounded-[10px] bg-black absolute top-[50px] border-[white] border-[solid] border-[1px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-[33.5%] xl:w-[38.5%] flex items-center justify-end">
                <Image width={'54'} height={'54'} src={player1info?.avatar ? player1info?.avatar : ''} alt="" className="w-[54px] rounded-full"/>
                <div className="w-[100px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                    <h1 className="text-[7px] font-sora font-[600] text-[white] ">{player1info?.fullname}</h1>
                    <h1 className="text-[7px] font-sora font-[400] text-[#969696] ">{"@" + player1info?.username}</h1>
                </div>
         </div>
         <div className="w-[33.5%] xl:w-[23.5%] flex flex-col items-center justify-center">
              <h1 className="text-[22px] font-sora font-[400] text-[white]">{scorePlayer1 + " : " + scorePlayer2}</h1>
          </div>
          <div className="w-[33.5%] xl:w-[38.5%] flex items-center justify-start">
              <Image width={'54'} height={'54'} src={player2info?.avatar ? player2info?.avatar : ''} alt="" className="w-[54px] rounded-full"/>
              <div className="w-[100px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                  <h1 className="text-[7px] font-sora font-[600] text-[white] ">{player2info?.fullname}</h1>
                  <h1 className="text-[7px] font-sora font-[400] text-[#969696] ">{"@" + player2info?.username}</h1>
              </div>
          </div>

      </div>
      <canvas
        className="absolute top-[100px] left-1/2 transform -translate-x-1/2"
        id="game-canvas"
        ref={canvasGame}
        width={gameWidth}
        height={gameHeight}
        style={{ backgroundColor: "black", border: "2px solid white" }}
      />
      {result && <GameResult onClose={oncloseresult} isOpen={ispopresult} data={result} id={userId} />}
    </div>

  );
};

export default GameStarted;
