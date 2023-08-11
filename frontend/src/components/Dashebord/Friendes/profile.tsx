import {FaBolt, FaChartBar, FaChartPie, FaPen} from 'react-icons/fa'
import { BsClock, BsPatchCheckFill, BsPeople } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Skeleton, SkeletonCircle, SkeletonText, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react';
import Edite_profile from '../Edite_profile/Edite_profile';
import { useClickAway } from 'react-use';
import Image from "next/image";

interface Profile
{
    data: any;
    dataisloded: boolean;
    showprofile: boolean;
    ListFriends: any;
    setdata: any;
    setshowprofile: any;
}
function Profile({setdata, ListFriends, data, dataisloded, showprofile, setshowprofile} : Profile) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [username, setusername] = useState<string>("")
    const [Errorusername, setErrorusername] = useState<string>("")
    const [Bio, setBio] = useState<string>('')
    const [ErrorBio, setErrorBio] = useState<string>("")
    const [location, setlocation] = useState<string>('')
    const [avatar, setavatar] = useState<string>('')
    const [Erroravatar, setErroravatar] = useState<string>("")
    const profileRef = useRef<HTMLInputElement | null>(null)
    const onopen = () => 
    {
        setusername(data.username)
        setBio(data.info?.bio)
        setlocation(data.info?.location)
        setavatar(data.avatar)
        setErroravatar("")
        setErrorusername("")
        setErrorBio("")
        onOpen()
    }
    useClickAway(profileRef, () => {
        if (!showprofile) {
          setshowprofile(true);
        }
    });
    
    return (
            <div  className={`${showprofile ? "profile 2xl:hidden" : "absolute z-50 w-[350px] h-[72%] mt-[50px] mr-[15%] xl:mr-0 right-0"}`}>
                    <div ref={showprofile ? null : profileRef} className="w-[100%] h-[85%] 2xl:h-[100%] xl:h-[100%] bg-[#070012] 2xl:rounded-[15px] mt-[20%] 2xl:mt-[0%] xl:mt-[0%] xl:rounded-[15px]  flex flex-col items-center overflow-y-auto overflow-x-hidden">
                        <div className="w-[143px] h-[143px]">
                            <SkeletonCircle size='143' isLoaded={dataisloded}>
                                <Image width={'143'} height={'143'} src={data?.avatar} alt="" className="w-[143px] h-[143px] rounded-full border-indigo-400 border-[2px] select-none"/>
                            </SkeletonCircle>
                        </div>
                            <SkeletonText skeletonHeight='2' isLoaded={dataisloded} width={'90%'}  className='flex flex-col items-center h-[70px] mt-[10px]'>
                                    <h1 className="mt-[10px] text-[white] font-sora font-[700] text-[16px] flex items-center">{data?.full_name}<span className="ml-[5px]"><BsPatchCheckFill color="#2CBDE6"/></span></h1>
                                    <h1 className="text-[white] font-sora font-[400] text-[12px] text-center">{"@" + data?.username}</h1>
                            </SkeletonText>
                            <div className="w-[70%] h-[30px] flex flex-row justify-end items-center mt-[10px]">
                                <Skeleton isLoaded={dataisloded}>
                                    <button onClick={onopen} className="w-[88px] h-[24px] rounded-[4px] bg-[#414243] hover:bg-[#00DAEA]">
                                        <h1 className="text-[white] text-[8px] flex items-center ml-[10px]"><span className="mr-[5px]"><FaPen/></span>Edite profile</h1>
                                    </button>
                                </Skeleton>
                            </div>
                            <div className="w-[100%] h-[100px] flex flex-col justify-around ml-[50px]">
                                <SkeletonText isLoaded={dataisloded} width='70%'>
                                        <h1 className="text-[10px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><IoLocationOutline/></span>{data?.info?.location}</h1>
                                        <h1 className="text-[10px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><BsPeople/></span>{ListFriends?.length} Friends</h1>
                                        <h1 className="text-[10px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><BsClock/></span>{data?.info?.member_since}</h1>
                                        <h1 className="text-[10px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><Image width={'10'} height={'10'} src="/g3.svg" className="w-[10px] h-[10px]" alt={''}/></span>{data?.info?.email}</h1>
                                </SkeletonText>
                            </div>
                        <div className="w-[85%] h-[113px] mt-[30px]  flex flex-col items-start break-words">
                            <Skeleton isLoaded={dataisloded}>
                                <h1 className="text-[white] text-[13px] font-sora font-[700]">BIO</h1>
                            </Skeleton>
                            <SkeletonText isLoaded={dataisloded} width='85%'>
                                <p className="text-[10px] text-[white] font-sora font-[400] mt-[10px] w-[100%] h-[100%]">
                                    {data?.info?.bio}
                                </p>
                            </SkeletonText>
                        </div>
                        <div className="w-[85%] h-[300px] mt-[70px] flex flex-col items-start ">
                                    <Skeleton isLoaded={dataisloded}>
                                        <h1 className="text-[white] text-[13px] font-sora font-[700]">Statistics</h1>
                                    </Skeleton>
                                    <div className="w-[100%] h-[100%] flex flex-col items-center justify-evenly ml-[20px]">
                                            <div className="w-[100%] h-[56px] flex items-center gap-4 ">
                                                <SkeletonCircle isLoaded={dataisloded} className='flex flex-col justify-center items-center test11'>
                                                    <Image width={'20'} height={'20'} src="/hhhhhhhh.svg" alt="" />
                                                </SkeletonCircle>
                                                <SkeletonText isLoaded={dataisloded}>
                                                    <h1 className="text-[white] text-[13px] font-sora font-[400]">Global Rank<p className="text-[8px] font-sora font-[700]">Among the top {data?.statistics?.Global_rank}</p></h1>
                                                </SkeletonText>
                                            </div>

                                            <div className="w-[100%] h-[56px] flex items-center gap-4 ">
                                                <SkeletonCircle isLoaded={dataisloded} className="test2 w-[32px] h-[32px] rounded-full flex flex-col justify-center items-center">
                                                    <FaChartBar color="#FFE500"/>
                                                </SkeletonCircle>
                                                <SkeletonText isLoaded={dataisloded}>
                                                        <h1 className="text-[white] text-[13px] font-sora font-[400]">Level Progress</h1>
                                                    <div className='w-[100%] flex items-center'>
                                                        <span className="text-[8px] text-[white] font-sora font-[700]">{data?.statistics?.level}</span>
                                                        {dataisloded && <div className="h-[4px] ml-[5px] bg-[#FFE500] rounded-[2px]" style={{ width: Math.round((data?.statistics?.level % 1) * 100) === 0 ? '0%' : (data?.statistics?.level % 1) * 100 + '%'}}></div>}
                                                    </div>
                                                </SkeletonText>
                                            </div>
                                            <div className="w-[100%] h-[56px] flex items-center gap-4 ">
                                                <SkeletonCircle className='test3 w-[32px] h-[32px] bg-orange rounded-full flex flex-col justify-center items-center' isLoaded={dataisloded}>
                                                    <FaChartPie color="#43C7FF"/>
                                                </SkeletonCircle>
                                                <SkeletonText isLoaded={dataisloded}>
                                                    <h1 className="text-[white] text-[13px] font-sora font-[400]">Total Statistics<p className="text-[8px] font-sora font-[700]">{"Won " +  data?.statistics?.total_statistics.won +  "| Lost " + data?.statistics?.total_statistics.lost }</p></h1>
                                                </SkeletonText>
                                            </div>
                                            <div className="w-[100%] h-[56px] flex items-center gap-4 ">
                                                <SkeletonCircle className='test4 w-[32px] h-[32px] bg-orange rounded-full flex flex-col justify-center items-center' isLoaded={dataisloded}>
                                                    <FaBolt color="#05FF00"/>
                                                </SkeletonCircle>
                                                <SkeletonText isLoaded={dataisloded}>
                                                    <h1 className="text-[white] text-[13px] font-sora font-[400]">Win Streak<p className="text-[8px] font-sora font-[700]">{data?.statistics?.win_streak + " Matches"}</p></h1>
                                                </SkeletonText>
                                        </div>
                                    </div>
                        </div>
                    </div>
                    <Edite_profile setdata={setdata} Erroravatar={Erroravatar} setErroravatar={setErroravatar} isOpen={isOpen} onOpen={onOpen} onClose={onClose} data={data} username={username} setusername={setusername} Errorusername={Errorusername} setErrorusername={setErrorusername} Bio={Bio}
                     setBio={setBio} ErrorBio={ErrorBio} setErrorBio={setErrorBio} location={location} setlocation={setlocation} avatar={avatar} setavatar={setavatar}/>
        </div>
    );
}

export default Profile;