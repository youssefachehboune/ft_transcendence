import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
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
    return online.includes(id) ? "#61FF00" : "14FF00";
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
      <div className="w-[100%] h-[100%] flex flex-col items-center justify-start overflow-y-auto

      ">
        <div className="w-[100%] h-[7%] ">
        </div>
        <div className="w-[90%] h-[6%] flex items-end justify-start 
            phone:w-[80%] phone:h-[7%]
            ">
          <h1 className="font-sora font-semibold leading-normal text-[#fff] text-[27px]
              phone:text-[20px]
              ">Invite Friend</h1>
        </div>
        <div className="w-[100%] h-[87%] flex items-center justify-center
            phone:w-[100%] phone:h-[86%]
            ">
          <div className="w-[68%]  h-[90%] overflow-y-auto
                phone:w-[85%]
                ">
            <div className="w-[100%] h-[70px] phone:h-[43px] rounded-l-full rounded-r-full border-[1.4px] border-[#00DAEA] flex items-center justify-start overflow-hidden">
              <div className="w-[10%] h-[100%] flex items-center justify-center
                      xl:w-[11%]
                      laptop:w-[12%]
                      Large-phone:w-[13%]
                      phone:w-[16%]
                      ">
                <div className="relative">
                  <img src="mbjaghou.jpeg" alt="" className="rounded-full w-[52px] h-[52px]
                          xl:w-[48px] xl:h-[48px]
                          laptop:w-[44px] laptop:h-[44px]
                          Large-phone:w-[40px] Large-phone:h-[40px]
                          phone:w-[36px] phone:h-[36px]
                          "/>
                  <div className="w-[10px] h-[10px]  z-99 absolute bottom-0 right-1 rounded-full
                          phone:w-[8px] phone:h-[8px]
                          "
                    style={{ backgroundColor: '#14FF00' }}
                  ></div>
                </div>
              </div>
              <div className="w-[45%] h-[100%] flex flex-col items-start justify-center
              xl:w-[45%]
              laptop:w-[44%]
              Large-phone:w-[44%]
              phone:w-[42%]
              ">
                <h1 className="font-sora font-bold text-white text-[13px] leading-normal tracking-[0.36px]
                Large-phone:text-[11px]
                phone:text-[9.4px]
                ">Mohamed bjaghou</h1>
                <h1 className="font-sora font-regular text-white text-[10px] leading-normal
                Large-phone:text-[9px]
                phone:text-[8px]
                ">@mbjaghou</h1>
              </div>
              <div className="w-[45%] h-[100%]  flex items-center justify-end
              xl:w-[44%]
              laptop:w-[44%]
              Large-phone:w-[43%]
              phone:w-[42%]
              ">
                <div className="h-[43px] w-[100px] rounded-l-full rounded-r-full bg-[#00DAEA] mr-4 flex items-center justify-center cursor-pointer
                xl:w-[90px] xl:h-[39px]
                laptop:w-[85px] laptop:h-[35px]
                Large-phone:w-[80px] Large-phone:h-[32px]
                phone:w-[75px] phone:h-[32px]
                ">
                  <h1 className="font-sora font-regular text-[13px]
                  xl:text-[12px]
                  laptop:text-[12px]
                  Large-phone:text-[11px]
                  phone:text-[10px]
                  ">Invite</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div id="head">
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
            <div id="invitation"></div> */}
      </div>
    );
  }
  else if (gameData && gameStarted) {
    return (
      <GameStarted data={gameData} socket={gameSocket} />
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