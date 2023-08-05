
import { CgUnblock } from "react-icons/cg";
import { useState } from "react";
import Image from "next/image";
interface Props {
    username: string;
    name: string;
    image: string;
}

export default function Blocked(props : Props) {
    const [showBlocked, setshowBlocked] = useState<boolean>(true);
    function handleUnblock() {
        fetch("http://localhost:3000/friends/UNBLOCK/" + props.username, {credentials: "include", method: "POST" })
        setshowBlocked(false);
    }

    return (
        <div className="w-[100%] h-[16%] flex items-center justify-center"
        style={
                showBlocked ? { display: "flex" } : { display: "none" }
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
                    <div className="w-[78%] h-[100%] flex items-center justify-center">
                        <div onClick={handleUnblock} className="w-[45%] h-[80%] bg-[#6F6F6F78] transition-all duration-500 ease-out rounded-[4px] flex items-center justify-center cursor-pointer hover:bg-[#6F6F6F]">
                            <CgUnblock className="w-[15px] h-[15px] text-white" />
                            <h1 className="ml-1 text-[10px] text-white font-sora font-bold leading-normal
                            phone:text-[8px]
                            ">
                                UNBLOCK
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}