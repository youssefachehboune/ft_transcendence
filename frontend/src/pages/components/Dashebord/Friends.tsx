import { useState } from "react";
import { BsClock, BsPeople } from "react-icons/bs";
import { FaBolt, FaChartBar, FaChartPie } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { VscSearch } from "react-icons/vsc";

function Friends({handelsearchChanges, data}: any) { 
    const [visible, setvisible] = useState<boolean>(false);
    const obj : any = {
        one:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        tow:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        tree:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        for:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        five:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        sex:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        a:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        b:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        c:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        e:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        v:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        f:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        g:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        h:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        i:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        l:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        k:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        y:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        z:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        m:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        x:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },
        n:{
            name: "mouhamed bjaghou",
            login: "mbjaghou",
            img: "mbjaghou.jpeg"
        },

    };
    const test = Object.values(obj);
    return (
        <div className="cont overflow-hidden flex gap-[10px]" >
            <div className="profile"></div>
            <div className="w-[40%] 2xl:w-[100%] xl:w-[100%] h-[100%] test5 flex flex-col items-center overflow-y-auto rounded-[10px]">
                                    <div className="w-[100%] h-auto flex flex-col items-center">
                                        <div className={`test5 w-[50%] h-[28px] flex justify-center items-center rounded-[15px] mt-[20px]`}>
                                            <div className="mr-[-5px]">
                                                <VscSearch className="w-[12px] h-[12px]" color="white" />
                                            </div>
                                            <input
                                                onKeyDown={handelsearchChanges}
                                                type="text"
                                                placeholder="Search friends"
                                                className="text-white text-[8px] font-sora font-[300] flex items-center bg-transparent  border-none outline-none pl-[20px] w-[70%]"
                                                />
                                            </div>
                                            <div className="w-[85%] h-[30px] self-end mt-[20px]">
                                                    <h1 className="font-[700] font-sora text-[11px] text-white">999 Friends</h1>
                                            </div>

                                    </div>
                                        <div className="w-[100%] h-[100%] gap-[10px] flex flex-col">
                                            {test.map((user: any, key) => (
                                                <div key={key} className="min-h-[61px] flex items-center">
                                                    <div className="w-[70%] flex items-center justify-center">
                                                        <img src={user.img} alt="" className="w-[54px] rounded-full"/>
                                                        <div className="w-[150px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                                                            <h1 className="text-[13px] font-sora font-[600] text-[white]">{user.name}</h1>
                                                            <h1 className="text-[10px] font-sora font-[400] text-[#969696] ">{"@" + user.login}</h1>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => {setvisible(!visible)}} className="text-white ml-[20%] mb-[10px]">
                                                        ...
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
            </div>
            {
                visible &&
                    <div className="w-[60%] h-[100%] test5 rounded-[10px] xl:hidden 2xl:hidden flex flex-col relative">
                        <img src="mbjaghou.jpeg" alt="" className="w-[131px] h-[131px] absolute top-[5%] left-[5%] rounded-full"/>
                        <div className="w-[100%] h-[10%] test5"></div>
                        <div className="w-[100%] h-[10%]">
                            <div className="w-[80%] h-[50%]  flex flex-col items-center justify-center">
                                <h1 className="text-white font-[700] font-sora text-[20px]">mouhamed bjaghou</h1>
                                <h1 className="text-white font-[400] font-sora text-[15px]">@mbjaghou</h1>
                            </div>
                            <div className="w-[70%] h-[50%] flex gap-[10px] items-center justify-end">
                                    <button className="w-[88px] h-[24px] test5 rounded-[4px] text-white">test</button>
                                    <button className="w-[88px] h-[24px] bg-white rounded-[4px] ">test</button>
                            </div>
                        </div>
                        <div className="w-[100%] h-[15%] ">
                            <h1 className="font-sora font-[700] text-[15px] p-[10px] text-white">Bio</h1>
                            <p className="font-sora font-[300] text-[13px] p-[10px] text-white">Wanderlust soul exploring the world one adventure at a time. ✈️🗺️ Sharing my passions: travel, photography, and embracing every moment. 📸✨ Join med inspiration. ✌️❤️</p>
                        </div>
                        <div className="w-[95%] h-[30%] flex">
                                <div className="w-[50%] h-[100%] flex flex-col justify-center items-end">
                                        <div className="w-[95%] h-[50%] flex flex-col justify-center gap-[20px] mb-[110px]">
                                                <h1 className="text-[white] text-[15px] font-sora font-[700] pl-[10px]">info</h1>
                                                <h1 className="text-[12px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><IoLocationOutline  className="w-[17px] h-[17px]"/></span>{data.info?.location}</h1>
                                                <h1 className="text-[12px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><BsPeople className="w-[17px] h-[17px]"/></span>{data.info?.count_friends} Friends</h1>
                                                <h1 className="text-[12px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><BsClock className="w-[17px] h-[17px]"/></span>{data.info?.member_since}</h1>
                                                <h1 className="text-[12px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><img src="g3.svg" className="w-[17px] h-[17px]"/></span>{data.info?.email}</h1>
                                        </div>
                                </div>
                                <div className="w-[50%] h-[100%]">
                                                <div className="w-[100%] h-[100%] flex flex-col items-center justify-center gap-[10px] ml-[20px]">
                                                        <h1 className="text-[white] text-[15px] font-sora font-[700] pl-[10px] self-start">Statistics</h1>
                                                            <div className="w-[100%] h-[56px] flex items-center gap-4">
                                                                <div className="test11 w-[32px] h-[32px] bg-orange rounded-full flex flex-col justify-center items-center"><img src="hhhhhhhh.svg" alt="" /></div>
                                                                <h1 className="text-[white] text-[13px] font-sora font-[400]">Global Rank<p className="text-[8px] font-sora font-[700]">Among the top 7.59%</p></h1>
                                                            </div>
                                                        <div className="w-[100%] h-[56px] flex items-center gap-4">
                                                            <div className="test2 w-[32px] h-[32px] bg-orange rounded-full flex flex-col justify-center items-center"><FaChartBar color="#FFE500"/></div>
                                                            <h1 className="text-[white] text-[13px] font-sora font-[400]">Level Progress<span className="text-[8px] font-sora font-[700] flex items-center">9,2<div className="w-[48px] h-[4px] ml-[5px] bg-[#FFE500] rounded-[2px]"></div></span></h1>
                                                        </div>
                                                        <div className="w-[100%] h-[56px] flex items-center gap-4 ">
                                                            <div className="test3 w-[32px] h-[32px] bg-orange rounded-full flex flex-col justify-center items-center"><FaChartPie color="#43C7FF"/></div>
                                                            <h1 className="text-[white] text-[13px] font-sora font-[400]">Total Statistics<p className="text-[8px] font-sora font-[700]">Won 90 | Lost 58 </p></h1>
                                                        </div>
                                                        <div className="w-[100%] h-[56px] flex items-center gap-4 ">
                                                            <div className="test4 w-[32px] h-[32px] bg-orange rounded-full flex flex-col justify-center items-center"><FaBolt color="#05FF00"/></div>
                                                            <h1 className="text-[white] text-[13px] font-sora font-[400]">Win Streak<p className="text-[8px] font-sora font-[700]">2 Matches</p></h1>
                                                        </div>
                                                </div>
                                </div>
                        </div>
                    </div>

            }
        </div>
     );
}

export default Friends;