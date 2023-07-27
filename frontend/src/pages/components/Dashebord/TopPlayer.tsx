interface TopPlayerProps {
    avatar: string;
    name: string;
    username: string;
    rank: number;
    key: number;
}

export default function TopPlayer(props : TopPlayerProps) {
    return (
        <div className="h-[35%] w-[100%] flex items-center justify-start">
                                            <div className="w-[5%] h-[100%]   flex items-center justify-center
                                            phone:w-[8%] phone:h-[100%]
                                            ">
                                                <h1 className="font-sora font-bold text-[16px] leading-normal text-white
                                                2xl:text-[11px]
                                                xl:text-[11px]
                                                laptop:text-[11px]
                                                phone:text-[7px]
                                                ">{props.rank}</h1>
                                            </div>
                                            <div className="w-[12%] h-[100%]  flex items-center justify-center
                                            2xl:w-[14%] 2xl:h-[100%]
                                            xl:w-[13%] xl:h-[100%] 
                                            laptop:w-[13%] laptop:h-[100%]
                                            phone:w-[15%] phone:h-[100%]
                                            ">
                                                <img src={props.avatar} alt=""  className="w-[25px] h-[25px] rounded-full
                                                2xl:w-[23px] 2xl:h-[23px]
                                                xl:w-[24px] xl:h-[24px]
                                                laptop:w-[22px] laptop:h-[22px]
                                                Large-phone:w-[14px] Large-phone:h-[14px]
                                                phone:w-[14px] phone:h-[14px]
                                                "/>
                                            </div>
                                            <div className="w-[62%] h-[85%] flex flex-col justify-between
                                            laptop:w-[75%] laptop:h-[70%]
                                            phone:h-[63%] phone:w-[75%]
                                            ">
                                                <h1 className="font-sora text-[12px] font-bold text-[#fff] tracking-[0.36px]
                                                2xl:text-[9px]
                                                xl:text-[9px]
                                                laptop:text-[9px]
                                                phone:text-[5px]
                                                ">
                                                    {props.name}
                                                </h1>
                                                <h1 className="font-sora font-regular text-[10px] text-[#969696]
                                                2xl:text-[9px]
                                                xl:text-[9px]
                                                laptop:text-[8px]
                                                phone:text-[4px]
                                                ">
                                                    @{props.username}
                                                </h1>
                                            </div>
        </div>
    );
}