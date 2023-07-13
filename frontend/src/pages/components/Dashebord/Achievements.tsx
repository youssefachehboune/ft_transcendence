import { data } from "autoprefixer";
import Achievement from "./Achievement"
import { useState, useEffect, use } from "react";
import { Skeleton } from "@chakra-ui/react";


export default function Achievements() {

    const [dataLoaded, setdataLoaded] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>('All');
    const [dataALL, setdataALL] = useState<any>();
    let a = 0;
    let b = 0;
    const handleOptionChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };
    useEffect(() => {
        fetch('http://localhost:3000/achievements/ALL', 
        { credentials: 'include' }).then(res => res.json()).then(data => { setdataALL(data);setdataLoaded(true)})
    }, [])
    return (
        <div className="cont flex  justify-center overflow-hidden">
            <div className="w-[100%] h-[100%] flex flex-col items-center gap-[30px] rounded-t-[10px]  overflow-y-auto test5">
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
                    <div className={`w-full h-[100%] flex  justify-around flex-wrap overflow-y-auto scroll-state`}>
                        {dataALL && dataALL.map((achievement : any, key: any) => {
                            if (selectedOption === 'All')
                                return (
                                    <Skeleton key={key} isLoaded={dataLoaded} marginTop={'10px'}>
                                        <Achievement key={key} image="iconAch.jpeg" title={achievement.name}
                                                    description={achievement.description}
                                                    progress={achievement.score} milstone={parseInt(achievement.milestone)}
                                                    reward={achievement.points}
                                        />
                                    </Skeleton>
                                )
                            else if (selectedOption === 'Undone' && achievement.score != parseInt(achievement.milestone))
                                {
                                    b = 1;
                                    return (
                                        <Achievement key={key} image="iconAch.jpeg" title={achievement.name}
                                                    description={achievement.description}
                                                    progress={achievement.score} milstone={parseInt(achievement.milestone)}
                                                    reward={achievement.points}
                                        />
                                    )
                                }
                            else if (selectedOption === 'Done' && achievement.score === parseInt(achievement.milestone))
                                {
                                    a = 1;
                                    return (
                                        <Achievement key={key} image="iconAch.jpeg" title={achievement.name}
                                                    description={achievement.description}
                                                    progress={achievement.score} milstone={parseInt(achievement.milestone)}
                                                    reward={achievement.points}
                                        />
                                    )
                                }
                        }
                        )
                        }
                        {a === 0 && selectedOption === 'Done' && <div className="w-[100%] h-[20px] phone:h-[15px]"><h1 className="text-white text-[15px] phone:text-[12px] font-sora font-[700] text-center">You didn't complete any achievement</h1></div>}
                        {b === 0 && selectedOption === 'Undone' && <div className="w-[100%] h-[20px] phone:h-[15px]"><h1 className="text-white text-[14px] phone:text-[10px] font-sora font-[700] text-center">You completed all the achievements in the game.</h1></div>}
                        <div className="w-[430px] h-[1px] phone:h-[1px] 2xl:w-[380px] xl:w-[360px] laptop:w-[320px] phone:w-[220px]">
                        </div>
                        <div className="w-[430px] h-[1px] phone:h-[1px] 2xl:w-[380px] xl:w-[360px] laptop:w-[320px] phone:w-[220px]">
                        </div>
                    </div>
            </div>
        </div>
    )
}