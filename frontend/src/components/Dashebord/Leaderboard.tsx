import { useEffect } from "react";
import Rank from "./Rank";
import { useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { color } from "framer-motion";
interface Props {
    username : string,
}
export default function Leaderboard(props : Props) {
    const [data, setdata] = useState<any>('');
    const [indexlevel, setindexlevel] = useState<number>(1);
    const [ fetchda, setfetchda] = useState<boolean>(false);
    const [numberofpage, setnumberofpage] = useState<number>(1);
    useEffect(() => {
        setfetchda(false);
        const fetchData = async () => {
            try {
                const numberofpages = await fetch('http://localhost:3000/leaderboard/pages', { credentials: "include" });
                const numberofpagesjson = await numberofpages.json();
                setnumberofpage(numberofpagesjson);
                
                const Leaderdata = await fetch('http://localhost:3000/leaderboard/' + indexlevel, { credentials: "include" });
                const Leaderdatajson = await Leaderdata.json();
                setdata(Leaderdatajson)
            } catch (error) {
                console.log("error: " + error)
              }
        };
        fetchData();

    }, [fetchda])
    function IncrementIndex() {
        if (indexlevel < numberofpage)
        {
            setindexlevel(indexlevel + 1);
            setfetchda(true);
        }
    }
    function DecrementIndex() {
        if (indexlevel > 1)
        {
            setindexlevel(indexlevel - 1);
            setfetchda(true);
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
                    data && data.map((item : any, index : number) => (
                        <Rank key={index} rank= { ((indexlevel - 1) * 10) + index + 1} image={item.avatar} 
                        username={item.firstName + ' ' + item.lastName} login={item.username} 
                        level={item.level} levelProgress={Math.round((item.level % 1) * 100)} wins={item.won} 
                        loses={item.lost} me={props.username === item.username ? true : false}/>
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
                            style={{color :1 !== indexlevel ? '#fff' : '#ffffff1A'}}
                            />
                    </div>
                    <div className={`w-[35px] h-[35px]  rounded-[10px] bg-[#ffffff14] flex items-center justify-center ${numberofpage === indexlevel ? 'cursor-auto' : 'cursor-pointer'}
                    phone:w-[30px] phone:h-[30px]
                    `}
                    onClick={IncrementIndex}>
                        <AiFillCaretRight className="w-[20px] h-[20px] transition-all duration-1000
                        phone:w-[18px] phone:h-[18px]
                        "
                            style={{color :numberofpage !== indexlevel ? '#fff' : '#ffffff1A'}}
                            />
                    </div>
            </div>
        </div>
    );
}