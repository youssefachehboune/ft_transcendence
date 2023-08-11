import { ChangeEvent, useEffect, useState } from "react";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import Image from "next/image";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

function History() {

    const [status, setstatus] = useState<string>("ALL")

    const handlehistorieSelect = (event: ChangeEvent<HTMLSelectElement>) => {setshowdataLoading(true);setstatus(event.target.value);};
    const [indexlevel, setindexlevel] = useState<number>(1);
    const [numberofpage, setnumberofpage] = useState<number>(1);
    const [all, setallhistorie] = useState<any>();
    const [fetchda, setfetchda] = useState<boolean>(false);
    const [showdataLoading, setshowdataLoading] = useState<boolean>(true);
    
    useEffect(() => {
        setfetchda(false);
        const fetchData = async () => {
            try {
                const numberofpages = await fetch('http://localhost:3000/history/pages', { credentials: "include" });
                const numberofpagesjson = await numberofpages.json();
                setnumberofpage(numberofpagesjson);
                const Leaderdata = await fetch(`http://localhost:3000/history/${status}/` + indexlevel, { credentials: "include" });
                const Leaderdatajson = await Leaderdata.json();
                setallhistorie(Leaderdatajson)
                setshowdataLoading(false);
            } catch (error) {
                console.log("error: " + error)
            }
        };
        fetchData();

    }, [fetchda, status])
    function IncrementIndex() {
        if (indexlevel < numberofpage) {
            setindexlevel(indexlevel + 1);
            setfetchda(true);
            setshowdataLoading(true);
        }
    }
    function DecrementIndex() {
        if (indexlevel > 1) {
            setindexlevel(indexlevel - 1);
            setfetchda(true);
            setshowdataLoading(true);
        }
    }
    return ( 
        <div className="cont flex flex-col  justify-center overflow-hidden">
            <div className="w-[100%] h-[90%] flex flex-col items-center gap-[30px] rounded-t-[10px] rounded-l-[10px] rounded-b-[0px] overflow-y-auto test5 ml-2">
                    <div className="w-[100%] h-auto flex justify-center">
                        <select onChange={handlehistorieSelect} className="w-[85px] h-[19px] test5 mt-[10px] rounded-[4px] text-[white] text-[13px] pl-2 font-[400] font-sora">
                            <option value={'ALL'}>all</option>
                            <option value={'LOST'}>Lost</option>
                            <option value={'WON'}>won</option>
                        </select>
                    </div>
                    {
                            showdataLoading && 
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
                            status === "LOST" && !showdataLoading  && all?.length > 0 ? (
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
                        ) : status === "WON" && !showdataLoading && all?.length > 0 ? (
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
                        ) : status === "ALL" && !showdataLoading && all?.length > 0 ? (
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
                        ) : all?.length == 0 && !showdataLoading ? (
                            <div className="text-white text-[15px] font-sora font-[700] text-center">you don&apos;t have historie to see</div>
                        ): null
                    }
            </div>
            <div className="w-[100%] min-h-[80px] flex items-center ml-2 justify-center test5 rounded-b-[10px] rounded-r-[10px] rounded-t-[0px]">
                <div className={`w-[35px] h-[35px] rounded-[10px] mr-2 bg-[#ffffff14] flex items-center justify-center ${1 === indexlevel ? 'cursor-auto' : 'cursor-pointer'}
                        phone:w-[30px] phone:h-[30px]
                        `}
                        onClick={DecrementIndex}
                    >
                        <AiFillCaretLeft className="w-[20px] h-[20px] transition-all duration-1000
                            phone:w-[18px] phone:h-[18px]
                            "
                            style={{ color: 1 !== indexlevel ? '#fff' : '#ffffff1A' }}
                        />
                    </div>
                    <div className={`w-[35px] h-[35px]  rounded-[10px] bg-[#ffffff14] flex items-center justify-center ${numberofpage === indexlevel ? 'cursor-auto' : 'cursor-pointer'}
                        phone:w-[30px] phone:h-[30px]
                        `}
                        onClick={IncrementIndex}
                        >
                        <AiFillCaretRight className="w-[20px] h-[20px] transition-all duration-1000
                            phone:w-[18px] phone:h-[18px]
                            "
                            style={{ color: numberofpage !== indexlevel ? '#fff' : '#ffffff1A' }}
                        />
                    </div>
            </div>
        </div>
     );
}

export default History;