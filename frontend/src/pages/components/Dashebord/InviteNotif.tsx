interface InviteNotifProps {
    avatar : string;
    name : string;
    time : string;
}



export default function InviteNotif(props : InviteNotifProps) {
    return (
        <div className="w-[100%] h-[13%] relative overflow-hidden flex justify-center items-center">
            <div className="w-[15%] h-[100%] relative">
                <img src={props.avatar} alt=""  className="absolute right-0 top-[10%] w-[26px] h-[26px] rounded-full"/>
            </div>
            <div className="w-[85%] h-[100%] ">
                <div className="w-[100%] h-[10px] absolute top-[16%] flex items-center justify-start">
                    <p className="ml-3 text-[#000] text-[8px] font-sora font-bold">{props.name}</p>
                    <p className="text-[#ffffff7d] text-[9px] font-sora ml-2 font-medium">send you a friend request</p>
                </div>
                <p className="absolute top-[40%] ml-3 text-[7px] font-sora font-bold leading-[0.5px] text-[#9A9A9A]">{props.time} min ago</p>
                <div className="w-[30%] h-[40%] ml-3 absolute top-[50%] flex justify-between items-center">
                    <button className="w-[48px] h-[21px] bg-[#5A84ED] rounded-[4px] text-[#FFF] text-[7px] font-sora font-bold leading-[0.5px]">Accept</button>
                    <button className="w-[39px] h-[21px] bg-[#FFF] rounded-[4px] text-[#000] text-[7px] font-sora font-bold leading-[0.5px]">Reject</button>
                </div>
            </div>
            <div className="w-[8px] h-[8px] bg-[#878787] rounded-full absolute top-[40%] left-[-4px] z-99">
            </div>
        </div>
    );

}