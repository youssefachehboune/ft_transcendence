import { BsFillPeopleFill } from "react-icons/bs";
import { GiPerspectiveDiceSixFacesSix } from "react-icons/gi";
import { FaRobot } from "react-icons/fa";

export default function Game() {
    return (
        <div className="cont">
            <div className="w-[100%] h-full test5 relative ">
                <div className="w-[100%] h-[50%]  flex items-center justify-center">
                    <div className="w-[100%] h-[70%]  flex flex-col justify-around items-center
                    Large-phone:h-[70%]
                    phone:h-[70%]
                    ">
                        <div className="h-[65px] w-[35rem] bg-[#00DAEA] rounded-l-full rounded-r-full flex items-center justify-center
                        Large-phone:w-[25rem] Large-phone:h-[50px]
                        phone:w-[17rem] phone:h-[50px]
                        ">
                            <div className="h-full w-[20%] rounded-l-full  flex items-center justify-center
                            Large-phone:w-[20%]
                            phone:w-[30%]
                            ">
                                <BsFillPeopleFill className="w-[40px] h-[40px]
                                Large-phone:w-[30px] Large-phone:h-[30px]
                                phone:w-[30px] phone:h-[30px]
                                "/>
                            </div>
                            <div className="h-full w-[80%]  rounded-r-full  flex items-center justify-start
                            Large-phone:w-[80%]
                            phone:w-[70%]
                            ">
                                <h1 className="font-sora text-[25px] font-semibold leading-normal
                                Large-phone:text-[20px]
                                phone:text-[20px]
                                ">
                                    Play with friends
                                </h1>
                            </div>
                        </div>
                        <div className="h-[65px] w-[35rem] bg-[#00DAEA] rounded-l-full rounded-r-full flex items-center justify-center
                        Large-phone:w-[25rem] Large-phone:h-[50px]
                        phone:w-[17rem] phone:h-[50px]
                        ">
                            <div className="h-full w-[20%] rounded-l-full  flex items-center justify-center
                            Large-phone:w-[20%]
                            phone:w-[30%]
                            ">
                                <GiPerspectiveDiceSixFacesSix className="w-[40px] h-[40px]
                                Large-phone:w-[30px] Large-phone:h-[30px]
                                phone:w-[30px] phone:h-[30px]
                                "/>
                            </div>
                            <div className="h-full w-[80%]  rounded-r-full  flex items-center justify-start
                            Large-phone:w-[80%]
                            phone:w-[70%]
                            ">
                                <h1 className="font-sora text-[25px] font-semibold leading-normal
                                Large-phone:text-[20px]
                                phone:text-[20px]
                                ">
                                    Play with Random
                                </h1>
                            </div>
                        </div>
                        <div className="h-[65px] w-[35rem] bg-[#00DAEA] rounded-l-full rounded-r-full flex items-center justify-center
                        Large-phone:w-[25rem] Large-phone:h-[50px]
                        phone:w-[17rem] phone:h-[50px]
                        ">
                            <div className="h-full w-[20%] rounded-l-full  flex items-center justify-center
                            Large-phone:w-[20%]
                            phone:w-[30%]
                            ">
                                <FaRobot className="w-[40px] h-[40px]
                                Large-phone:w-[30px] Large-phone:h-[30px]
                                phone:w-[30px] phone:h-[30px]
                                "/>
                            </div>
                            <div className="h-full w-[80%]  rounded-r-full  flex items-center justify-start
                            Large-phone:w-[80%]
                            phone:w-[70%]
                            ">
                                <h1 className="font-sora text-[25px] font-semibold leading-normal
                                Large-phone:text-[20px]
                                phone:text-[20px]
                                ">
                                    Play with Bot
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className="font-sora font-semibold absolute text-white text-[32px] top-4 z-99 left-4 2xl:text-[31px]
                xl:text-[31px] 2xl:top-4 xl:top-4 xl:left-4 2xl:left-4
                laptop:text-[30px] laptop:top-4 laptop:left-4
                Large-phone:text-[25px]
                phone:text-[25px]
                ">Game</h1>
            </div>
        </div>
    );
}