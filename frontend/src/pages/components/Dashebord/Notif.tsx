
interface NotifProps {
    avatar : string;
    title : string;
    time : string;
}

export default function Notif(props : NotifProps) {
    return (
        <div className="w-[100%] h-[7%] relative overflow-hidden flex justify-center items-center">
            <div className="w-[15%] h-[100%] relative">
                <img src={props.avatar} alt=""  className="absolute right-0 top-[20%] w-[26px] h-[26px] rounded-full"/>
            </div>
            <div className="w-[85%] h-[100%] ">
                <p className="absolute top-[30%] ml-3 text-[8px] font-sora font-bold leading-[0.5px] text-[#9A9A9A]">{props.title}</p>
                <p className="absolute top-[60%] ml-3 text-[7px] font-sora font-bold leading-[0.5px] text-[#9A9A9A]">{props.time} min ago</p>
            </div>
            <div className="w-[8px] h-[8px] bg-[#878787] rounded-full absolute top-[40%] left-[-4px] z-99">
            </div>
        </div>
    );

}