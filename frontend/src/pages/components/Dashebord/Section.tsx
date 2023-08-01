import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { BsGlobe, BsXLg } from "react-icons/bs";
import { VscBell, VscSettingsGear } from 'react-icons/vsc'
import {CgProfile} from 'react-icons/cg'
import { useState } from "react";
import { LiaUserFriendsSolid } from "react-icons/lia";
function Section({massagenotif, setshowchatsection, showchatsection, setshowprofile, showprofile, setonlyChat}: any) {
    const SettingRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<HTMLDivElement>(null);
    const [showSettings, setshowSettings] = useState<boolean>(false);
    const [showRequest, setshowRequest] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isHovered2, setIsHovered2] = useState<boolean>(false);

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
        }
      };
return ( 
    <div className="section ">
            <div className="w-[100%] h-[100%] flex items-center justify-around">
                <button onClick={handleClickRequest}
                                style={
                                    showRequest ? {color: "#fff"} : {}
                                }
                >
                    <LiaUserFriendsSolid className="hovring w-[18px] h-[18px]"/>
                </button>
                <button onClick={() => {setshowprofile(!showprofile); setshowSettings(false);}} className="hidden 2xl:block xl:block">
                    <CgProfile className="hovring w-[18px] h-[18px]"/>
                </button>
                <button onClick={() => {setshowchatsection(!showchatsection); setonlyChat(false); setshowprofile(true); setshowSettings(false);}}>
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
            </div>
            {
                showRequest && <div ref={requestRef} className="w-[320px] h-[600px] absolute bg-[#261F30] top-[5%] right-[0.5%] z-[99] rounded-[6px] overflow-hidden
                phone:top-[7%] phone:w-[280px] phone:h-[570px]
                laptop:top-[7%]
                Large-phone:top-[7%]
                 flex items-end flex-col">
                    <div className="w-[100%] h-[13%] flex items-center justify-around">
                        <div className="w-[32%] h-[50%] bg-white rounded-[2px] flex items-center justify-center cursor-pointer transition-all duration-500 hover:border-[#fff] hover:border-[1.3px] hover:bg-[#ffffff00]"
                        onMouseEnter={handleMouseEnter1}
                        onMouseLeave={handleMouseLeave1}
                        >
                                <h1 className="text-[8px] font-sora font-semibold transition-all duration-500"
                                style={
                                    {
                                        color: isHovered ? "#fff" : "#000"
                                    }
                                }
                                >REQUESTS</h1>
                        </div>
                        <div className="w-[32%] h-[50%] border-[#ED5253] border-[2px] flex items-center justify-center rounded-[1.3px] transition-all duration-500 cursor-pointer hover:bg-[#ED5253] hover:border-none"
                        onMouseEnter={handleMouseEnter2}
                        onMouseLeave={handleMouseLeave2}
                        >
                                <h1 className="text-[8px] font-sora font-semibold transition-all duration-500   "
                                style={
                                    {
                                        color: isHovered2 ? "#fff" : "#ED5253"
                                    }
                                }
                                >BLOCK-LIST</h1>
                        </div>
                    </div>
                    <div className="w-[100%] relative h-[87%]  overflow-y-auto">
                        <div className="w-[100%] h-[16%] flex items-center justify-center">
                                <div className="w-[27%] h-[100%] flex items-center justify-center">
                                    <img src="mbjaghou.jpeg" alt=""  className="w-[52px] h-[52px] rounded-full"/>
                                </div>
                                <div className="w-[73%] h-[100%]">
                                        <div className="w-[100%] h-[50%]  flex flex-col justify-end items-start">
                                                <h1 className="text-[#fff] text-[10px]">Youssef Achehboun</h1>
                                                <h1 className="text-[7px] text-[#969696]">@yachehbo</h1>
                                        </div>
                                        <div className="w-[100%] h-[50%]  flex items-center justify-end">
                                            <div className="w-[78%] h-[100%] flex items-center justify-between">
                                                    <div className="w-[45%] h-[82%] bg-[#2AA656] rounded-[4px]">

                                                    </div>
                                                    <div className="w-[45%] h-[82%] bg-[#ED5253] rounded-[4px]">

</div>
                                            </div>
                                        </div>
                                </div> 
                        </div>
                    </div>
                </div>
            }
            {
                showSettings && <div ref={SettingRef} className="w-[320px] h-[300px] absolute bg-[#261F30] top-[5%] right-[0.5%] z-[99] rounded-[6px] overflow-y-auto
                phone:top-[7%] phone:w-[280px] phone:h-[270px]
                laptop:top-[7%]
                Large-phone:top-[7%]
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