import {FaBolt, FaChartBar, FaChartPie, FaPen} from 'react-icons/fa'
import { BsClock, BsPatchCheckFill, BsPeople } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";

interface Profile
{
    data: any;
}
function Profile({data} : Profile) {
    return (
            <div className="profile">
            <div className="w-[100%] h-[85%] mt-[20%] bg-[#070012] flex flex-col items-center overflow-hidden">
                <div className="w-[143px] h-[143px]">
                    <img src={data.avatar} alt="" className="w-[143px] h-[143px] rounded-full border-indigo-400 border-[2px] select-none"/>
                </div>
                <h1 className="mt-[10px] text-[white] font-sora font-[700] text-[16px] flex items-center">{data.full_name}<span className="ml-[5px]"><BsPatchCheckFill color="#2CBDE6"/></span></h1>
                <h1 className="text-[white] font-sora font-[400] text-[12px]">{data.username}</h1>
                    <div className="w-[70%] h-[30px] flex flex-row justify-end items-center mt-[10px]">
                    <button className="w-[88px] h-[24px] rounded-[4px] bg-[#414243]  hover:bg-[#00DAEA]">
                        
                        <h1 className="text-[white] text-[8px] flex items-center ml-[10px]"><span className="mr-[5px]"><FaPen/></span>Edite profile</h1>
                    </button>
                </div>
                <div className="w-[100%] h-[100px] flex flex-col justify-around ml-[50px]">
                        <h1 className="text-[10px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><IoLocationOutline/></span>{data.info?.location}</h1>
                        <h1 className="text-[10px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><BsPeople/></span>{data.info?.count_friends} Friends</h1>
                        <h1 className="text-[10px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><BsClock/></span>{data.info?.member_since}</h1>
                        <h1 className="text-[10px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><img src="g3.svg" className="w-[10px] h-[10px]"/></span>{data.info?.email}</h1>
                </div>
                <div className="w-[85%] h-[113px] mt-[30px]  flex flex-col items-start break-words">
                    <h1 className="text-[white] text-[13px] font-sora font-[700]">BIO</h1>
                    <p className="text-[10px] text-[white] font-sora font-[400] mt-[10px] w-[100%] h-[100%]">
                        {data.info?.bio}
                    </p>
                </div>
                <div className="w-[85%] h-[300px] mt-[70px] flex flex-col items-start overflow-hidden">
                    <h1 className="text-[white] text-[13px] font-sora font-[700]">Statistics</h1>
                            <div className="w-[100%] h-[100%] flex flex-col items-center justify-evenly ml-[20px]">
                                <div className="w-[100%] h-[56px] flex items-center gap-4 ">
                                    <div className="test11 w-[32px] h-[32px] bg-orange rounded-full flex flex-col justify-center items-center"><img src="hhhhhhhh.svg" alt="" /></div>
                                    <h1 className="text-[white] text-[13px] font-sora font-[400]">Global Rank<p className="text-[8px] font-sora font-[700]">Among the top 7.59%</p></h1>
                                </div>
                                <div className="w-[100%] h-[56px] flex items-center gap-4 ">
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
    );
}

export default Profile;