interface RankProps {
    rank: number;
    image: string;
    username: string;
    login : string;
    level: string;
    levelProgress: number;
    wins: number;
    loses: number;
    me: boolean;
}

export default function Rank(props : RankProps) {
    return (
        <div className={`w-[100%] h-[8%] ${props.me ? "bg-[#2C2875]" : "bg-[#ffffff14]"}  mb-3 rounded-[8px] flex justify-start items-center`}>
        <div className="w-[9%] h-[100%] flex items-center justify-center
        2xl:w-[8%]
        xl:w-[8%]
        laptop:w-[8%]
        phone:w-[8%]
        ">
                <h1 className="font-sora font-bold text-[20px] leading-normal text-[#ffffffd6] transition-all duration-1000
                2xl:text-p[20px]
                xl:text-[18px]
                laptop:text-[16px]
                phone:text-[14px]
                ">{props.rank}</h1>
        </div>
        <div className="w-[12%] h-[100%] flex items-center justify-center
        2xl:w-[10%]
        xl:w-[10%]
        laptop:w-[10%]
        phone:w-[14%]
        ">
                <img src={props.image} alt="" className="w-[54px] h-[54px]  rounded-full
                2xl:w-[50px] 2xl:h-[50px]
                xl:w-[45px] xl:h-[45px]
                laptop:w-[42px] laptop:h-[42px]
                phone:w-[35px] phone:h-[35px]
                "/>
        </div>
        <div className="w-[31%] h-[100%] flex justify-center items-center
        2xl:w-[30%]
        xl:w-[30%]
        laptop:w-[25%]
        phone:w-[28%]
        ">
            <div className="w-[100%] h-[60%] flex flex-col justify-between
            2xl:h-[50%]
            xl:h-[30%]
            laptop:h-[30%]
            phone:h-[47%]

            ">
                <h1 className="font-sora font-bold text-[14px] text-[white] tracking-[0.36px] leading-normal
                2xl:text-[12px]
                xl:text-[10px]
                laptop:text-[8px]
                phone:text-[6px]
                ">{props.username}</h1>
                <h1 className="font-sora text-[10px] font-regular leading-normal text-[#969696]
                2xl:text-[8px]
                xl:text-[6px]
                laptop:text-[6px]
                phone:text-[5px]
                ">@ {props.login}</h1>
            </div>
        </div>
        <div className="w-[22%] h-[100%] flex justify-center items-center
        2xl:w-[22%]
        xl:w-[22%]
        laptop:w-[27%]
        phone:w-[25%]

        ">
                <h1 className="text-[#ffffff80] font-sora text-[12px] font-semibold tracking-[0.03px] leading-normal
                2xl:text-[12px]
                xl:text-[12px]
                laptop:text-[11px]
                phone:text-[7px]
                ">Won <span className="text-[#fffd]">{props.wins}</span> | Lost <span className="text-[#fffd]">{props.loses}</span></h1>
        </div>
        <div className="w-[26%] h-[100%] flex justify-center items-center
        2xl:w-[30%]
        xl:w-[30%]
        laptop:w-[30%]
        Large-phone:w-[27%]
        phone:w-[25%]
        ">
            <div className="w-[80%] h-[50%] flex items-center justify-around
            2xl:w-[80%]
            xl:w-[80%]
            laptop:w-[80%]
            phone:w-[80%]

            ">
                <h1 className="text-[#ffffff80] font-sora font-semibold tracking-[0.033px] text-[13px] leading-normal
                2xl:text-[12px]
                xl:text-[12px]
                laptop:text-[11px]
                phone:text-[8px]    
                ">{props.level}</h1>
                <div className="w-[70%] h-[20%] bg-[#ffffff1A] rounded-[2px] overflow-hidden
                2xl:w-[70%]
                xl:w-[70%]
                laptop:w-[70%]
                phone:w-[60%]
                ">
                    <div className={`h-[100%] bg-[#4BA1B7] rounded-l-[2px]`}
                    style={
                        {
                            width: props.levelProgress === 0 ? '0%' : (props.levelProgress + '%')
                        }
                    }
                    >
                    </div>
                </div>
            </div>
        </div>
    </div> 
        );

}