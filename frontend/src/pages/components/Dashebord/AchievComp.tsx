interface AchievementProps {
    title: string;
    description: string;
    reward: number;
}

export default function AchievComp(props : AchievementProps) {
    return (
        <div className="w-[56%] h-[40%]  relative flex items-center justify-center">
                                        <div className="w-[27%] h-[100%] flex items-center justify-center">
                                            <img src="iconAch.jpeg" alt="" className="w-[35px] h-[35px] rounded-full
                                            2xl:w-[31px] 2xl:h-[31px]
                                            xl:w-[30px] xl:h-[30px]
                                            laptop:w-[27px] laptop:h-[27px]
                                            Large-phone:w-[20px] Large-phone:h-[20px]
                                            phone:w-[17px] phone:h-[17px]
                                            "/>
                                        </div>
                                        <div className="w-[73%] h-[100%] flex flex-col justify-center">
                                                <h1 className="text-white text-[9px] font-sora font-regular leading-normal
                                                2xl:text-[7px]
                                                xl:text-[7px]
                                                laptop:text-[5px]
                                                Large-phone:text-[5px]
                                                phone:text-[5px]
                                                ">
                                                    {props.title}
                                                </h1>
                                                <p className="text-[#FFFFFF80] font-sora font-regulat text-[5px] leading-normal tracking-[0.025px] mt-2
                                                2xl:text-[5px]
                                                xl:text-[5px]
                                                laptop:text-[5px]
                                                Large-phone:text-[5px]
                                                phone:text-[3px]
                                                ">
                                                    {props.description}
                                                </p>
                                        </div>
                                        <h1 className="font-sora font-semibold text-[5px] text-[#AAA] absolute right-2 top-2 z-99
                                        2xl:text-[4px]
                                        xl:text-[4px]
                                        laptop:text-[3px] 
                                        Large-phone:text-[3px] Large-phone:top-1 Large-phone:right-1
                                        phone:text-[3px] phone:top-1 phone:right-1
                                        ">+{props.reward} px</h1>
        </div>

    );
}