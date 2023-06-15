import { AiOutlineMessage } from "react-icons/ai";
import { BsClock, BsClockFill, BsFillPeopleFill, BsGlobe, BsPatchCheckFill, BsPeople } from "react-icons/bs";
import { VscBell, VscSearch, VscSettingsGear } from 'react-icons/vsc'
import {FaBolt, FaChartBar, FaChartPie, FaCompass, FaGamepad, FaMedal, FaPen} from 'react-icons/fa'
import { IoLocationOutline } from "react-icons/io5";
import Expolore from "./components/Dashebord/Expolore";
import { useEffect, useState } from "react";
import getProfile from "./api/getProfile";
import Main from "./components/Dashebord/Main_Cont";
function Dashebord() {
    const [data, setdata] = useState<any>('');
    const [isShow, setIsShow] = useState<boolean>(false);
    useEffect(() => {
		const fetchData = async () => {
			try {
			const fetchedUserData = await getProfile();
			setdata(fetchedUserData);
			} catch (error) {
			console.log('Error:', error);
			}
		};
		if (!data) {
			fetchData();
		}
		}, [data]);

    return ( 
        <div className="container_page overflow-hidden">

            <div className="chanel">
                <img src="Bar.svg" alt=""/>
            </div>
            <Main/>
            <div className="Expolore ">
                <h1 className="text-[32px] font-sora font-[600] text-[white] mb-[20px] ml-[10px]">Explore</h1>
                <Expolore Icone={FaCompass} text={"Home"}/>
                <Expolore Icone={BsFillPeopleFill} text={"Friends"}/>
                <Expolore Icone={BsClockFill} text={"History"}/>
                <Expolore Icone={FaMedal} text={"Achievements"}/>
                <Expolore Icone={FaGamepad} text={"Game"}/>
            </div>
            
            <div className="search">
                <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">
                    <div className="test5 w-[302px] h-[28px] rounded-[15px] flex justify-center items-center">
                    <div className="mr-[5px]">
                        <VscSearch className="w-[12px] h-[12px]" color="white" />
                    </div>
                    <input
                        type="text"
                        placeholder="You can add your friend with their username."
                        className="text-white text-[8px] font-sora font-[300] flex items-center bg-transparent  border-none outline-none pl-[20px] w-[70%]"
                        />
                    </div>
                </div>
            </div>
            
            <div className="section">
                <div className="w-[80%] h-[100%] flex items-center justify-around">
                    <button>
                    <AiOutlineMessage className="hovring w-[18px] h-[18px]"/>
                    </button>
                    <button>
                    <VscBell className="hovring w-[18px] h-[18px]"/>

                    </button>
                    <button>
                    <BsGlobe className="hovring w-[18px] h-[18px]"/>
                    </button>
                    <button>
                    <VscSettingsGear className="hovring w-[18px] h-[18px]"/>
                    </button>
                </div>
            </div>
    
            <div className="profile">
                <div className="w-[100%] h-[80%] mt-[20%] bg-[#070012] flex flex-col items-center overflow-hidden">
                    <div className="w-[143px] h-[143px]">
                        <img src={data.avatar} alt="" className="rounded-full border-indigo-400 border-[2px]"/>
                    </div>
                    <h1 className="mt-[10px] text-[white] font-sora font-[700] text-[16px] flex items-center">{data.full_name}<span className="ml-[5px]"><BsPatchCheckFill color="#2CBDE6"/></span></h1>
                    <h1 className="text-[white] font-sora font-[400] text-[12px]">{data.username}</h1>
                        <div className="w-[70%] h-[30px] flex flex-row justify-end items-center mt-[10px]">
                        <button className="w-[88px] h-[24px] rounded-[4px] bg-[#414243] relative hover:bg-[#00DAEA]">
                            
                            <h1 className="text-[white] text-[8px] flex items-center ml-[10px]"><span className="mr-[5px]"><FaPen/></span>Edite profile</h1>
                        </button>
                    </div>
                    <div className="w-[100%] h-[100px] flex flex-col justify-around ml-[50px]">
                            <h1 className="text-[10px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><IoLocationOutline/></span>{data.info?.location}</h1>
                            <h1 className="text-[10px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><BsPeople/></span>16 Friends</h1>
                            <h1 className="text-[10px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><BsClock/></span>Joined June 2010</h1>
                            <h1 className="text-[10px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><img src="g3.svg" className="w-[10px] h-[10px]"/></span>{data.info?.email}</h1>
                    </div>
                    <div className="w-[85%] h-[113px] mt-[30px]  flex flex-col items-start">
                        <h1 className="text-[white] text-[13px] font-sora font-[700]">BIO</h1>
                        <p className="text-[10px] text-[white] font-sora font-[400] mt-[10px]">
                            Wanderlust soul exploring the world one adventure at a time. ✈️🗺️ Sharing my passions: travel, photography, and embracing every moment. 📸✨ Join me on this journey of discovery and inspiration. ✌️❤️
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
                                        <h1 className="text-[white] text-[13px] font-sora font-[400]">Global Rank<p className="text-[8px] font-sora font-[700]">Among the top 7.59%</p></h1>
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

        </div>
     );
}

export default Dashebord;