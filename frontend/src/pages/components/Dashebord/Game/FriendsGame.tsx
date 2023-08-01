import { useEffect, useState } from "react";
import { io , Socket} from "socket.io-client";
import GameStarted from "./GameStarted";

const socket = io("http://localhost:3000/status", {
  transports: ["websocket"],
  withCredentials: true,
});

interface User {
  userId: number;
  status: boolean;
}

interface Player {
  userId: number;
  socketId: string;
  score: number;
}

export interface GameData {
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
    firstTimeBallHit: boolean;
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

interface Friend {
    user_id: number;
    avatar: string;
    firstName: string;
    lastName: string;
    username: string;
    online: boolean;
}
interface Data {
  sender: number;
  receiver: number;
}

export default function FriendsGame() {

    const [friends, setFriends] = useState<Friend[]>([]);
    const [online, setOnline] = useState<number[]>([]);
    const [userId, setUserId] = useState<number | undefined>(undefined);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameData, setGameData] = useState<GameData | undefined>(undefined);
    const [gameSocket, setGameSocket] = useState<Socket | null>(null);

    const fetchFriends = async () => {
        const response = await fetch("http://localhost:3000/friends", {
            credentials: "include",
        });
        const data = await response.json();
        setFriends(data);
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
            await fetchFriends();
            await fetchUserId();
        };
        fetchData();
    }, []);

    const isOnline = (id: number) => {
      return online.includes(id) ? "#61FF00" : "red";
    };
    const createInvitation = (data: Data) => {
      const invitation = document.getElementById("invitation");
      if (invitation) {
        const invitationLi = document.createElement("li");
        const h1 = document.createElement("h1");
        h1.innerHTML = `${data.sender} wants to play with you`;
        invitationLi.appendChild(h1);
        invitation.appendChild(invitationLi);
        const accept = document.createElement("button");
        accept.innerHTML = "Accept";
        accept.addEventListener("click", () => {
          socket.emit("accept", data);
        });
        invitationLi.appendChild(accept);
      }
    };


    useEffect(() => {
      socket.on("onlineOne", (data: User) => {
        if (data.status === true) {
          setOnline((prevOnline) => [...prevOnline, data.userId]);
        } else {
          setOnline((prevOnline) =>
            prevOnline.filter((id) => id !== data.userId)
          );
        }
      });
  
      socket.on("onlineFriends", (data: any) => {
        setOnline((prevOnline) => [...prevOnline, ...data]);
      });

      socket.on("invitation", (data: Data) => {
        if (data) createInvitation(data);
      });

      socket.on("start", (data: GameData) => {
        if (data) {
          setGameSocket(socket);
          // if(gameSocket)
            // gameSocket.disconnect();
          setGameStarted(true);
          setGameData(data);
        }
      });

      return () => {
        socket.off("onlineOne");
        socket.off("onlineFriends");
        socket.off("invitation");
      }
    }, [gameData]);

    const play = async (id: number) => {
      const data: Data = {
        sender: userId!,
        receiver: id,
      };
      socket.emit("play", data);
    };

    if (!gameStarted) {
      return (
          <div id="friends">
          <div id="head">
            <h1>Welcome <span>{userId}</span> Invite a Friends </h1>
          </div>
          <div id="content">
            {friends.map((friend) => (
              <section id="friend" key={friend.user_id}>
                <div id="con">
                  <div id="pic">
                    <img src={friend.avatar} alt="Profile Picture" />
                    <div
                      id="elipse"
                      style={{ backgroundColor: isOnline(friend.user_id) }}
                    ></div>
                  </div>
                  <div id="name">
                    <h1 id="fullname">
                      {friend.firstName} {friend.lastName}
                    </h1>
                    <h4 id="username">{friend.username}</h4>
                  </div>
                </div>
                <button onClick={() => play(friend.user_id)}>Play</button>
              </section>
            ))}
          </div>
          <div id="invitation"></div>
        </div>
      );
    } 
    else if(gameData && gameStarted){
      return (
        <GameStarted data= {gameData} socket={gameSocket} />
      )
    }
    else {
      return (
        <div>
          <h1>Error</h1>
        </div>
      )
    }

}