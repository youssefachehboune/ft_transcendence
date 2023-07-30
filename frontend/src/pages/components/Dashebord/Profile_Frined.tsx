import { useEffect, useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import { BsChevronDown, BsClock, BsPatchCheckFill, BsPeople, BsPersonCheckFill, BsPersonFillSlash, BsPersonFillX } from "react-icons/bs";
import { FaBolt, FaChartBar, FaChartPie } from "react-icons/fa";
import { IoArrowBackCircle, IoLocationOutline } from "react-icons/io5";
import {ImBlocked} from 'react-icons/im'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { RxCross2 } from "react-icons/rx";

function Profile_Frined({setFriendClicked, setclickFriend, setvisible, Profile, profileloding, setblock, block, setshowchatsection, setonlyChat}: any) {

    return (
                    <div className="w-[60%] h-[100%] rounded-[10px] xl:w-[95%] 2xl:w-[95%] flex flex-col overflow-y-auto overflow-x-hidden test5 relative">
                        <div className="w-[100%] min-h-[320px] flex flex-col items-end overflow-hidden">
                                    <div className="w-[100%] h-[50%] test5">
                                        <button onClick={() => {setvisible(false); setclickFriend(false); setFriendClicked((prev: any) => prev == null)}} className="absolute right-0">
                                            <RxCross2 color="white"  className="w-[30px] h-[30px]"/>
                                        </button>
                                    </div>
                                    <div className="w-[100%] h-[50%] mt-[-30px] flex items-center mr-[-20px] self-end">
                                            <SkeletonCircle size={'144px'} mr={'30px'} mt={'-60px'} isLoaded={profileloding}>
                                                <img src={Profile?.avatar} alt="" className="w-[144px] rounded-full select-none "/>
                                            </SkeletonCircle>
                                        <div>
                                            <SkeletonText isLoaded={profileloding}>
                                                <h1 className="text-white font-[700] font-sora text-[20px] flex items-center">{Profile?.full_name}<span className="ml-[5px]"><BsPatchCheckFill color="#2CBDE6"/></span></h1>
                                                <h1 className="text-white font-[400] font-sora text-[15px]">{"@" + Profile?.username}</h1>
                                            </SkeletonText>
                                        </div>
                                    </div>
                                    <div className="w-[70%] h-[30%] flex gap-[10px] items-center justify-center mt-[-50px]">
                                            <Skeleton isLoaded={profileloding}>
                                                <button className="w-[88px] h-[24px] test5 rounded-[4px] hover:bg-[#00DAEA]"><h1 className="text-white font-sora text-[11px] font-400 flex items-center ml-[15px]"><span className="mr-[5px]"><BsPersonCheckFill/></span>Friends</h1></button>
                                            </Skeleton>
                                            <Skeleton isLoaded={profileloding}>
                                                <button onClick={() => {setshowchatsection(true); setonlyChat(false)}} className="w-[88px] h-[24px] test5 text-white rounded-[4px] font-sora text-[11px] font-400 hover:bg-[#00DAEA]"><h1 className="text-white font-sora text-[11px] font-400 flex items-center ml-[10px]"><span className="mr-[5px]"><AiFillMessage/></span>message</h1></button>
                                            </Skeleton>
                                            <Skeleton isLoaded={profileloding}>
                                                <button onClick={() => setblock(!block)} className="w-[30px] h-[24px] rounded-[4px] test5 flex justify-center items-center text-white"><BsChevronDown/></button>
                                            </Skeleton>
                                                {!block &&
                                                        <div className="w-[110px] h-[60px]  absolute ml-[120px] mt-[90px] flex flex-col">
                                                            <button onClick={() => {
                                                                setvisible(false);
                                                                fetch('http://localhost:3000/friends/BLOCK/' + Profile.username, { credentials: "include", method: "POST"})
                                                            }} className="w-[100%] h-[50%] test5 rounded-t-[5px] hover:bg-red-600">
                                                                <h1 className="flex ml-[5px] items-center text-[white] text-[10px] font-sora font-500 "><span className="mr-[5px] text-[15px]"><BsPersonFillSlash/></span>Block</h1>
                                                            </button>
                                                            <button onClick={() => {
                                                                setvisible(false);
                                                                fetch('http://localhost:3000/friends/UNFRIEND/' + Profile.username, { credentials: "include", method: "POST"})
                                                            }} className="w-[100%] h-[50%]  test5 rounded-b-[5px] hover:bg-red-600">
                                                                <h1 className="flex ml-[5px] items-center text-[white] text-[10px] font-sora font-500 "><span className="mr-[5px] text-[15px]"><BsPersonFillX/></span>Remove friend</h1>
                                                            </button>
                                                        </div>
                                                }
                                    </div>

                        </div>
                        <div className="w-[80%] min-h-[180px] overflow-hidden">
                            <SkeletonText isLoaded={profileloding}>
                                <h1 className="font-sora font-[700] text-[15px] p-[10px] text-white">Bio</h1>
                                <p className="font-sora font-[300] text-[13px] p-[10px] text-white">{Profile?.info.bio}</p>
                            </SkeletonText>
                        </div>
                        <div className="w-[95%] min-h-[220px] flex relative ">
                                <div className="w-[2px] h-[150px] top-[5%] left-[53%] test5 absolute"></div>
                                <div className="w-[60%] h-[100%]">
                                            <SkeletonText width={'80%'} isLoaded={profileloding}>
                                            </SkeletonText>
                                            {profileloding && 
                                            <div className="w-[100%] h-[70%] flex flex-col justify-around ml-[10px]">
                                                <h1 className="text-[white] text-[15px] font-sora font-[700] ml-[5px] mt-[-10px]">info</h1>
                                                <h1 className="text-[12px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><IoLocationOutline  className="w-[17px] h-[17px]"/></span>{Profile?.info.location}</h1>
                                                <h1 className="text-[12px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><BsPeople className="w-[17px] h-[17px]"/></span>{Profile?.info.count_friends} Friends</h1>
                                                <h1 className="text-[12px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><BsClock className="w-[17px] h-[17px]"/></span>{Profile?.info.member_since}</h1>
                                                <h1 className="text-[12px] text-[white] font-sora font-[400] flex items-center ml-[5px]"><span className="mr-[5px]"><img src="g3.svg" className="w-[17px] h-[17px]"/></span>{Profile?.info.email}</h1>

                                            </div>
                                            }
                                </div>
                                <div className="w-[40%] h-[100%]">
                                                <div className="w-[100%] h-[100%] flex flex-col items-center  ml-[20px]">
                                                        <Skeleton isLoaded={profileloding}  alignSelf={'flex-start'}>
                                                            <h1 className="text-[white] text-[15px] font-sora  font-[700]">Statistics</h1>
                                                        </Skeleton>
                                                            <div className="w-[100%] h-[56px] flex items-center gap-4">
                                                                <SkeletonCircle isLoaded={profileloding} className="test11 w-[32px] h-[32px] rounded-full flex flex-col justify-center items-center">
                                                                    <img src="hhhhhhhh.svg" alt="" />
                                                                </SkeletonCircle>
                                                                <SkeletonText isLoaded={profileloding}>
                                                                    <h1 className="text-[white] text-[13px] font-sora font-[400]">Global Rank<p className="text-[8px] font-sora font-[700]">Among the top {Profile?.statistics.Global_rank}</p></h1>
                                                                </SkeletonText>
                                                            </div>
                                                        <div className="w-[100%] h-[56px] flex items-center gap-4">

                                                            <SkeletonCircle isLoaded={profileloding} className="test2 w-[32px] h-[32px] rounded-full flex flex-col justify-center items-center"><FaChartBar color="#FFE500"/></SkeletonCircle>
                                                            <SkeletonText isLoaded={profileloding}>
                                                                <h1 className="text-[white] text-[13px] font-sora font-[400]">Level Progress<span className="text-[8px] font-sora font-[700] flex items-center">{Profile?.statistics.level}<div className="w-[48px] h-[4px] ml-[5px] bg-[#FFE500] rounded-[2px]"></div></span></h1>
                                                            </SkeletonText>
                                                        </div>
                                                        <div className="w-[100%] h-[56px] flex items-center gap-4 ">
                                                            <SkeletonCircle isLoaded={profileloding} className="test3 w-[32px] h-[32px] rounded-full flex flex-col justify-center items-center"><FaChartPie color="#43C7FF"/></SkeletonCircle >
                                                            <SkeletonText isLoaded={profileloding}>
                                                                <h1 className="text-[white] text-[13px] font-sora font-[400]">Total Statistics<p className="text-[8px] font-sora font-[700]">{"Won " +  Profile?.statistics.total_statistics.won +  "| Lost " + Profile?.statistics.total_statistics.lost }</p></h1>
                                                            </SkeletonText>
                                                        </div>
                                                        <div className="w-[100%] h-[56px] flex items-center gap-4 ">
                                                            <SkeletonCircle isLoaded={profileloding} className="test4 w-[32px] h-[32px] rounded-full flex flex-col justify-center items-center"><FaBolt color="#05FF00"/></SkeletonCircle>
                                                            <SkeletonText isLoaded={profileloding}>
                                                                <h1 className="text-[white] text-[13px] font-sora font-[400]">Win Streak<p className="text-[8px] font-sora font-[700]">{Profile?.statistics.win_streak + " Matches"}</p></h1>
                                                            </SkeletonText>
                                                        </div>
                                                </div>
                                </div>
                        </div>
                            <Skeleton width={'150px'} height={'50px'} ml={'10px'} isLoaded={profileloding}>
                                <h1 className="text-[white] font-sora text-[15px] p-5">Last History</h1>
                            </Skeleton>
                            { !profileloding &&
                                <Skeleton mt={'10px'} isLoaded={profileloding}>
                                    <div className="w-[100%] min-h-[150px] text-white flex overflow-hidden">
                                    </div>
                                </Skeleton>

                            }
                            <div className="w-[100%] min-h-auto test5 rounded-[20px] flex flex-col justify-center gap-[5px]">
                                    {
                                        profileloding && Profile?.Last_matches?.map((user: any, key: any) => (
                                        <div key={key} className="w-[100%] min-h-[65px] text-white flex overflow-hidden">
                                            <div className="w-[33.5%] flex items-center justify-end ">
                                                <img src={user.User.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                                                <div className="w-[100px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                                                    <h1 className="text-[7px] font-sora font-[600] text-[white] ">{user.User.firstName + " " + user.User.lastName}</h1>
                                                    <h1 className="text-[7px] font-sora font-[400] text-[#969696] ">{"@" + user.User.username}</h1>
                                                </div>
                                            </div>
                                            <div className="w-[33.5%] flex flex-col items-center justify-center">
                                                <h1 className="text-[22px] font-sora font-[400] text-[white]">{user.userPoints + " : " + user.opponentPoints}</h1>
                                                <h1 className="text-[9px] font-sora font-[400] text-[#B3B3B3]">{user.occuredAt}</h1>
                                            </div>
                                            <div className="w-[33.5%] flex items-center justify-start">
                                                <img src={user.Opponent.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                                                <div className="w-[100px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                                                    <h1 className="text-[7px] font-sora font-[600] text-[white] ">{user.Opponent.firstName + " " + user.Opponent.lastName}</h1>
                                                    <h1 className="text-[7px] font-sora font-[400] text-[#969696] ">{"@" + user.Opponent.username}</h1>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                            </div>
                 </div>
     );
}

export default Profile_Frined;