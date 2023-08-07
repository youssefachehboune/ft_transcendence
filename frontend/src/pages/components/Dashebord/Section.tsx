import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { BsGlobe, BsXLg } from "react-icons/bs";
import { VscBell, VscSettingsGear } from 'react-icons/vsc'
import {CgProfile} from 'react-icons/cg'
import { useState } from "react";
import { LiaUserFriendsSolid } from "react-icons/lia";
import {FaSearch} from 'react-icons/fa'
import FriendRequest from "./FriendRequest";
import Blocked from "./Blocked";
function Section({setshowchanel, setmenu, menu, massagenotif, setshowchatsection, showchatsection, setshowprofile, showprofile, setonlyChat}: any) {
    const SettingRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<HTMLDivElement>(null);
    const [showSettings, setshowSettings] = useState<boolean>(false);
    const [showRequest, setshowRequest] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [requestdata, setrequestdata] = useState<any>([]);
    const [blockeddata, setblockeddata] = useState<any>([]);
    const [isHovered2, setIsHovered2] = useState<boolean>(false);
    const [showdataRequest, setshowdataRequest] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async () => {
            const resb = await fetch("http://localhost:3000/friends/status/BLOCKED", {credentials: "include"});
            const datab = await resb.json();
            setblockeddata(datab);
            const res = await fetch("http://localhost:3000/friends/status/REQUESTED", {credentials: "include"});
            const data = await res.json();
            setrequestdata(data);
        }
        if (showRequest) {
            fetchData();
        }
    }, [showRequest])
    function handleMouseEnter1() {
        setIsHovered(true);
    }
    function handleMouseLeave1() {
        setIsHovered(false);
    }
    function handleMouseEnter2() {
        setIsHovered2(true);
    }
    function handleMouseLeave2() {
        setIsHovered2(false);
    }

    function handleClickRequest() {
        setshowprofile(true)
        setshowRequest(!showRequest);
    }
    function handleClickSettings() {
        setshowprofile(true)
        setshowSettings(!showSettings);
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClickRequest);
        return () => {
          document.removeEventListener('mousedown', handleOutsideClickRequest);
        };
      }
        , []);

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClickSetting);
        return () => {
          document.removeEventListener('mousedown', handleOutsideClickSetting);
        };
      }, []);
    const handleOutsideClickSetting = (event: MouseEvent) => {
        if (SettingRef.current && !SettingRef.current.contains(event.target as Node)) {
          setshowSettings(false);
        }
      };
    const handleOutsideClickRequest = (event: MouseEvent) => {
        if (requestRef.current && !requestRef.current.contains(event.target as Node)) {
          setshowRequest(false);
          setshowdataRequest(true);
        }
      };
return ( 
    <div className={"section"}>
        {
            !menu ? (
                <div className="w-[100%] h-[100%] flex items-center justify-around">
                   <button onClick={handleClickRequest} style={showRequest ? {color: "#fff"} : {}}>
                        <LiaUserFriendsSolid className="hovring w-[18px] h-[18px]"/>
                    </button>
                    <button onClick={() => {setshowprofile(!showprofile); setshowSettings(false);}} className="hidden 2xl:block xl:block">
                        <CgProfile className="hovring w-[18px] h-[18px]"/>
                    </button>
                    <button className="hidden xl:block 2xl:block" onClick={() => {setshowchanel(false); setshowchatsection(!showchatsection); setonlyChat(false); setshowprofile(true); setshowSettings(false);}}>
                    <AiOutlineMessage color={massagenotif ? "red" : ""} className="hovring w-[18px] h-[18px]"/>
                    </button>
                    <button>
                    <VscBell className="hovring w-[18px] h-[18px]"/>
                    </button>
                    <button>
                    <BsGlobe className="hovring w-[18px] h-[18px] "/>
                    </button>
                    <button>
                    <VscSettingsGear className="hovring w-[18px] h-[20px]" onClick={handleClickSettings}
                    style={
                        showSettings ? {color: "#fff"} : {}
                    }
                    />
                    </button>
                    <button onClick={() => setmenu(!menu)} className="hidden xl:block">
                        <FaSearch  className="hovring w-[18px] h-[18px]"/>
                    </button>
                </div>

            ): (
                <div className="w-[100%] h-[100%] flex items-center justify-end ml-[-20px]">

                    <button onClick={() => setmenu(!menu)} className="hidden xl:block">
                        <FaSearch  className="hovring w-[18px] h-[18px]"/>
                    </button>
                </div>
            )
        }
            {
                showRequest && <div ref={requestRef} className="w-[320px] h-[600px] absolute bg-[#261F30]  overflow-hidden right-[100px] xl:right-0 z-50 rounded-b-[6px]
                phone:w-[280px] phone:h-[570px]
                 flex items-end flex-col">
                    <div className="w-[100%] h-[13%] flex items-center justify-around">
                        <div className="w-[32%] h-[50%] bg-white rounded-[2px] flex items-center justify-center cursor-pointer transition-all duration-500 hover:border-[#fff] hover:border-[1.3px] hover:bg-[#ffffff00]"
                        onMouseEnter={handleMouseEnter1}
                        onMouseLeave={handleMouseLeave1}
                        onClick={() => {setshowdataRequest(true);}}
                        >
                                <h1 className="text-[8px] font-sora font-semibold transition-all duration-500"
                                style={
                                    {
                                        color: isHovered ? "#fff" : "#000"
                                    }
                                }
                                >REQUESTS</h1>
                        </div>
                        <div className="w-[32%] h-[50%] bg-[#ED5253] hover:border-[1.3px] flex items-center justify-center rounded-[2px] transition-all duration-500 cursor-pointer hover:border-[#ED5253]  hover:bg-[#ffffff00]"
                        onMouseEnter={handleMouseEnter2}
                        onMouseLeave={handleMouseLeave2}
                        onClick={() => {setshowdataRequest(false);}}
                        >
                                <h1 className="text-[8px] font-sora font-semibold transition-all duration-500   "
                                style={
                                    {
                                        color: !isHovered2 ? "#fff" : "#ED5253"
                                    }
                                }
                                >BLOCK-LIST</h1>
                        </div>
                    </div>
                    <div className="w-[100%] relative h-[87%]  flex flex-col justify-start items-center overflow-y-auto">
                        {

                            showdataRequest ?
                            requestdata.map((item: any, key : number) => {
                                return (
                                    <FriendRequest key={key} username={item.username} image={item.avatar} name={item.firstName + ' ' + item.lastName}/>
                                )
                            })
                            :
                            blockeddata.map((item: any, key : number) => {
                                return (
                                    <Blocked key={key} username={item.username} image={item.avatar} name={item.firstName + ' ' + item.lastName}/>
                                )
                            })

                        }
                        {
                            requestdata.length === 0 && showdataRequest && < h1 className="text-[14px] text-white font-sora font-semibold mt-6">No Request</h1>
                        }
                        {
                            blockeddata.length === 0 && !showdataRequest && < h1 className="text-[14px] text-white font-sora font-semibold mt-6">No Blocked</h1>
                        }
                    </div>
                </div>
            }
            {
                showSettings && <div ref={SettingRef} className="w-[350px] h-[300px] absolute bg-[#261F30]  overflow-y-auto right-0 z-50 rounded-b-[6px]
                 phone:w-[280px] phone:h-[270px]
                 flex items-end flex-col">
                    <div className="w-[100%] h-[9%] bg-[#FFFFFF0F] flex items-center justify-center flex-row">
                        <h1 className="font-sora font-semibold leading-normal text-[11px] text-[#fff]">Settings</h1>
                        <div className="h-[1px] w-[70%]"></div>
                        <button onClick={handleClickSettings}>
                            <BsXLg color="white" className=" w-[11px] h-[11px]"/>
                        </button>
                    </div>
                    <div className="w-[93%] h-[33%]">
                        <h1 className="font-sora text-[11px] font-semibold leading-normal text-[#fff] mt-2">Two-factor authentication</h1>
                        <div className="mt-3 w-[95%] h-[60%] flex items-center justify-between">
                            <button className="bg-[#5A84ED] rounded-[4px] w-[45%] h-[70%] text-[#fff] text-[10px] font-bold leading-normal
                            phone:text-[9px]
                            hover:bg-[#5a84ed00]
                            hover:border-[#5A84ED]
                            hover:box-border
                            hover:border-[1.5px]
                            transition duration-700 ease-in-out
                            ">
                                Disable two-factor
                            </button>
                            <button className="bg-[#5a84ed00] rounded-[4px] box-border	 border-white border-[1px] w-[45%] h-[70%] text-[#fff] text-[10px] font-bold leading-normal
                            phone:text-[9px]
                            hover:bg-[#fff] hover:text-[#000]
                            transition duration-700 ease-in-out
                            ">
                                Reset two-factor
                            </button>
                        </div>
                        <h1 className="font-sora text-[11px] font-semibold leading-normal text-[#fff] mt-2">About</h1>
                        <div className="mt-3 w-[80%] h-[60%] flex items-center justify-between">
                            <button className="bg-[#fff] rounded-[4px] w-[45%] h-[70%] text-[#000] text-[10px] font-bold leading-normal
                            phone:text-[9px]
                            hover:border-[1px]
                            hover:border-[#fff]
                            hover:bg-[#fff0]
                            hover:text-[#fff]
                            hover:box-border
                            transition duration-700 ease-in-out
                            ">
                                About us
                            </button>
                            <button className="bg-[#fff] rounded-[4px] box-border	 border-white border-[1px] w-[45%] h-[70%] text-[#000] text-[10px] font-bold leading-normal
                            phone:text-[9px]
                            hover:border-[#fff]
                            hover:bg-[#fff0]
                            hover:text-[#fff]
                            hover:box-border
                            transition duration-700 ease-in-out
                            ">
                                Github
                            </button>
                        </div>
                        <div className="mt-3 w-[80%] h-[60%] flex items-center justify-between">
                            <button className="bg-[#fff0] rounded-[4px] w-[40%] h-[70%] text-[#C30202] text-[11px] font-bold leading-normal
                            phone:text-[9px]
                            border-[1px]
                            border-[#C30202]
                            hover:border-none
                            hover:bg-[#C30202]
                            hover:text-[#fff]
                            hover:box-border
                            transition duration-700 ease-in-out
                            ">
                                Log out
                            </button>
                            <button className="bg-[#fff0] rounded-[4px] box-border	 border-[#C4C4C4B3] border-[1px] w-[50%] h-[70%] text-[#C4C4C4B3] text-[10px] font-bold leading-normal
                            phone:text-[9px]
                            hover:border-[#fff0]
                            hover:bg-[#C4C4C4B3]
                            hover:text-[#fff]
                            hover:box-border
                            transition duration-700 ease-in-out
                            ">
                                Delete account
                            </button>
                        </div>
                    </div>
                </div>
            }
    </div>
);
}

export default Section;