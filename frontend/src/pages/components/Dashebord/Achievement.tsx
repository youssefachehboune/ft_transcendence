import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

interface AchievementProps {
    title: string;
    description: string;
    progress: number;
    reward: number;
    image: string;
    milstone: number;
}



export default function Achievement(props : AchievementProps) {
    
    return (
        <div className="w-[430px] 2xl:w-[380px] xl:w-[360px] laptop:w-[320px] phone:w-[220px] h-[120px] bg-[#ffffff12] mb-5 rounded-[8px] phone:h-[80px] relative flex phone:mb-2">
            <div className="w-[120px] h-[100%]  flex items-center justify-center
                2xl:w-[90px]
                xl:w-[90px] 
                laptop:w-[70px]
                phone:w-[60px]
            ">
                {/* <SkeletonCircle size={'84px'} startColor="#000012b3" endColor="#dbdbdd85"> */}
                <img src={props.image} alt="" className="w-[84px] h-[84px] rounded-full
                    xl:w-[73px] xl:h-[73px]
                    2xl:w-[75px] 2xl:h-[75px]
                    laptop:w-[62px] laptop:h-[62px]
                    phone:w-[53px] phone:h-[53px]
                "/>
                {/* </SkeletonCircle> */}
            </div>
            <div className="w-[60%] h-[100%] flex flex-col justify-center">
                {/* <Skeleton h={'16px'} startColor="#000012b3" endColor="#dbdbdd85" w={'80%'}> */}
                <h1 className="text-[#fff] text-[16px] font-regular font-sora leading-normal
                    desktop:text-[16px]
                    2xl:text-[14px]
                    xl:text-[14px]
                    laptop:text-[14px]
                    phone:text-[12px]
                ">{props.title}</h1>
                {/* </Skeleton> */}
                <p className="text-[#FFFFFF80] font-sora font-regulat text-[10px] leading-normal tracking-[0.025px] mb-2
                    phone:text-[5px]
                    2xl:text-[8px]
                    xl:text-[8px]
                    laptop:text-[7px]
                " >{props.description}</p>
                <div className="w-[130px] h-[9px] bg-[#D9D9D945] rounded-l-full rounded-r-full
                    phone:w-[60px] phone:h-[5px]
                    2xl:w-[90px] 2xl:h-[7px]
                    xl:w-[90px] xl:h-[7px]
                    laptop:w-[90px] laptop:h-[7px]
                "
                    style={{display: (props.progress/props.milstone)*100 === 100 ? 'none' : 'block'}}
                    >
                    <div className={`h-[100%] bg-[#00DAEA] rounded-l-full rounded-r-full`}
                    style={{display: (props.progress/props.milstone)*100 === 100 ? 'none' : 'block',
                            width: `${(props.progress/props.milstone)*100}%`,
                }}
                    ></div>
                    </div>
                </div>
                    <h1 className="font-sora font-semibold leading-normal text-[10px] absolute right-6 top-4 desktop:text-[10px] phone:text-[7px] phone:top-2 phone:right-3"
                        style={{color: (props.progress/props.milstone)*100 === 100 ? '#FFFFFF80' : '#00DAEA',}}
                    >+{props.reward} xp
                    </h1>
        </div>
    );
}