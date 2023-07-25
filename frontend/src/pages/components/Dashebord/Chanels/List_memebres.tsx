import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { VscSearch, VscSettingsGear } from "react-icons/vsc";
import { AiOutlineArrowLeft, AiOutlineMessage } from "react-icons/ai";
import Memeber from "./memeber";
import Chat_chanel from "./Chat_chanel";

function List_memebres(props: any) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [searchfriend, setsearchfriend] = useState<string | undefined>("");
    const [test , settest] = useState<boolean>(true)
    const handelsearchChanges = () =>
    {
        setsearchfriend(inputRef.current?.value);
    }
    useEffect(() => {
        const handleResize = () => {
            if (!test)
                settest(window.innerWidth > 768);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, [test]);
    return ( 
            <div className="Chat flex items-end">
                <div className={`w-[40%] h-[100%] ${test ? "2xl:w-[40%] xl:w-0" : "2xl:w-[50%] xl:w-[95%]"} test5 ml-2`}>
                    <div className={`w-[100%] h-[100%] flex flex-col items-center overflow-y-auto rounded-[10px]`}>
                                        <button className="bg-[#070012] w-[100%] flex cursor-auto">
                                            <h1 onClick={() => props.setshowchanel(false)} className="text-white text-[32px] font-sora font-[600] flex items-center cursor-pointer"><AiOutlineArrowLeft/>HOME</h1>
                                        </button>
                                        <div className="w-[100%] h-auto flex flex-col items-center">
                                            <button className={`self-end absolute mr-[30px] xl:mr-[50px] mt-[25px] ${test ? "xl:hidden" : ""} `}><VscSettingsGear className="hovring w-[18px] h-[18px]"/></button>
                                            <button onClick={() => settest(true)} className={`self-end absolute mt-[25px] mr-[20px] ${test ? "hidden" : ""} `}><AiOutlineMessage className="hovring w-[18px] h-[18px]"/></button>
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
                                                    <Skeleton isLoaded>
                                                        <h1 className="font-[700] font-sora text-[11px] text-white">{`${props.memebers?.length} member`}</h1>
                                                    </Skeleton>
                                            </div>
                                        </div>
                                            <div className="w-[100%] h-[100%] gap-[10px] flex flex-col overflow-hidden">
                                                {
                                                    props.memebers?.map((user: any, index: number) => (
                                                        <Memeber user={user} index={index}/>
                                                    ))
                                                }
                                            </div>
                    </div>
                </div>
                {test && <Chat_chanel back={settest} data={props.data} chanel={props.chanel}/>}
            </div> 
    );
}

export default List_memebres;