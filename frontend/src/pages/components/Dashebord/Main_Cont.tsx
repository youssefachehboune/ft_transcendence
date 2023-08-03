import { useEffect, useState } from "react";
import TopPlayer from "./TopPlayer";
import LasMatches from "./LasMatches";
import AchievComp from "./AchievComp";
import { BsFillPeopleFill } from "react-icons/bs";
import { GiPerspectiveDiceSixFacesSix } from "react-icons/gi";
import { FaRobot } from "react-icons/fa";

export default function Main() {
    const [datatop, setDatatop] = useState<any>([]);
    const [dataMatch, setDataMatch] = useState<any>([]);
    const [dataAchiev, setDataAchiev] = useState<any>([]);
    useEffect(() => {
        const fetchData = async () => {
            const achiev = await fetch('http://localhost:3000/achievements/last', { credentials: "include" });
            const achievData = await achiev.json();
            setDataAchiev(achievData);
            const lastMatches = await fetch('http://localhost:3000/history/lastMatches', { credentials: "include" });
            const lastMatchesData = await lastMatches.json();
            setDataMatch(lastMatchesData);
            const topPlayers = await fetch('http://localhost:3000/top-player', { credentials: "include" });
            const topPlayersData = await topPlayers.json();
            setDatatop(topPlayersData);
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
        <div className="cont Nest:h-[820px] tabletNest:h-[700px]">
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
                                            datatop.map((item: any, key: number) => {
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
                            <div className="w-full h-full flex flex-col justify-between">
                                {
                                    dataAchiev.map((item: any, key: number) => {
                                        return (
                                            <AchievComp key={key} title={item.name} description={item.description} reward={item.points} />
                                        )
                                    })
                                }
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
                                        {
                                            dataMatch.map((item: any, key: number) => {
                                                return (
                                                    <LasMatches key={key} score1={item.userPoints} score2={item.opponentPoints} name1={item.User.firstName + ' ' + item.User.lastName} name2={item.Opponent.firstName + ' ' + item.Opponent.lastName} avatar1={item.User.avatar} avatar2={item.Opponent.avatar} username1={item.User.username} username2={item.Opponent.username} />
                                                )
                                            })
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="backc4">
                        <img src="TT.png" 
                        alt="" className="ShapeHover2" />
                        <h1 className="header_play4">Available modes</h1>
                        <div className="par_hover">
                            <div className="w-full h-full     ">
                                    <div className="w-full h-[100%] flex items-center justify-center">
                                        <div className="w-[50%] h-[100%]  flex flex-col justify-between ">
                                            <div className="w-[7.85rem] h-[40px] rounded-l-full  flex items-center justify-center rounded-r-full border-2 border-white
                                            2xl:w-[7.85rem]
                                            xl:w-[7rem] xl:h-[35px]
                                            Large-phone:w-[6rem] Large-phone:h-[28px]
                                            phone:w-[4.2rem] phone:bg-blue phone:h-[23px]
                                            ">
                                                <div className="w-[30%] h-[100%]  rounded-l-full flex items-center justify-center">
                                                    <BsFillPeopleFill className="w-[15px] h-[15px]
                                                    xl:w-[12px] xl:h-[12px]
                                                    Large-phone:w-[10px] Large-phone:h-[10px]
                                                    phone:w-[8px] phone:h-[8px]
                                                    "
                                                    style={{color: '#fff'}}
                                                    />
                                                </div>
                                                <div className="w-[70%] h-[100%]  rounded-r-full flex items-center">
                                                    <h1 className="font-sora text-[8px] text-white font-semibold leading-normal
                                                    xl:text-[6px]
                                                    Large-phone:text-[5px]
                                                    phone:text-[4px]
                                                    ">Play with friends</h1>
                                                </div>
                                            </div>
                                            <div className="w-[7.85rem] h-[40px] rounded-l-full  flex items-center justify-center rounded-r-full border-2 border-white
                                            2xl:w-[7.85rem]
                                            xl:w-[7rem]  xl:h-[35px]
                                            Large-phone:w-[6rem] Large-phone:h-[28px]
                                            phone:w-[4.2rem] phone:bg-blue phone:h-[23px]
                                            ">
                                                <div className="w-[30%] h-[100%]  rounded-l-full flex items-center justify-center">
                                                    <GiPerspectiveDiceSixFacesSix className="w-[15px] h-[15px]
                                                    xl:w-[12px] xl:h-[12px]
                                                    Large-phone:w-[10px] Large-phone:h-[10px]
                                                    phone:w-[8px] phone:h-[8px]
                                                    "
                                                    style={{color: '#fff'}}
                                                    />
                                                </div>
                                                <div className="w-[70%] h-[100%]  rounded-r-full flex items-center">
                                                    <h1 className="font-sora text-[8px] text-white font-semibold leading-normal
                                                    xl:text-[6px]
                                                    Large-phone:text-[5px]
                                                    phone:text-[4px]
                                                    ">Play with Random</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/2 h-[100%] ">
                                        <div className="w-[7.85rem] h-[40px] rounded-l-full  flex items-center justify-center rounded-r-full border-2 border-white
                                            2xl:w-[7.85rem]
                                            xl:w-[7rem]  xl:h-[35px]
                                            Large-phone:w-[6rem] Large-phone:h-[28px]
                                            phone:w-[4.2rem] phone:bg-blue phone:h-[23px]
                                            ">
                                                <div className="w-[30%] h-[100%]  rounded-l-full flex items-center justify-center">
                                                    <FaRobot className="w-[15px] h-[15px]
                                                    xl:w-[12px] xl:h-[12px]
                                                    Large-phone:w-[10px] Large-phone:h-[10px]
                                                    phone:w-[8px] phone:h-[8px]
                                                    "
                                                    style={{color: '#fff'}}
                                                    />
                                                </div>
                                                <div className="w-[70%] h-[100%]  rounded-r-full flex items-center">
                                                    <h1 className="font-sora text-[8px] text-white font-semibold leading-normal
                                                    xl:text-[6px]
                                                    Large-phone:text-[5px]
                                                    phone:text-[4px]
                                                    ">Play with Bot</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    );
}