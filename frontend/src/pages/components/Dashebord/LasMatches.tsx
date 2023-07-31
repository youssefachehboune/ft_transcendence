interface LastMatchesProps {
    name1 : string;
    username1 : string;
    avatar1 : string;
    name2 : string;
    username2 : string;
    avatar2 : string;
    score1 : number;
    score2 : number;
}


export default function LasMatches(props : LastMatchesProps) {
    return (
        <div className="w-[100%] h-[34%] flex items-center justify-center">
                                            <div className="w-[42%] h-[100%] flex items-center justify-center">
                                                <div className="w-[27%] h-[100%]  flex items-center justify-center">
                                                    <img src={props.avatar1} alt=""  className="w-[25px] h-[25px] rounded-full
                                                    2xl:w-[24px] 2xl:h-[24px] xl:w-[24px] xl:h-[24px] laptop:w-[22px] laptop:h-[22px] phone:w-[14px] phone:h-[14px]
                                                    "/>
                                                </div>
                                                <div className="h-[100%] w-[73%]  flex flex-col justify-between items-start
                                                                                                Large-phone:h-[65%]
                                                                                                phone:h-[65%]
                                                ">
                                                    <h1 className="font-sora text-[8px] font-bold text-[#fff] tracking-[0.36px] 
                                                    2xl:text-[6px]
                                                    xl:text-[6px]
                                                    laptop:text-[5px]
                                                    phone:text-[3px]
                                                    ">
                                                        {props.name1}
                                                    </h1>
                                                    <h1 className="font-sora font-regular text-[8px] text-[#969696]
                                                    2xl:text-[7px]
                                                    xl:text-[7px]
                                                    laptop:text-[6px]
                                                    phone:text-[4px]
                                                    ">
                                                        @{props.username1}
                                                    </h1>
                                                </div>
                                            </div>
                                            <div className="w-[16%] h-[100%] flex items-center justify-center">
                                                <h1 className="font-sora font-bold text-[16px] leading-normal text-white
                                                2xl:text-[11px]
                                                xl:text-[11px]
                                                laptop:text-[11px]
                                                phone:text-[7px]">{props.score1 + '  :  ' + props.score2}</h1>
                                            </div>
                                            <div className="w-[42%] h-[100%]  flex items-center justify-center">
                                                <div className="h-[100%] w-[73%] flex flex-col justify-between items-end
                                                Large-phone:h-[65%]
                                                phone:h-[65%]
                                                ">
                                                    <h1 className="font-sora text-[8px] font-bold text-[#fff] tracking-[0.36px] items-end
                                                    2xl:text-[7px]
                                                    xl:text-[7px]
                                                    laptop:text-[5px]
                                                    phone:text-[3px]
                                                    ">
                                                        {props.name2}
                                                    </h1>
                                                    <h1 className="font-sora font-regular text-[8px] text-[#969696]
                                                    2xl:text-[7px]
                                                    xl:text-[7px]
                                                    laptop:text-[6px]
                                                    phone:text-[4px]
                                                    ">
                                                        @{props.username2}  
                                                    </h1>
                                                </div>
                                                <div className="w-[27%] h-[100%]  flex items-center justify-center">
                                                    <img src={props.avatar2} alt=""  className="w-[25px] h-[25px] rounded-full
                                                    2xl:w-[24px] 2xl:h-[24px] xl:w-[24px] xl:h-[24px] laptop:w-[22px] laptop:h-[22px] phone:w-[14px] phone:h-[14px]
                                                    "/>
                                                </div>
                                            </div>
        </div>
    );

}