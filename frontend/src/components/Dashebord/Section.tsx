import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { BsGlobe, BsXLg } from "react-icons/bs";
import { VscBell, VscSettingsGear } from 'react-icons/vsc'
import { CgProfile } from 'react-icons/cg'
import { useState } from "react";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { FaSearch } from 'react-icons/fa'
import FriendRequest from "./FriendRequest";
import Blocked from "./Blocked";
import Link from "next/link";
import { useRouter } from "next/router";
import ChannelInvite from "./ChannelInvite";
function Section({setmychanel, setListFriends, setmenu, menu, massagenotif, setshowprofile, showprofile}: any) {
    const SettingRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<HTMLDivElement>(null);
    const [showSettings, setshowSettings] = useState<boolean>(false);
    const [showRequest, setshowRequest] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [requestdata, setrequestdata] = useState<any>([]);
    const [blockeddata, setblockeddata] = useState<any>([]);
    const [isHovered2, setIsHovered2] = useState<boolean>(false);
    const [isHovered3, setIsHovered3] = useState<boolean>(false);
    const [showChannelInvite, setshowChannelInvite] = useState<boolean>(false);
    const [showdataRequest, setshowdataRequest] = useState<boolean>(true);
    const [check2fa, setcheck2fa] = useState<boolean>(false);
    const [checkDisable2fa, setcheckDisable2fa] = useState<boolean>(false);
    const [channeldata, setchanneldata] = useState<any>([]);
    const router = useRouter()


    useEffect(() => {
        const fetchData = async () => {
            const resc = await fetch("http://localhost:3000/2fa/status", { credentials: "include" });
            const datac = await resc.json();
            setcheck2fa(datac);
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const resb = await fetch("http://localhost:3000/friends/status/BLOCKED", { credentials: "include" });
            const datab = await resb.json();
            setblockeddata(datab);
            const res = await fetch("http://localhost:3000/friends/status/REQUESTED", { credentials: "include" });
            const data = await res.json();
            setrequestdata(data);
            const resa = await fetch("http://localhost:3000/channel/invitations", { credentials: "include" });
            const dataa = await resa.json();
            setchanneldata(dataa);
        }
        if (showRequest) {
            fetchData();
        }
    }, [showRequest, showChannelInvite, showdataRequest])
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
    function handleMouseEnter3() {
        setIsHovered3(true);
    }
    function handleMouseLeave3() {
        setIsHovered3(false);
    }
    function handleClickRequest() {
        setshowprofile(true)
        setshowRequest(!showRequest);
    }
    function handleClickSettings() {
        setshowprofile(true)
        setshowSettings(!showSettings);
    }

    function changeStatus2fa() {
        if (check2fa) {
            const fetchData = async () => {
                const resb = await fetch("http://localhost:3000/2fa", { credentials: "include", method: "DELETE" });
                const datab = await resb.json();
                setcheck2fa(false);
                setcheckDisable2fa(datab);
            }
            fetchData();
        }
        if (!check2fa) {
            console.log("go to auth");
            router.push("/auth");
        }
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
                    <button className="hidden xl:block 2xl:block" onClick={() => {router.push('/Chat');}}>
                    <AiOutlineMessage color={massagenotif ? "red" : ""} className="hovring w-[18px] h-[18px]"/>
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

                ) : (
                    <div className="w-[100%] h-[100%] flex items-center justify-end ml-[-20px]">

                        <button onClick={() => setmenu(!menu)} className="hidden xl:block">
                            <FaSearch className="hovring w-[18px] h-[18px]" />
                        </button>
                    </div>
                )
            }
            {
                showRequest && <div ref={requestRef} className="w-[320px] h-[600px] absolute bg-[#261F30]  overflow-hidden right-[100px] xl:right-0 z-50 rounded-b-[6px]
                phone:w-[280px] phone:h-[570px]
                 flex items-end flex-col">
                    <div className="w-[100%] h-[13%] flex items-center justify-around">
                        <div className="w-[27%] h-[45%] bg-white rounded-[2px] flex items-center justify-center cursor-pointer transition-all duration-500 hover:border-[#fff] hover:border-[1.3px] hover:bg-[#ffffff00]"
                            onMouseEnter={handleMouseEnter1}
                            onMouseLeave={handleMouseLeave1}
                            onClick={() => { setshowdataRequest(true); setshowChannelInvite(false) }}
                        >
                            <h1 className="text-[8px] font-sora font-semibold transition-all duration-500"
                                style={
                                    {
                                        color: isHovered ? "#fff" : "#000"
                                    }
                                }
                            >REQUESTS</h1>
                        </div>
                        <div className="w-[27%] h-[45%] bg-white rounded-[2px] flex items-center justify-center cursor-pointer transition-all duration-500 hover:border-[#fff] hover:border-[1.3px] hover:bg-[#ffffff00]"
                            onMouseEnter={handleMouseEnter3}
                            onMouseLeave={handleMouseLeave3}
                            onClick={() => { setshowdataRequest(false); setshowChannelInvite(true) }}
                        >
                            <h1 className="text-[8px] font-sora font-semibold transition-all duration-500"
                                style={
                                    {
                                        color: isHovered3 ? "#fff" : "#000"
                                    }
                                }
                            >CHANNEL INVITE</h1>
                        </div>
                        <div className="w-[27%] h-[45%] bg-white rounded-[2px] flex items-center justify-center cursor-pointer transition-all duration-500 hover:border-[#fff] hover:border-[1.3px] hover:bg-[#ffffff00]"
                            onMouseEnter={handleMouseEnter2}
                            onMouseLeave={handleMouseLeave2}
                            onClick={() => { setshowdataRequest(false); setshowChannelInvite(false) }}
                        >
                            <h1 className="text-[8px] font-sora font-semibold transition-all duration-500"
                                style={
                                    {
                                        color: isHovered2 ? "#fff" : "#000"
                                    }
                                }
                            >BLOCK-LIST</h1>
                        </div>
                    </div>
                    <div className="w-[100%] relative h-[87%]  flex flex-col justify-start items-center overflow-y-auto">
                        {

                            (showdataRequest  && !showChannelInvite) ?
                            requestdata.map((item: any, key : number) => {
                                return (
                                    <FriendRequest user={item} setListFriends={setListFriends} key={key} username={item.username} image={item.avatar} name={item.firstName + ' ' + item.lastName}/>
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
                            requestdata.length === 0 && showdataRequest && !showChannelInvite && < h1 className="text-[14px] text-white font-sora font-semibold mt-6">No Request</h1>
                        }
                        {
                            blockeddata.length === 0 && !showdataRequest && !showChannelInvite && < h1 className="text-[14px] text-white font-sora font-semibold mt-6">No Blocked</h1>
                        }
                        {
                            channeldata && showChannelInvite && channeldata.map((item: any, key : number) => {
                                return (
                                    <ChannelInvite setmychanel={setmychanel} chanel={item} key={key} name={item.name} image={item.avatar}/>
                                )
                            }
                            )
                        }
                        {
                            channeldata.length === 0 && showChannelInvite && < h1 className="text-[14px] text-white font-sora font-semibold mt-6">No Channel Invite</h1>
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
                            <BsXLg color="white" className=" w-[11px] h-[11px]" />
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
                            "
                                onClick={changeStatus2fa}
                            >
                                {
                                    check2fa ? "Disable two-factor" : "Enable two-factor"
                                }
                            </button>
                            <button className="bg-[#5a84ed00] rounded-[4px] box-border	 border-[#ffffff00] border-[1px] w-[45%] h-[70%] text-[#ffffff00] text-[10px] font-bold leading-normal cursor-auto
                            phone:text-[9px]
                            ">
                                R
                            </button>
                        </div>
                        <h1 className="font-sora text-[11px] font-semibold leading-normal text-[#fff] mt-2">Github</h1>
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
                                Github
                            </button>
                            <button className="bg-[#ffffff00] rounded-[4px] box-border	 border-[#ffffff00] border-[1px] w-[45%] h-[70%] text-[#00000000] text-[10px] font-bold leading-normal cursor-auto
                            phone:text-[9px]
                            transition duration-700 ease-in-out
                            ">
                                G
                            </button>
                        </div>
                        <div className="mt-3 w-[80%] h-[60%] flex items-center justify-between">
                            <Link href={"http://localhost:3000/logout"} className="bg-[#fff0] rounded-[4px] w-[40%] h-[70%] text-[#C30202] text-[11px] font-bold leading-normal flex items-center justify-center
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
                            </Link>
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