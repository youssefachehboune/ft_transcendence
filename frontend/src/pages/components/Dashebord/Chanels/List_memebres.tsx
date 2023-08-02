import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Menu, MenuButton, MenuItem, MenuList, Skeleton, SkeletonCircle, SkeletonText, useDisclosure } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { VscSearch, VscSettingsGear } from "react-icons/vsc";
import { AiOutlineArrowLeft, AiOutlineMessage, AiTwotoneDelete } from "react-icons/ai";
import Memeber from "./memeber";
import Chat_chanel from "./Chat_chanel";
import {GrUpdate} from 'react-icons/gr'
import { BsPersonFillAdd } from "react-icons/bs";
import { HiOutlineBan } from "react-icons/hi";
import React from "react";
import Delete_chanel from "./delete_chanel";
import Parameteradmin from "./parameteradmin";
import List_of_invitation from "./List_of_invitation";
import List_of_Ban from "./List_of_Ban";
import Add_mumber from "./add_mumber";
import MutedList from "./MutedList";
import Update_chanel from "./Update_chanel/Update_chanel";
import RequestedList from "./RequestedList";

function List_memebres(props: any) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [searchfriend, setsearchfriend] = useState<string | undefined>("");
    const [back , setback] = useState<boolean>(true)

    const { isOpen: ismodel, onOpen: openmodule, onClose: closemodule } = useDisclosure()
    const { isOpen: isinvitation, onOpen: openlistinvitation, onClose: closelistinvitation } = useDisclosure()
    const { isOpen: isban, onOpen: openbanlist, onClose: closebanlist } = useDisclosure()
    const { isOpen: isaddmember, onOpen: openaddmember, onClose: closeaddmember } = useDisclosure()
    const { isOpen: ismuted, onOpen: openmuted, onClose: closemuted } = useDisclosure()
    const { isOpen: isupdate, onOpen: openupdate, onClose: closeupdate } = useDisclosure()
    const { isOpen: isrequested, onOpen: openrequested, onClose: closerequested } = useDisclosure()


    const [large_img, setlarge_img] = useState<string>('')
    const [avatarchanel, setavatarchanel] = useState<any>('')
    const [chanelname, setchanelname] = useState<string>("")
    const [Errornamechanel, setErrornamechanel] = useState<string>("")
    const [Errorpassword, setErrorpassword] = useState<string>("")
    const [ErrorDescriptionchanel, setErrorDescriptionchanel] = useState<string>("")
    const [ChannelDescription, setChannelDescription] = useState<string>("")
    const [password, setpassword] = useState<string>("")
    const [typechanel , settypechanel] = useState<any>("")
    const [Errortypechanel , setErrortypechanel] = useState<any>("")
    const [listfrined_for_add_mumber, setlistfrined_for_add_mumber] = useState<any>();

    const openupdtechanel = () => {
        setchanelname(props.chanel.name);
        setavatarchanel(props.chanel.avatar);
        setChannelDescription(props.chanel.descrption);
        settypechanel(props.chanel.type);
        openupdate();
    } 
    const onopenaddmumbers = () =>
    {
        setlistfrined_for_add_mumber(props.ListFriends)
        openaddmember();
    }

    const handelsearchChanges = () =>
    {
        setsearchfriend(inputRef.current?.value);
    }
    useEffect(() => {
        const handleResize = () => {
            if (!back)
                setback(window.innerWidth > 768);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, [back]);

    return ( 
            <div className="Chat flex items-end">
                <div className={`w-[40%] h-[100%] ${back ? "2xl:w-[40%] xl:w-0" : "2xl:w-[50%] xl:w-[95%]"} test5 ml-2`}>
                    <div className={`w-[100%] h-[100%] flex flex-col items-center overflow-y-auto rounded-[10px]`}>
                                        <button className="bg-[#070012] w-[100%] flex cursor-auto">
                                            <h1 onClick={() => props.setshowchanel(false)} className="text-white text-[32px] font-sora font-[600] flex items-center cursor-pointer"><AiOutlineArrowLeft/>HOME</h1>
                                        </button>
                                        <div className="w-[100%] h-auto flex flex-col items-center relative">
                                            <button onClick={() => setback(true)} className={`self-end absolute mt-[25px] mr-[20px] ${back ? "hidden" : ""} `}><AiOutlineMessage className="hovring w-[18px] h-[18px]"/></button>
                                            <Parameteradmin openrequested={openrequested} openupdate={openupdtechanel} openmuted={openmuted} openaddmember={onopenaddmumbers} data={props.data} memebers={props.memebers} back={back} onOpen={openmodule} openlistinvitation={openlistinvitation} openbanlist={openbanlist}/>
                                            <Delete_chanel setshowchanel={props.setshowchanel} chanel={props.chanel} isOpen={ismodel} onClose={closemodule}/>
                                            <List_of_invitation setListfriends={setlistfrined_for_add_mumber} setinvitationList={props.setinvitationList} chanel={props.chanel} invitationList={props.invitationList} isOpen={isinvitation} onClose={closelistinvitation}/>
                                            <List_of_Ban setmemebers={props.setmemebers} setbanList={props.setbanList} chanel={props.chanel} banList={props.banList} isOpen={isban} onClose={closebanlist}/>
                                            <Add_mumber setinvitationList={props.setinvitationList} chanel={props.chanel} memebers={props.memebers} setListfriends={setlistfrined_for_add_mumber} ListFriends={listfrined_for_add_mumber} isOpen={isaddmember} onClose={closeaddmember}/>
                                            <MutedList setmemebers={props.setmemebers} setmutedList={props.setmutedList} chanel={props.chanel} mutedList={props.mutedList} MutedList={props.MutedList} isOpen={ismuted} onClose={closemuted}/>
                                            <Update_chanel
                                            setchanel={props.setchanel}
                                            large_img={large_img}
                                            setlarge_img={setlarge_img}
                                            avatarchanel={avatarchanel}
                                            setavatarchanel={setavatarchanel}
                                            chanelname={chanelname}
                                            setchanelname={setchanelname}
                                            Errornamechanel={Errornamechanel}
                                            setErrornamechanel={setErrornamechanel}
                                            Errorpassword={Errorpassword}
                                            setErrorpassword={setErrorpassword}
                                            ErrorDescriptionchanel={ErrorDescriptionchanel}
                                            setErrorDescriptionchanel={setErrorDescriptionchanel}
                                            ChannelDescription={ChannelDescription}
                                            setChannelDescription={setChannelDescription}
                                            password={password}
                                            setpassword={setpassword}
                                            typechanel={typechanel}
                                            settypechanel={settypechanel}
                                            Errortypechanel={Errortypechanel}
                                            setErrortypechanel={setErrortypechanel}
                                            chanel={props.chanel} isOpen={isupdate} onClose={closeupdate}/>
                                            <RequestedList setmemebers={props.setmemebers} setrequestList={props.setrequestList} requestList={props.requestList} chanel={props.chanel} isOpen={isrequested} onClose={closerequested}/>
                                            <div className={`test5 w-[50%] h-[28px] flex justify-center items-center rounded-[15px] mt-[20px]`}>
                                                <div className="mr-[-5px]">
                                                    <VscSearch className="w-[12px] h-[12px]" color="white" />
                                                </div>
                                                <input
                                                    ref={inputRef}
                                                    onChange={handelsearchChanges}
                                                    type="text"
                                                    placeholder="Search for mumber"
                                                    className="text-white text-[8px] font-sora font-[300] flex items-center bg-transparent  border-none outline-none pl-[20px] w-[70%]"
                                                    />
                                            </div>
                                            <div className="w-[100%] h-[30px] mt-[20px] flex justify-center items-center">
                                                    <Skeleton isLoaded={props.mumeberschannelloding}>
                                                        <h1 className="font-[700] font-sora text-[11px] text-white">{`${props.memebers?.length} member`}</h1>
                                                    </Skeleton>
                                            </div>
                                        </div>
                                            <div className="w-[100%] h-[100%] gap-[10px] flex flex-col overflow-hidden">
                                                {
                                                    !props.mumeberschannelloding &&
                                                            Array.from(Array(8)).map((i) => (
                                                            <div key={i} className="w-[100%] h-[70px] ml-[15%] flex items-center overflow-hidden">
                                                                            <SkeletonCircle size={'54px'} ></SkeletonCircle>
                                                                            <SkeletonText width={'40'} ml={'10px'}></SkeletonText>
                                                            </div>))
                                                }
                                                {
                                                    props.mumeberschannelloding && props.memebers?.map((user: any, index: number) => (
                                                            <Memeber setmutedList={props.setmutedList} setbanList={props.setbanList} setmemebers={props.setmemebers} chanel={props.chanel} typememeber={props.typememeber} user={user} index={index}/>
                                                    ))
                                                }
                                            </div>
                    </div>
                </div>
                {props.channelloding && back &&
                    <div className="w-[60%] 2xl:w-[57%] xl:w-[95%] h-[100%] test5  ml-[10px] xl:ml-0 rounded-t-[10px] overflow-hidden relative">
                        <div className="h-[50px] bg-[#070012]"></div>
                        <div className="w-[100%] h-auto test5">
                            <div className="w-[65%] 2xl:w-[70%] xl:w-[75%] min-h-[84px] flex justify-center">
                                    <div className="w-[20%] h-[84px] flex items-center justify-end">
                                        <SkeletonCircle size={'54px'}></SkeletonCircle>
                                    </div>
                                    <div className="w-[70%] h-[84px] flex flex-col justify-center ml-[5px]">
                                        <SkeletonText></SkeletonText>
                                    </div>
                            </div>
                        </div>
                        <div className={`w-[100%]  h-[100px] pl-7  mb-[15px]  flex  items-center relative`}>
                            <SkeletonCircle width={'54px'} height={'54px'}></SkeletonCircle>
                            <div className="w-[400px] 2xl:w-[200px] xl:w-[180px] p-2 ml-[20px]">
                                <SkeletonText maxWidth={'150px'}></SkeletonText>
                            </div>
                        </div>
                        <div className={`w-[100%] float-right h-[100px] p-7 pt-5 mb-[15px] flex flex-row-reverse items-center relative`}>
                                <SkeletonCircle width={'54px'} height={'54px'}></SkeletonCircle>
                                <div className="w-[20%] xl:w-[40%] 2xl:w-[30%] h-[84px] flex flex-col-reverse items-end justify-center mr-[15px]">
                                        <SkeletonText width={'full'}></SkeletonText>
                                </div>
                        </div>
                    </div>
                }
                {back && !props.channelloding && <Chat_chanel back={setback} data={props.data} chanel={props.chanel}/>}
            </div> 
    );
}

export default List_memebres;