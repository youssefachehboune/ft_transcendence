import { useEffect, useRef, useState } from "react";
import { GameData } from "./gameData";
import GameStarted from "./GameStarted";
import { Socket, io } from "socket.io-client";

export default function RobotGame() {
    const socketRef = useRef<Socket | null>(null);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameData, setGameData] = useState<GameData | undefined>(undefined);
    
    
    useEffect(() => {
        if(!socketRef.current)
        {
            socketRef.current = io("http://localhost:3000/bot", {
                transports: ["websocket"],
                withCredentials: true,
            });
        }
    }, []);


    useEffect(() => {
        socketRef.current?.on("startBot", (data: GameData) => {
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
                    Robot Game
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