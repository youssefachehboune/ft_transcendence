import { ChangeEvent, useEffect, useState } from "react";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import Image from "next/image";

function History({historieloding, all} : any) {

    const [status, setstatus] = useState<string>("ALL")

    const handlehistorieSelect = (event: ChangeEvent<HTMLSelectElement>) => {setstatus(event.target.value);};
    
    return ( 
        <div className="cont flex  justify-center overflow-hidden">
            <div className="w-[100%] h-[100%] flex flex-col items-center gap-[30px] rounded-t-[10px] rounded-l-[10px] overflow-y-auto test5 ml-2">
                    <div className="w-[100%] h-auto flex justify-center">
                        <select onChange={handlehistorieSelect} className="w-[85px] h-[19px] test5 mt-[10px] rounded-[4px] text-[white] text-[13px] pl-2 font-[400] font-sora">
                            <option value={'ALL'}>all</option>
                            <option value={'LOST'}>Lost</option>
                            <option value={'WON'}>won</option>
                        </select>
                    </div>
                    {
                            !historieloding && 
                            Array.from(Array(8)).map((key: any, index: number) =>
                            <div key={index} className="w-[100%] min-h-[65px] text-white flex  overflow-hidden">
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
                            status === "LOST" && historieloding  && all?.length > 0 ? (
                                all && all?.map((user: any, index: number) => {
                                    if (user.userPoints < user.opponentPoints)
                                        return (
                                        <div key={index} className="w-[100%] min-h-[65px] text-white flex  overflow-hidden">
                                                <div className="w-[33.5%] flex items-center justify-end">
                                                    <Image width={'54'} height={'54'} src={user.User.avatar} alt="" className="w-[54px] rounded-full"/>
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
                                                    <Image width={'54'} height={'54'} src={user.Opponent.avatar} alt="" className="w-[54px] rounded-full"/>
                                                    <div className="w-[100px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                                                        <h1 className="text-[7px] font-sora font-[600] text-[white] ">{user.Opponent.firstName + " " + user.Opponent.lastName}</h1>
                                                        <h1 className="text-[7px] font-sora font-[400] text-[#969696] ">{"@" + user.Opponent.username}</h1>
                                                    </div>
                                                </div>
                                        </div>

                                    )
                                })
                        ) : status === "WON" && historieloding && all?.length > 0 ? (
                            all && all?.map((user: any, index: number) => 
                            {
                                if (user.userPoints > user.opponentPoints)
                                    return (
                                        <div key={index} className="w-[100%] min-h-[65px] text-white flex  overflow-hidden">
                                                <div className="w-[33.5%] flex items-center justify-end">
                                                    <Image width={'54'} height={'54'} src={user.User.avatar} alt="" className="w-[54px] rounded-full"/>
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
                                                    <Image width={'54'} height={'54'} src={user.Opponent.avatar} alt="" className="w-[54px] rounded-full"/>
                                                    <div className="w-[100px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                                                        <h1 className="text-[7px] font-sora font-[600] text-[white] ">{user.Opponent.firstName + " " + user.Opponent.lastName}</h1>
                                                        <h1 className="text-[7px] font-sora font-[400] text-[#969696] ">{"@" + user.Opponent.username}</h1>
                                                    </div>
                                                </div>
                                        </div>
                                    )
                            })
                        ) : status === "ALL" && historieloding && all?.length > 0 ? (
                            all && all?.map((user: any, index: number) => (
                                <div key={index} className="w-[100%] min-h-[65px] text-white flex  overflow-hidden">
                                        <div className="w-[33.5%] flex items-center justify-end">
                                            <Image width={'54'} height={'54'} src={user.User.avatar} alt="" className="w-[54px] rounded-full"/>
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
                                            <Image width={'54'} height={'54'} src={user.Opponent.avatar} alt="" className="w-[54px] rounded-full"/>
                                            <div className="w-[100px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                                                <h1 className="text-[7px] font-sora font-[600] text-[white] ">{user.Opponent.firstName + " " + user.Opponent.lastName}</h1>
                                                <h1 className="text-[7px] font-sora font-[400] text-[#969696] ">{"@" + user.Opponent.username}</h1>
                                            </div>
                                        </div>
                                 </div>
                            ))
                        ) : all?.length == 0 && historieloding ? (
                            <div className="text-white text-[15px] font-sora font-[700] text-center">you don't have historie to see</div>
                        ): null
                    }
            </div>
        </div>
     );
}

export default History;