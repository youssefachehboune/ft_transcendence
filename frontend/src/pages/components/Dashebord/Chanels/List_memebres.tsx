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

function List_memebres(props: any) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [searchfriend, setsearchfriend] = useState<string | undefined>("");
    const [back , setback] = useState<boolean>(true)

    const { isOpen, onOpen, onClose } = useDisclosure()
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
                                        <div className="w-[100%] h-auto flex flex-col items-center">
                                            <button onClick={() => setback(true)} className={`self-end absolute mt-[25px] mr-[20px] ${back ? "hidden" : ""} `}><AiOutlineMessage className="hovring w-[18px] h-[18px]"/></button>
                                            <Parameteradmin back={back} onOpen={onOpen}/>
                                            <Delete_chanel isOpen={isOpen} onClose={onClose}/>
                                            <div className={`test5 w-[50%] h-[28px] flex justify-center items-center rounded-[15px] mt-[20px]`}>
                                                <div className="mr-[-5px]">
                                                    <VscSearch className="w-[12px] h-[12px]" color="white" />
                                                </div>
                                                <input
                                                    ref={inputRef}
                                                    onChange={handelsearchChanges}
                                                    type="text"
                                                    placeholder="Search friends"
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
                                                        <Memeber user={user} index={index}/>
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