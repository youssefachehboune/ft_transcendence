import { ChangeEvent, useEffect, useState } from "react";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
function History() {

    const [status, setstatus] = useState<string>("ALL")
    const [win , setwin] =  useState<any>()
    const [lost , setlost] =  useState<any>()
    const [all , setall] =  useState<any>()
    const [historieloding, sethistorieloding] = useState<boolean>(false)
    const handlehistorieSelect = (event: ChangeEvent<HTMLSelectElement>) => {setstatus(event.target.value); sethistorieloding(false)};
    

    useEffect(() => {
        if (status === "LOST")
            fetch("http://localhost:3000/history/" + status, {credentials: "include"}).then((data) => {return data.json()}).then((data) => {setlost(data)}).then(() => sethistorieloding(true))
        else if (status === "WON")
            fetch("http://localhost:3000/history/" + status, {credentials: "include"}).then((data) => {return data.json()}).then((data) => {setwin(data)}).then(() => sethistorieloding(true))
        else if (status === "ALL")
            fetch("http://localhost:3000/history/" + status, {credentials: "include"}).then((data) => {return data.json()}).then((data) => {setall(data)}).then(() => sethistorieloding(true))
    }, [status])
    
    return ( 
        <div className="cont flex  justify-center overflow-hidden">
            <div className="w-[100%] h-[100%] flex flex-col items-center gap-[30px] rounded-t-[10px] rounded-l-[10px] overflow-y-auto test5">
                    <div className="w-[100%] h-auto flex justify-center">
                        <select onChange={handlehistorieSelect} className="w-[85px] h-[19px] test5 mt-[10px] rounded-[4px] text-[white] text-[13px] pl-2 font-[400] font-sora">
                            <option value={'ALL'}>all</option>
                            <option value={'LOST'}>Lost</option>
                            <option value={'WON'}>won</option>
                        </select>
                    </div>
                    {
                            !historieloding && 
                            Array.from(Array(8)).map((i) =>
                            <div className="w-[100%] min-h-[65px] text-white flex  overflow-hidden">
                                  <div className="w-[33.5%] flex items-center justify-end">
                                                <SkeletonCircle size={'54px'}></SkeletonCircle>
                                                <div className="w-[100px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]"><SkeletonText/></div>
                                    </div>
                                    <div className="w-[33.5%] flex flex-col items-center justify-center"><SkeletonText width={'55px'}></SkeletonText></div>
                                    <div className="w-[33.5%] flex items-center justify-start">
                                                <SkeletonCircle size={'54px'}></SkeletonCircle>
                                                <div className="w-[100px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]"><SkeletonText/></div>
                                    </div>
                            </div>
                            )
                    }
                    {
                            status === "LOST" && historieloding ? (
                                lost?.map((user: any, key: number) => (
                                    <div key={key} className="w-[100%] min-h-[65px] text-white flex  overflow-hidden">
                                            <div className="w-[33.5%] flex items-center justify-end">
                                                <img src={user.User.avatar} alt="" className="w-[54px] rounded-full"/>
                                                <div className="w-[100px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                                                    <h1 className="text-[7px] font-sora font-[600] text-[white] ">{user.User.firstName + " " + user.User.lastName}</h1>
                                                    <h1 className="text-[7px] font-sora font-[400] text-[#969696] ">{"@" + user.User.username}</h1>
                                                </div>
                                            </div>
                                            <div className="w-[33.5%] flex flex-col items-center justify-center">
                                                <h1 className="text-[22px] font-sora font-[400] text-[white]">{user.userPoints + " : " + user.opponentPoints}</h1>
                                                <h1 className="text-[9px] font-sora font-[400] text-[#B3B3B3]">{user.occuredAt}</h1>
                                            </div>
                                            <div className="w-[33.5%] flex items-center justify-start">
                                                <img src={user.Opponent.avatar} alt="" className="w-[54px] rounded-full"/>
                                                <div className="w-[100px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                                                    <h1 className="text-[7px] font-sora font-[600] text-[white] ">{user.Opponent.firstName + " " + user.Opponent.lastName}</h1>
                                                    <h1 className="text-[7px] font-sora font-[400] text-[#969696] ">{"@" + user.Opponent.username}</h1>
                                                </div>
                                            </div>
                                    </div>
                                ))
                        ) : status === "WON" && historieloding ? (
                            win?.map((user: any, key: number) => (
                                <div key={key} className="w-[100%] min-h-[65px] text-white flex  overflow-hidden">
                                        <div className="w-[33.5%] flex items-center justify-end">
                                            <img src={user.User.avatar} alt="" className="w-[54px] rounded-full"/>
                                            <div className="w-[100px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                                                <h1 className="text-[7px] font-sora font-[600] text-[white] ">{user.User.firstName + " " + user.User.lastName}</h1>
                                                <h1 className="text-[7px] font-sora font-[400] text-[#969696] ">{"@" + user.User.username}</h1>
                                            </div>
                                        </div>
                                        <div className="w-[33.5%] flex flex-col items-center justify-center">
                                            <h1 className="text-[22px] font-sora font-[400] text-[white]">{user.userPoints + " : " + user.opponentPoints}</h1>
                                            <h1 className="text-[9px] font-sora font-[400] text-[#B3B3B3]">{user.occuredAt}</h1>
                                        </div>
                                        <div className="w-[33.5%] flex items-center justify-start">
                                            <img src={user.Opponent.avatar} alt="" className="w-[54px] rounded-full"/>
                                            <div className="w-[100px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                                                <h1 className="text-[7px] font-sora font-[600] text-[white] ">{user.Opponent.firstName + " " + user.Opponent.lastName}</h1>
                                                <h1 className="text-[7px] font-sora font-[400] text-[#969696] ">{"@" + user.Opponent.username}</h1>
                                            </div>
                                        </div>
                                 </div>
                            ))
                        ) : status === "ALL" && historieloding ? (
                            all?.map((user: any, key: number) => (
                                <div key={key} className="w-[100%] min-h-[65px] text-white flex  overflow-hidden">
                                        <div className="w-[33.5%] flex items-center justify-end">
                                            <img src={user.User.avatar} alt="" className="w-[54px] rounded-full"/>
                                            <div className="w-[100px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                                                <h1 className="text-[7px] font-sora font-[600] text-[white] ">{user.User.firstName + " " + user.User.lastName}</h1>
                                                <h1 className="text-[7px] font-sora font-[400] text-[#969696] ">{"@" + user.User.username}</h1>
                                            </div>
                                        </div>
                                        <div className="w-[33.5%] flex flex-col items-center justify-center">
                                            <h1 className="text-[22px] font-sora font-[400] text-[white]">{user.userPoints + " : " + user.opponentPoints}</h1>
                                            <h1 className="text-[9px] font-sora font-[400] text-[#B3B3B3]">{user.occuredAt}</h1>
                                        </div>
                                        <div className="w-[33.5%] flex items-center justify-start">
                                            <img src={user.Opponent.avatar} alt="" className="w-[54px] rounded-full"/>
                                            <div className="w-[100px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                                                <h1 className="text-[7px] font-sora font-[600] text-[white] ">{user.Opponent.firstName + " " + user.Opponent.lastName}</h1>
                                                <h1 className="text-[7px] font-sora font-[400] text-[#969696] ">{"@" + user.Opponent.username}</h1>
                                            </div>
                                        </div>
                                 </div>
                            ))
                        ) : null
                    }
            </div>
        </div>
     );
}

export default History;