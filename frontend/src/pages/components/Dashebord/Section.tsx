import { Dispatch, SetStateAction } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { BsGlobe, BsXLg } from "react-icons/bs";
import { VscBell, VscSettingsGear } from 'react-icons/vsc'
import {CgProfile} from 'react-icons/cg'
import { useState } from "react";
import { LiaUserFriendsSolid } from "react-icons/lia";
import {FaSearch} from 'react-icons/fa'
function Section({setmenu, menu, massagenotif, setshowchatsection, showchatsection, setshowprofile, showprofile, setonlyChat}: any) {
    const [showSettings, setshowSettings] = useState<boolean>(false);
    function handleClickSettings() {
        setshowprofile(true)
        setshowSettings(!showSettings);
    }
return ( 
    <div className={"section"}>
        {
            !menu ? (
                <div className="w-[100%] h-[100%] flex items-center justify-around">
                    <button>
                        <LiaUserFriendsSolid className="hovring w-[18px] h-[18px]"/>
                    </button>
                    <button onClick={() => {setshowprofile(!showprofile); setshowSettings(false);}} className="hidden 2xl:block xl:block">
                        <CgProfile className="hovring w-[18px] h-[18px]"/>
                    </button>
                    <button className="hidden xl:block 2xl:block" onClick={() => {setshowchatsection(!showchatsection); setonlyChat(false); setshowprofile(true); setshowSettings(false);}}>
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
                showSettings && <div className="w-[320px] h-[300px] absolute bg-[#261F30] top-[5%] right-[0.5%] z-[99] rounded-[6px] overflow-y-auto
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