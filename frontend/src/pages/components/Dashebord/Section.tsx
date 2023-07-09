import { Dispatch, SetStateAction } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import { VscBell, VscSettingsGear } from 'react-icons/vsc'
import { useState } from "react";
import InviteNotif from "./InviteNotif";
import Notif from "./Notif";
function Section() {
    const [show, setshow] = useState<boolean>(false);

    function handleClick() {
        setshow(!show);
    }

    function handleMouseLeave() {
        setshow(false);
    }

return ( 
    <div className="section ">
            <div className="w-[100%] h-[100%] flex items-center justify-around">
                <button>
                <AiOutlineMessage className="hovring w-[18px] h-[18px]"/>
                </button>
                <button onClick={handleClick}>
                <VscBell className="hovring w-[18px] h-[18px]"/>
                </button>
                <button>
                <BsGlobe className="hovring w-[18px] h-[18px] "/>
                </button>
                <button>
                <VscSettingsGear className="hovring w-[18px] h-[18px]"/>
                </button>
            </div>
            <div className="w-[320px] h-[70%] absolute bg-[#F8F8F821] top-[5%] right-[0.5%] z-99 rounded-[6px] overflow-y-auto" style={
                {
                    display: show ? 'block' : 'none'
                }
            }
            >
                <div className="w-[100%] h-[10%] bg-[#FFFFFF0F]  flex justify-center items-start">
                    <div className="w-[100%] h-[40%] flex items-end">
                        <div className="w-[50%] h-[50%]">
                                <h1 className="text-[11px] text-[#fff] font-sora font-semibold ml-4">Notification</h1>
                        </div>
                        <div className="w-[50%] h-[50%] flex justify-end">
                                <h1 className="text-[9px] text-[#fff] font-sora mr-4">Mark all as read</h1>
                        </div>
                    </div>
                </div>
                <InviteNotif avatar="invite.png" name="John Doe" time="5"/>
                <Notif avatar="tinder.jpeg" title="You have reached level 5" time="5"/>
                <InviteNotif avatar="invite.png" name="John ewDoe" time="5"/>
                <Notif avatar="mbjaghou.jpeg" title="You have reached level 5" time="5"/>
                <InviteNotif avatar="invite.png" name="John wteDoe" time="5"/>
                <Notif avatar="mbjaghou.jpeg" title="You have reached level 5" time="5"/>
                <InviteNotif avatar="invite.png" name="John Doe" time="5"/>
                <Notif avatar="mbjaghou.jpeg" title="You have reached level 5" time="5"/>
                <InviteNotif avatar="invite.png" name="John eeDoe" time="5"/>
                <Notif avatar="mbjaghou.jpeg" title="You have reached level 5" time="5"/>
                <InviteNotif avatar="invite.png" name="John Doe" time="5"/>
                <Notif avatar="mbjaghou.jpeg" title="You have reached level 5" time="5"/>
                <InviteNotif avatar="invite.png" name="John Doe" time="5"/>
                <Notif avatar="mbjaghou.jpeg" title="You have reached level 5" time="5"/>
                <InviteNotif avatar="invite.png" name="John Doe" time="5"/>
                <Notif avatar="mbjaghou.jpeg" title="You have reached level 5" time="5"/>
            </div>

    </div>
);
}

export default Section;