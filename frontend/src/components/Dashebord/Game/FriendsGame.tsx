import React, { useEffect, useState } from "react";
import user_socket from "@/pages/userSocket";

interface Friend {
  user_id: number;
  avatar: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface Data {
  sender: number;
  receiver: number;
}

export default function FriendsGame() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [userId, setUserId] = useState<number | undefined>(undefined);

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
    if(data.error)
      return console.log(data.error);
    setUserId(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchFriends();
      await fetchUserId();
    };
    fetchData();
  }, []);


  const play = async (id: number) => {
    const data: Data = {
      sender: userId!,
      receiver: id,
    };
    user_socket.emit("play", data);
  };

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
            {
              friends.map((friend) => (
                <div key={friend.user_id} className="w-[100%] h-[70px] phone:h-[43px] rounded-l-full rounded-r-full border-[1.4px] border-[#00DAEA] flex items-center justify-start overflow-hidden mb-2">
                  <div className="w-[12%] h-[100%] flex items-center justify-center
                                xl:w-[11%]
                                laptop:w-[12%]
                                Large-phone:w-[13%]
                                phone:w-[16%]
                                ">
                    <div className="relative">
                      <img src={friend.avatar} alt="" className="rounded-full w-[52px] h-[52px]
                                    xl:w-[48px] xl:h-[48px]
                                    laptop:w-[44px] laptop:h-[44px]
                                    Large-phone:w-[40px] Large-phone:h-[40px]
                                    phone:w-[36px] phone:h-[36px]
                                    "/>
                      <div className="w-[10px] h-[10px]  z-99 absolute bottom-0 right-1 rounded-full
                                    phone:w-[8px] phone:h-[8px]
                                    "
                        // style={{ backgroundColor: isOnline(friend.user_id) }}
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
                          ">{friend.firstName + ' ' + friend.lastName}</h1>
                    <h1 className="font-sora font-regular text-white text-[10px] leading-normal
                          Large-phone:text-[9px]
                          phone:text-[8px]
                          ">@{friend.username}</h1>
                  </div>
                  <div className="w-[43%] h-[100%]  flex items-center justify-end
                        xl:w-[44%]
                        laptop:w-[44%]
                        Large-phone:w-[43%]
                        phone:w-[42%]
                        ">
                    <button onClick={() => play(friend.user_id)} className="h-[43px] w-[100px] rounded-l-full rounded-r-full bg-[#00DAEA] mr-4 flex items-center justify-center cursor-pointer
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
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div id="invitation"></div>
      </div>
    );
}