import { BsFillPeopleFill } from "react-icons/bs";
import { GiPerspectiveDiceSixFacesSix } from "react-icons/gi";
import { FaRobot } from "react-icons/fa";
import { useState } from "react";
import FriendsGame from "./Game/FriendsGame";
import RandomGame from "./Game/RandomGame";
import RobotGame from "./Game/RobotGame";

export default function Game() {

    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isHovered1, setIsHovered1] = useState<boolean>(false);
    const [isHovered2, setIsHovered2] = useState<boolean>(false);
    const [showFriends, setShowFriends] = useState<boolean>(false);
    const [showRandom, setShowRandom] = useState<boolean>(false);
    const [showRobot, setShowRobot] = useState<boolean>(false);
    const [showMain, setShowMain] = useState<boolean>(true);
    return (
        <div className="cont">
            <div className="w-[100%] h-full test5 relative ">
                {
                    ((!showFriends && !showRandom && !showRobot) && showMain) && <div className="w-[100%] h-[50%]  flex items-center justify-center" 
                    style={
                        {
                            display: (showFriends || showRandom || showRobot) ? "none" : "flex"
                        }
                    }>
                        <div className="w-[100%] h-[70%]  flex flex-col justify-around items-center
                        Large-phone:h-[70%]
                        phone:h-[70%]
                        ">
                            <div className="h-[65px] w-[35rem] bg-[#00DAEA] rounded-l-full rounded-r-full flex items-center justify-center cursor-pointer transition-all duration-500 hover:bg-[#00DAEA00] hover:border-2 hover:border-[#00DAEA]
                            Large-phone:w-[25rem] Large-phone:h-[50px]
                            phone:w-[17rem] phone:h-[50px]
                            "
                            onMouseOver={(e) => {
                                setIsHovered(true);
                            }}
                            onMouseLeave={(e) => {
                                setIsHovered(false);
                            }}
                            onClick={(e) => {
                                setShowFriends(true);
                                setShowRandom(false);
                                setShowRobot(false);
                                setShowMain(false);
                            }}
                            >
                                <div className="h-full w-[20%] rounded-l-full  flex items-center justify-center
                                Large-phone:w-[20%]
                                phone:w-[30%]
                                ">
                                    <BsFillPeopleFill className="w-[40px] h-[40px] transition-all duration-500
                                    Large-phone:w-[30px] Large-phone:h-[30px]
                                    phone:w-[30px] phone:h-[30px]
                                    "
                                    style={{ color: isHovered ? "#00DAEA" : "#000" }}
                                    />
                                </div>
                                <div className="h-full w-[80%]  rounded-r-full  flex items-center justify-start
                                Large-phone:w-[80%]
                                phone:w-[70%]
                                ">
                                    <h1 className="font-sora text-[25px] font-semibold leading-normal transition-all duration-500
                                    Large-phone:text-[20px]
                                    phone:text-[20px]
                                    "
                                    style={{ color: isHovered ? "#00DAEA" : "#000" }}
                                    >
                                        Play with friends
                                    </h1>
                                </div>
                            </div>
                            <div className="h-[65px] w-[35rem] bg-[#00DAEA] rounded-l-full rounded-r-full flex items-center justify-center cursor-pointer transition-all duration-500 hover:bg-[#00DAEA00] hover:border-2 hover:border-[#00DAEA]
                            Large-phone:w-[25rem] Large-phone:h-[50px]
                            phone:w-[17rem] phone:h-[50px]
                            "
                            onMouseOver={(e) => {
                                setIsHovered1(true);
                            }}
                            onMouseLeave={(e) => {
                                setIsHovered1(false);
                            }}
                            onClick={(e) => {
                                setShowFriends(false);
                                setShowRandom(true);
                                setShowRobot(false);
                                setShowMain(false);
                            }}
                            >
                                <div className="h-full w-[20%] rounded-l-full  flex items-center justify-center
                                Large-phone:w-[20%]
                                phone:w-[30%]
                                ">
                                    <GiPerspectiveDiceSixFacesSix className="w-[40px] h-[40px] transition-all duration-500
                                    Large-phone:w-[30px] Large-phone:h-[30px]
                                    phone:w-[30px] phone:h-[30px]
                                    "
                                    style={{ color: isHovered1 ? "#00DAEA" : "#000" }}
                                    />
                                </div>
                                <div className="h-full w-[80%]  rounded-r-full  flex items-center justify-start
                                Large-phone:w-[80%]
                                phone:w-[70%]
                                ">
                                    <h1 className="font-sora text-[25px] font-semibold leading-normal transition-all duration-500
                                    Large-phone:text-[20px]
                                    phone:text-[20px]
                                    "
                                    style={{ color: isHovered1 ? "#00DAEA" : "#000" }}
                                    >
                                        Play with Random
                                    </h1>
                                </div>
                            </div>
                            <div className="h-[65px] w-[35rem] bg-[#00DAEA] rounded-l-full rounded-r-full flex items-center justify-center cursor-pointer transition-all duration-500 hover:bg-[#00DAEA00] hover:border-2 hover:border-[#00DAEA]
                            Large-phone:w-[25rem] Large-phone:h-[50px]
                            phone:w-[17rem] phone:h-[50px]
                            "
                            onMouseOver={(e) => {
                                setIsHovered2(true);
                            }}
                            onMouseLeave={(e) => {
                                setIsHovered2(false);
                            }}
                            onClick={(e) => {
                                setShowFriends(false);
                                setShowRandom(false);
                                setShowRobot(true);
                                setShowMain(false);
                            }}
                            >
                                <div className="h-full w-[20%] rounded-l-full  flex items-center justify-center
                                Large-phone:w-[20%]
                                phone:w-[30%]
                                ">
                                    <FaRobot className="w-[40px] h-[40px] transition-all duration-500
                                    Large-phone:w-[30px] Large-phone:h-[30px]
                                    phone:w-[30px] phone:h-[30px]
                                    "
                                    style={{ color: isHovered2 ? "#00DAEA" : "#000" }}
                                    />
                                </div>
                                <div className="h-full w-[80%]  rounded-r-full  flex items-center justify-start
                                Large-phone:w-[80%]
                                phone:w-[70%]
                                ">
                                    <h1 className="font-sora text-[25px] font-semibold leading-normal transition-all duration-500
                                    Large-phone:text-[20px]
                                    phone:text-[20px]
                                    "
                                    style={{ color: isHovered2 ? "#00DAEA" : "#000" }}
                                    >
                                        Play with Bot
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                
                {
                    showFriends && <FriendsGame /> 
                }
                {
                    showRandom && <RandomGame />
                }
                {
                    showRobot && <RobotGame />
                }
                <h1 className="font-sora font-semibold absolute text-white cursor-pointer text-[32px] top-4 z-99 left-4 2xl:text-[31px]
                xl:text-[31px] 2xl:top-4 xl:top-4 xl:left-4 2xl:left-4
                laptop:text-[30px] laptop:top-4 laptop:left-4
                Large-phone:text-[25px]
                phone:text-[25px]
                "
                onClick={(e) => {
                    setShowMain(true);
                    setShowFriends(false);
                    setShowRandom(false);
                    setShowRobot(false);
                    setIsHovered(false);
                    setIsHovered1(false);
                    setIsHovered2(false);
                }
                }
                >Game</h1>
            </div>
        </div>
    );
}