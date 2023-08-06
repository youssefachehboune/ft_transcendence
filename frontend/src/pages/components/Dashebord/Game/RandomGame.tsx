import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { GameData } from "./gameData";
import GameStarted from "./GameStarted";


export default function RandomGame() {
    const socketRef = useRef<Socket | null>(null);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameData, setGameData] = useState<GameData | undefined>(undefined);
    useEffect(() => {
        if(!socketRef.current)
        {
            socketRef.current = io("http://localhost:3000/random", {
                transports: ["websocket"],
                withCredentials: true,
            });
        }
    }, []);


    useEffect(() => {
        socketRef.current?.on("startRandom", (data: GameData) => {
            console.log("Start teh gamewith :", data);
            if (data) {
                socketRef.current?.disconnect();

                setGameStarted(true);
                setGameData(data);
            }
        });
    }, []);

    if (!gameStarted) {
        return (
            <div className="w-[100%] h-[100%] flex items-center justify-center">
                <h1 className="text-white text-[30px] font-sora font-semibold">
                    Random Game
                </h1>
            </div>
        );
    }
    else if (gameStarted && gameData) {
        return (
            <GameStarted data={gameData} />
        );
    }
    else {
        return (
            <div>
                <h1>Error</h1>
            </div>
        );
    }

}