import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useState } from "react";
import Image from "next/image";
interface Props {
    username: string;
    name: string;
    image: string;
}

export default function FriendRequest(props : Props) {
    const [showRequestFriend, setshowRequestFriend] = useState<boolean>(true);
    function handleAccept() {
        fetch("http://localhost:3000/friends/ACCEPT/" + props.username, {credentials: "include", method: "POST" })
        setshowRequestFriend(false);
    }
    function handleReject() {
        fetch("http://localhost:3000/friends/REJECT/" + props.username, {credentials: "include", method: "POST" })
        setshowRequestFriend(false);
    }

    return (
        <div className="w-[100%] h-[16%] flex items-center justify-center"
        style={
                showRequestFriend ? { display: "flex" } : { display: "none" }
        }
        >
            <div className="w-[27%] h-[100%] flex items-center justify-center">
                <div className="w-[52px] h-[52px] border border-cyan-400 rounded-full overflow-hidden">
                    <Image src={props.image} alt="" className="w-[51px] h-[51px] rounded-full" width={51} height={51}/>
                </div>
            </div>
            <div className="w-[73%] h-[100%]">
                <div className="w-[100%] h-[50%]  flex flex-col justify-end items-start">
                    <h1 className="text-[#fff] text-[10px]">{props.name}</h1>
                    <h1 className="text-[7px] text-[#969696]">@{props.username}</h1>
                </div>
                <div className="w-[100%] h-[50%]  flex items-center justify-end">
                    <div className="w-[78%] h-[100%] flex items-center justify-between">
                        <div onClick={handleAccept} className="w-[45%] h-[80%] bg-[#2AA656] rounded-[4px] flex items-center justify-center cursor-pointer hover:bg-[#2AA656D0]">
                            <FaCheck className="w-[11px] h-[11px] text-white" />
                            <h1 className="ml-2 text-[10px] text-white font-sora font-bold leading-normal">
                                Accept
                            </h1>
                        </div>
                        <div onClick={handleReject} className="w-[45%] h-[80%] bg-[#ED5253] rounded-[4px] transition-all duration-500 ease-out flex items-center justify-center cursor-pointer hover:bg-[#ED5253D0]">
                            <FaXmark color="white" className="w-[12px] h-[13px]" />
                            <h1 className="ml-2 text-[10px] text-white font-sora font-bold leading-normal">
                                Reject
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}