import { useEffect, useState } from "react";
import TopPlayer from "./TopPlayer";
import LasMatches from "./LasMatches";
export default function Main() {
    const [data, setData] = useState<any>([]);
    useEffect(() => {
        const fetchData = async () => {
            const topPlayers = await fetch('http://localhost:3000/top-player', { credentials: "include" });
            const topPlayersData = await topPlayers.json();
            setData(topPlayersData);
        };
        fetchData();
    }, []);
    const [isShow, setIsShow] = useState<boolean>(false);
    function handlePlayClick()
    {
        setIsShow(true);
    }
    function handlePlayLeave()
    {
        setIsShow(false);
    }
    return (
        <div className="cont">
            <div className="w-[100%] h-[35%] #070012 flex items-center justify-center phone:h-[50%]">
                <div className="Play_div flex items-center justify-center" onMouseLeave={handlePlayLeave} onClick={handlePlayClick}>
                    <img  className="w-[370px] h-[100%]" src="Liquide.svg" alt="" />
                    <div className="circle1">
                    </div>
                    <div className="circle2">
                    </div>
                    <div className="w-[100%] h-[80px] absolute bottom-1 flex items-center justify-center phone:h-[50px] bg-red z-[99]"
                        style={{
                            bottom: isShow ? 'auto' : '10px',
                            top: isShow ? '10px' : 'auto',
                            transition: '0.5s',
                        }}
                    >
                    <h1 className="header_play">How to Play</h1>
                    </div>
                    {
                        isShow &&                     <div className="w-[90%] h-[50%] absolute bottom-1 z-[99] flex items-center justify-center phone:h-[70%]" >
                        <p className="parag_play ">In our version of Pong, the objective is to score points by hitting the ball past your opponent's paddle. The first player to reach 10 points wins. Move your paddle vertically using the designated controls and react quickly to hit the ball. Missing the ball results in your opponent scoring a point. Vary your shots, and anticipate your opponent's moves to gain an advantage. Stay focused, hone your skills, and have fun as you compete in this exciting game of Pong!</p>

                    </div>
                    }

                    <img src="TT.png" 
                    style={
                        {top: isShow ? '25%' : '60%',}
                    }
                    alt="" className="ShapeHover1" />

                    </div>
            </div>
            <div className="w-[100%] h-[65%]  phone:h-[50%]">
                <div className="w-[100%] h-1/2 flex items-center justify-around ">
                    <div className="backc1 w-[40%] h-[90%] rounded-[20px]">
                        <img src="TT.png" 
                        alt="" className="ShapeHover2" />
                        <h1 className="header_play4 ">Top players</h1>
                        <div className="par_hover">
                            <div className="w-[92%] h-[90%] flex items-center justify-start phone:h-[100%]">
                                    <div className="w-[100%] h-[100%] flex flex-col justify-between items-start
                                    2xl:w-[75%] 2xl:h-[100%]
                                    xl:w-[75%] xl:h-[100%]
                                    laptop:w-[100%] laptop:h-[100%]
                                    Large-phone:w-[100%]
                                    phone:w-[100%] phone:h-[100%]
                                    ">
                                        {
                                            data.map((item: any, key: number) => {
                                                return (
                                                    <TopPlayer key={key} avatar={item.avatar} name={(item.firstName + ' ' + item.lastName)} username={item.username} rank={key + 1} />
                                                )
                                            })
                                        }
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="backc2 w-[40%] h-[90%]  rounded-[20px]">
                        <img src="TT.png" 
                        alt="" className="ShapeHover2" />
                        <h1 className="header_play4">Last achievements</h1>
                        <div className="par_hover">
                            <div className="w-full h-full bg-white">
                                <div className="w-[50%] h-[40%] bg-orange flex items-center justify-center">
                                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[100%] h-1/2 flex items-center justify-around ">
                    <div className="backc3 w-[40%] h-[90%] rounded-[20px]">
                        <img src="TT.png" 
                        alt="" className="ShapeHover2" />
                        <h1 className="header_play4">Last matches</h1>
                        <div className="par_hover">
                            <div className=" w-[100%] h-full flex items-center justify-center">
                                <div className="w-[98%] h-[80%]   flex flex-col justify-between">
                                    <LasMatches score1={5} score2={2} name1="Youssef Achehbou" name2="Elmehdi lihwak" avatar1="mbjaghou.jpeg" avatar2="mbjaghou.jpeg" username1="lihwak" username2="zbifkrk"/>
                                    <LasMatches score1={5} score2={2} name1="Youssef Achehbou" name2="Elmehdi lihwak" avatar1="mbjaghou.jpeg" avatar2="mbjaghou.jpeg" username1="lihwak" username2="zbifkrk"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="backc4">
                        <img src="TT.png" 
                        alt="" className="ShapeHover2" />
                        <h1 className="header_play4">Play a game</h1>
                        <div className="par_hover">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    );
}