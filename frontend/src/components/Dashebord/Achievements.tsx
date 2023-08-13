import { data } from "autoprefixer";
import Achievement from "./Achievement"
import { useState, useEffect } from "react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
export default function Achievements() {
    const [showdataLoading, setshowdataLoading] = useState<boolean>(true);
    const [dataALL, setdataALL] = useState<any>();
    const [selectedOption, setSelectedOption] = useState<string>('All');
    useEffect(() => {
        const fetchData = async () => {
            const datafetched = await fetch('http://localhost:3000/achievements/ALL', { credentials: 'include' });
            const data = await datafetched.json();
            if (data.error) 
                return ;
            setdataALL(data);
            setshowdataLoading(false);
        };
        fetchData();

    }, []);

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };
    return (
        <div className="cont flex  justify-center overflow-hidden">
            <div className="w-[95%] h-[100%] flex flex-col items-center gap-[30px] rounded-t-[10px]  overflow-y-auto test5 ml-2">
                <div className="w-[100%] h-auto flex justify-center">
                    <select className="w-[85px] h-[19px] test5 mt-[10px] rounded-[4px] text-[white] text-[13px] pl-2 font-[400] font-sora"
                        value={selectedOption}
                        onChange={handleOptionChange}
                    >
                        <option value={'All'}>All</option>
                        <option value={'Done'}>Done</option>
                        <option value={'Undone'}>Undone</option>
                    </select>
                </div>
                <div className="w-full h-[100%] flex  justify-around flex-wrap overflow-y-auto scroll-state">
                    {
                        showdataLoading && Array.from(Array(15).keys()).map((achievement: any, key: any) => {
                            return (
                                <div key={key} className="w-[430px] 2xl:w-[380px] xl:w-[360px] laptop:w-[320px] phone:w-[220px] h-[120px] bg-[#5d5d5d6a] mb-5 rounded-[8px] phone:h-[80px] relative flex phone:mb-2">
                                    <div className="w-[120px] h-[100%]  flex items-center justify-center
                                        2xl:w-[90px]
                                        xl:w-[90px] 
                                        laptop:w-[70px]
                                        phone:w-[60px]
                                    ">
                                        <SkeletonCircle size='12' ></SkeletonCircle>
                                    </div>
                                    <div className="w-[60%] h-[100%] flex flex-col justify-center">
                                        <Skeleton width={'20'} height={'2'}></Skeleton>
                                        <Skeleton width={'8'} height={'2'} mt={'2'}></Skeleton>
                                    </div>
                                </div>
                            )
                        }
                        )
                    }
                    {dataALL && !showdataLoading && Array.isArray(dataALL) && dataALL.map((achievement: any, key: any) => {
                        if (selectedOption === 'All')
                            return (
                                <Achievement key={key} image="/iconAch.jpeg" title={achievement.name}
                                    description={achievement.description}
                                    progress={achievement.score} milstone={parseInt(achievement.milestone)}
                                    reward={achievement.points}
                                />
                            )
                        else if (selectedOption === 'Undone' && achievement.score != parseInt(achievement.milestone))
                            return (
                                <Achievement key={key} image="/iconAch.jpeg" title={achievement.name}
                                    description={achievement.description}
                                    progress={achievement.score} milstone={parseInt(achievement.milestone)}
                                    reward={achievement.points}
                                />
                            )
                        else if (selectedOption === 'Done' && achievement.score === parseInt(achievement.milestone))
                            return (
                                <Achievement key={key} image="/iconAch.jpeg" title={achievement.name}
                                    description={achievement.description}
                                    progress={achievement.score} milstone={parseInt(achievement.milestone)}
                                    reward={achievement.points}
                                />
                            )
                    }
                    )
                    }
                    <div className="w-[430px] h-[1px] phone:h-[1px] 2xl:w-[380px] xl:w-[360px] laptop:w-[320px] phone:w-[220px]">
                                </div>
                                <div className="w-[430px] h-[1px] phone:h-[1px] 2xl:w-[380px] xl:w-[360px] laptop:w-[320px] phone:w-[220px]">
                                </div>
                                <div className="w-[430px] h-[1px] phone:h-[1px] 2xl:w-[380px] xl:w-[360px] laptop:w-[320px] phone:w-[220px]">
                                </div>
                                <div className="w-[430px] h-[1px] phone:h-[1px] 2xl:w-[380px] xl:w-[360px] laptop:w-[320px] phone:w-[220px]">
                                </div>
                                <div className="w-[430px] h-[1px] phone:h-[1px] 2xl:w-[380px] xl:w-[360px] laptop:w-[320px] phone:w-[220px]">
                                </div>
                    
                    
                </div>
            </div>
        </div>
    )
}