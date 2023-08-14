import { useEffect } from "react";
import Rank from "./Rank";
import { useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { color } from "framer-motion";
import { Skeleton, SkeletonCircle } from "@chakra-ui/react";
interface Props {
    username: string,
}
export default function Leaderboard(props: Props) {
    const [data, setdata] = useState<any>('');
    const [indexlevel, setindexlevel] = useState<number>(1);
    const [fetchda, setfetchda] = useState<boolean>(false);
    const [numberofpage, setnumberofpage] = useState<number>(1);
    const [showdataLoading, setshowdataLoading] = useState<boolean>(true);
    useEffect(() => {
        setfetchda(false);
        const fetchData = async () => {
            try {
                const numberofpages = await fetch('http://localhost:3000/leaderboard/pages', { credentials: "include" });
                const numberofpagesjson = await numberofpages.json();
                if (numberofpagesjson.error)
                    return;
                setnumberofpage(numberofpagesjson);
                const Leaderdata = await fetch('http://localhost:3000/leaderboard/' + indexlevel, { credentials: "include" });
                const Leaderdatajson = await Leaderdata.json();
                if (Leaderdatajson.error)
                    return;
                setdata(Leaderdatajson)
                setshowdataLoading(false);
            } catch (error) {
                console.log("error: " + error)
            }
        };
        fetchData();

    }, [fetchda])
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
        <div className="cont flex  flex-col justify-start items-center overflow-y-auto"
            style={
                {
                    backgroundColor: '#191421',
                }
            }
        >
            <div className="w-[75%] h-[90%]  overflow-y-auto mt-4 laptop:mt-2 phone:mt-2 Large-phone:mt-2
            laptop:w-[90%]
            phone:w-[90%]
            Large-phone:w-[90%]
            ">
                {
                    showdataLoading &&
                    showdataLoading && Array.from(Array(10).keys()).map((achievement: any, key: any) => {
                        return (
                            <div key={key} className="w-[100%] h-[90px] phone:h-[70px] Large-phone:h-[70px] bg-[#5d5d5d6a] laptop:h-[80px] xl:h-[80px] 2xl:h-[90px]  mb-3 rounded-[8px] flex justify-start items-center">
                                <div className="w-[9%] h-[100%] flex items-center justify-center
                            2xl:w-[8%]
                            xl:w-[8%]
                            laptop:w-[8%]
                            phone:w-[8%]
                            ">
                                </div>
                                <div className="w-[12%] h-[100%] flex items-center justify-center
                            2xl:w-[10%]
                            xl:w-[10%]
                            laptop:w-[10%]
                            phone:w-[14%]
                            ">
                                    <SkeletonCircle size='12' ></SkeletonCircle>
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
                                        <Skeleton width={'20'} height={'2'}></Skeleton>
                                        <Skeleton width={'8'} height={'2'} mt={'2'}></Skeleton>
                                    </div>
                                </div>
                            </div>
                        )
                    })

                }
                {
                    data && !showdataLoading && Array.isArray(data) && data.map((item: any, index: number) => (
                        <Rank key={index} rank={((indexlevel - 1) * 10) + index + 1} image={item.avatar}
                            username={item.firstName + ' ' + item.lastName} login={item.username}
                            level={item.level} levelProgress={Math.round((item.level % 1) * 100)} wins={item.won}
                            loses={item.lost} me={props.username === item.username ? true : false} />
                    ))
                }
            </div>
            <div className="w-full h-[60px] mt-2 flex items-center justify-center
                2xl:h-[50px]
                xl:h-[50px]
                laptop:h-[40px]
                Large-phone:h-[40px]
                phone:h-[30px]
                ">
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
                    onClick={IncrementIndex}>
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