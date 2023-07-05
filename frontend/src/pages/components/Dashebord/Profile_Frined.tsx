import { AiFillMessage } from "react-icons/ai";
import { BsClock, BsPatchCheckFill, BsPeople, BsPersonCheckFill } from "react-icons/bs";
import { FaBolt, FaChartBar, FaChartPie } from "react-icons/fa";
import { IoArrowBackCircle, IoLocationOutline } from "react-icons/io5";

function Profile_Frined({setvisible, data, test}: any) {
    return (
                    <div className="w-[60%] h-[100%] rounded-[10px] xl:w-[100%] 2xl:w-[100%] flex flex-col overflow-y-auto overflow-x-hidden test5">
                        <div className="w-[100%] min-h-[300px] flex flex-col items-end overflow-hidden">
                                    <div className="w-[100%] h-[50%] test5">
                                        <button onClick={() => {setvisible(false)}}>
                                            <IoArrowBackCircle color="white"  className="w-[30px] h-[30px]"/>
                                        </button>
                                    </div>
                                    <div className="w-[100%] h-[50%] mt-[-30px] flex items-center mr-[-20px] self-end">
                                        <img src="mbjaghou.jpeg" alt="" className="w-[144px] rounded-full select-none mr-[30px] mt-[-60px]"/>
                                        <div>
                                            <h1 className="text-white font-[700] font-sora text-[20px] flex items-center">mouhamed bjaghou<span className="ml-[5px]"><BsPatchCheckFill color="#2CBDE6"/></span></h1>
                                            <h1 className="text-white font-[400] font-sora text-[15px]">@mbjaghou</h1>
                                        </div>
                                    </div>
                                    <div className="w-[70%] h-[30%] flex gap-[10px] items-center justify-center mt-[-50px]">
                                            <button className="w-[88px] h-[24px] test5 rounded-[4px] hover:bg-[#00DAEA]"><h1 className="text-white font-sora text-[11px] font-400 flex items-center ml-[10px]"><span className="mr-[5px]"><BsPersonCheckFill/></span>Friends</h1></button>
                                            <button className="w-[88px] h-[24px] test5 text-white rounded-[4px] font-sora text-[11px] font-400 hover:bg-[#00DAEA]"><h1 className="text-white font-sora text-[11px] font-400 flex items-center ml-[10px]"><span className="mr-[5px]"><AiFillMessage/></span>message</h1></button>
                                            <select id="block" className="w-[30px] rounded-[4px]">
                                                <option value=""></option>
                                                <option value="">block</option>
                                            </select>
                                    </div>

                        </div>
                        <div className="w-[80%] min-h-[180px] overflow-hidden">
                            <h1 className="font-sora font-[700] text-[15px] p-[10px] text-white">Bio</h1>
                            <p className="font-sora font-[300] text-[13px] p-[10px] text-white">Wanderlust soul exploring the world one adventure at a time. ✈️🗺️ Sharing my passions: travel, photography, and embracing every moment. 📸✨ Join med inspiration. ✌️❤️</p>
                        </div>
                        <div className="w-[95%] min-h-[220px] flex relative ">
                                <div className="w-[2px] h-[150px] top-[5%] left-[53%] test5 absolute"></div>
                                <div className="w-[60%] h-[100%]">
                                        <div className="w-[100%] h-[50%] flex flex-col justify-around ml-[10px]">
                                                <h1 className="text-[white] text-[15px] font-sora font-[700] pl-[10px] mt-[-10px]">info</h1>
                                                <h1 className="text-[12px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><IoLocationOutline  className="w-[17px] h-[17px]"/></span>{data.info?.location}</h1>
                                                <h1 className="text-[12px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><BsPeople className="w-[17px] h-[17px]"/></span>{data.info?.count_friends} Friends</h1>
                                                <h1 className="text-[12px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><BsClock className="w-[17px] h-[17px]"/></span>{data.info?.member_since}</h1>
                                                <h1 className="text-[12px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><img src="g3.svg" className="w-[17px] h-[17px]"/></span>{data.info?.email}</h1>
                                        </div>
                                </div>
                                <div className="w-[40%] h-[100%]">
                                                <div className="w-[100%] h-[100%] flex flex-col items-center  ml-[20px]">
                                                        <h1 className="text-[white] text-[15px] font-sora font-[700] pl-[10px] self-start">Statistics</h1>
                                                            <div className="w-[100%] h-[56px] flex items-center gap-4">
                                                                <div className="test11 w-[32px] h-[32px] rounded-full flex flex-col justify-center items-center"><img src="hhhhhhhh.svg" alt="" /></div>
                                                                <h1 className="text-[white] text-[13px] font-sora font-[400]">Global Rank<p className="text-[8px] font-sora font-[700]">Among the top 7.59%</p></h1>
                                                            </div>
                                                        <div className="w-[100%] h-[56px] flex items-center gap-4">
                                                            <div className="test2 w-[32px] h-[32px] rounded-full flex flex-col justify-center items-center"><FaChartBar color="#FFE500"/></div>
                                                            <h1 className="text-[white] text-[13px] font-sora font-[400]">Level Progress<span className="text-[8px] font-sora font-[700] flex items-center">9,2<div className="w-[48px] h-[4px] ml-[5px] bg-[#FFE500] rounded-[2px]"></div></span></h1>
                                                        </div>
                                                        <div className="w-[100%] h-[56px] flex items-center gap-4 ">
                                                            <div className="test3 w-[32px] h-[32px] rounded-full flex flex-col justify-center items-center"><FaChartPie color="#43C7FF"/></div>
                                                            <h1 className="text-[white] text-[13px] font-sora font-[400]">Total Statistics<p className="text-[8px] font-sora font-[700]">Won 90 | Lost 58 </p></h1>
                                                        </div>
                                                        <div className="w-[100%] h-[56px] flex items-center gap-4 ">
                                                            <div className="test4 w-[32px] h-[32px] rounded-full flex flex-col justify-center items-center"><FaBolt color="#05FF00"/></div>
                                                            <h1 className="text-[white] text-[13px] font-sora font-[400]">Win Streak<p className="text-[8px] font-sora font-[700]">2 Matches</p></h1>
                                                        </div>
                                                </div>
                                </div>
                        </div>
                            <h1 className="text-[white] font-sora text-[15px] p-5">Last History</h1>
                            <div className="w-[100%] min-h-[300px] test5 rounded-[20px] flex flex-col justify-center gap-[5px]">
                                                {test.slice(0, 4).map((user: any, key: any) => (
                                                    <div key={key} className="w-[100%] min-h-[65px] text-white flex overflow-hidden">
                                                        <div className="w-[33.5%] flex items-center justify-end ">
                                                            <img src={user.img} alt="" className="w-[54px] rounded-full select-none"/>
                                                            <div className="w-[100px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                                                                <h1 className="text-[7px] font-sora font-[600] text-[white] ">{user.name}</h1>
                                                                <h1 className="text-[7px] font-sora font-[400] text-[#969696] ">{"@" + user.login}</h1>
                                                            </div>
                                                        </div>
                                                        <div className="w-[33.5%] flex flex-col items-center justify-center">
                                                            <h1 className="text-[22px] font-sora font-[400] text-[white]">7 : 5</h1>
                                                            <h1 className="text-[9px] font-sora font-[400] text-[#B3B3B3]">1 Hours ago</h1>
                                                        </div>
                                                        <div className="w-[33.5%] flex items-center justify-start">
                                                            <img src={user.img} alt="" className="w-[54px] rounded-full select-none"/>
                                                            <div className="w-[100px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                                                                <h1 className="text-[7px] font-sora font-[600] text-[white] ">{user.name}</h1>
                                                                <h1 className="text-[7px] font-sora font-[400] text-[#969696] ">{"@" + user.login}</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                            </div>
        </div>
     );
}

export default Profile_Frined;