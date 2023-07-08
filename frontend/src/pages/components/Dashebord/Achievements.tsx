import Achievement from "./Achievement"
import { useState, useEffect } from "react";

export default function Achievements() {

    const [data, setdata] = useState<any>();

    useEffect(() => {
        fetch('http://localhost:3000/achievements/ALL', 
        { credentials: 'include' }).then(res => res.json()).then(data => { setdata(data);})
    }, []);

    return (
        <div className="cont flex  justify-center overflow-hidden">
            <div className="w-[100%] h-[100%] flex flex-col items-center gap-[30px] rounded-t-[10px]  overflow-y-auto test5">
                    <div className="w-[100%] h-auto flex justify-center">
                        <select className="w-[85px] h-[19px] test5 mt-[10px] rounded-[4px] text-[white] text-[13px] pl-2 font-[400] font-sora">
                            <option value={'All'}>All</option>
                            <option value={'Done'}>Done</option>
                            <option value={'Undone'}>Undone</option>
                        </select>
                    </div>
                    <div className="w-full h-[100%] flex items-center justify-around overflow-y-auto">
                        <div className="w-[45%] h-[90%]">
                            {
                                data?.map((achievement: any, key:any) => {
                                    if (key % 2 == 0)
                                        return (
                                        <Achievement key={key} image="iconAch.jpeg" title={achievement.name}
                                        description={achievement.description}
                                        progress={achievement.score} milstone={parseInt(achievement.milestone)}
                                        reward={achievement.points}
                                        />
                                    )
                                }
                            )
                            }
                        </div>
                        <div className="w-[45%] h-[90%]">
                            {
                                data?.map((achievement: any, key:any) => {
                                    if (key % 2 !== 0)
                                        return (
                                            <Achievement key={key} image="iconAch.jpeg" title={achievement.name}
                                            description={achievement.description}
                                            progress={achievement.score} milstone={parseInt(achievement.milestone)}
                                            reward={achievement.points}
                                            />
                                        )
                                }
                                )
                            }
                        </div>
                    </div>
            </div>
        </div>
    )
}