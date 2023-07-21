import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { VscSearch } from "react-icons/vsc";
import Chat from "./Chat";
import { AiOutlineArrowLeft } from "react-icons/ai";

function ChatFriends(props: any) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [searchfriend, setsearchfriend] = useState<string | undefined>("");
    const [datafriend, setdatafriend] = useState<any>();
    const [friendchat, setfriendchat] = useState<any>();
    const [chatloding, setchatloding] = useState(false)

    const handelsearchChanges = () =>
    {
        setsearchfriend(inputRef.current?.value);
    }
    useEffect(() => {
        if (searchfriend)
            fetch('http://localhost:3000/search/' + searchfriend, { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {setdatafriend(data);})
    }, [searchfriend])

    return ( 
            <div className="Chat flex items-end">
                <div className={`w-[40%] ${props.onlyChat ? "2xl:w-[40%] xl:w-0" : "2xl:w-[50%] xl:w-[95%]"} h-[100%] test5 ml-2`}>
                    <div className={`w-[100%] h-[100%] flex flex-col items-center overflow-y-auto rounded-[10px]`}>
                                        <button className="bg-[#070012] w-[100%] flex cursor-auto">
                                            <h1 onClick={() => props.setshowchatsection(false)} className="text-white text-[32px] font-sora font-700 flex items-center cursor-pointer"><AiOutlineArrowLeft/>HOME</h1>
                                        </button>
                                        <div className="w-[100%] h-auto flex flex-col items-center">
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
                                                        <Skeleton isLoaded={props.friendsloding}>
                                                            <h1 className="font-[700] font-sora text-[11px] text-white">{`${props.count_frinds?.info?.count_friends} Friends`}</h1>
                                                        </Skeleton>
                                                </div>
                                        </div>
                                            <div className="w-[100%] h-[100%] gap-[10px] flex flex-col overflow-hidden">
                                                {
                                                    !props.friendsloding &&
                                                            Array.from(Array(8)).map((i) => (
                                                            <div key={i} className="w-[100%] h-[70px] ml-[15%] flex items-center overflow-hidden">
                                                                            <SkeletonCircle size={'54px'} ></SkeletonCircle>
                                                                            <SkeletonText width={'40'} ml={'10px'}></SkeletonText>
                                                            </div>))
                                                }
                                                {props.count_frinds?.info?.count_friends == "0" && 
                                                            <div className="text-white text-[15px] font-sora font-[700] text-center">you don't have friends</div>
                                                }
                                                {
                                                    searchfriend === "" && props.friendsloding ? (
                                                        props.ListFriends?.map((user: any, key: any) => (

                                                        <div key={user?.id} className="min-h-[61px] flex items-center">
                                                            <button onClick={() =>
                                                            {
                                                                props.setonlyChat(false)
                                                                setchatloding(true)
                                                                fetch('http://localhost:3000/profile/' + user.username , { credentials: "include" }).then((resp) => { return resp.json(); }).then((data) => {setfriendchat(data); setchatloding(false)}).then(() => props.setonlyChat(true))
                                                            }
                                                            } className="w-[75%] flex items-center justify-center">
                                                                <div className="w-[75px] h-[70px] flex justify-center items-start relative">
                                                                        <img src={user.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                                                                        <div className={`w-[12px] h-[12px] bg-[#14FF00] mt-[45px] ml-[30px] rounded-full absolute`}></div>
                                                                </div>
                                                                <div className="w-[200px] h-[100%] flex flex-col justify-center items-start ml-[3%] mb-[5%]">
                                                                    <h1 className="text-[13px] font-sora font-[600] text-[white]">{user.firstName + " " + user.lastName}</h1>
                                                                    <h1 className="text-[10px] font-sora font-[400] text-[#969696] ">{"@" + user.username}</h1>
                                                                </div>
                                                            </button>
                                                    </div>

                                                    ))) : searchfriend && !datafriend?.message && datafriend?.friendShipStatus == "FRIENDS" ? (
                                                        <div  className="min-h-[61px] flex items-center">
                                                                <button className="w-[75%] flex items-center justify-center">
                                                                    <div className="w-[75px] h-[70px] flex justify-center items-start relative">
                                                                        <img src={datafriend.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                                                                        <div className={`w-[12px] h-[12px] bg-[#14FF00] mt-[45px] ml-[30px] rounded-full absolute 2xl:hidden xl:hidden}`}></div>
                                                                    </div>
                                                                    <div className="w-[200px] h-[100%] flex flex-col justify-center items-start ml-[3%] mb-[5%]">
                                                                        <h1 className="text-[13px] font-sora font-[600] text-[white]">{datafriend.firstName + " " + datafriend.lastName}</h1>
                                                                        <h1 className="text-[10px] font-sora font-[400] text-[#969696] ">{"@" + datafriend.username}</h1>
                                                                    </div>
                                                                </button>
                                                            </div>
                                                    ) : (
                                                        props.friendsloding && props.count_frinds?.info?.count_friends != "0" && <h1 className='text-white text-[15px] font-sora font-[700] text-center'>Not Found</h1>
                                                    )
                                                }
                                            </div>
                    </div>
                </div>
                {chatloding &&
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
                    </div>
                }
                {props.onlyChat && <Chat data={props.data} setonlyChat={props.setonlyChat} friendchat={friendchat}/>}
            </div> 
            
    );
}

export default ChatFriends;