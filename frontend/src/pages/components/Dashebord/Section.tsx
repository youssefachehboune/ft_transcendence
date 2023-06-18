import { Dispatch, SetStateAction } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import { VscBell, VscSettingsGear } from 'react-icons/vsc'

interface section
{
    setshowfriend: Dispatch<SetStateAction<boolean>>
    showfriend: boolean;
}
function Section({setshowfriend, showfriend} : section) {
return ( 
    <div className="section">
            <div className="w-[100%] h-[100%] flex items-center justify-around">
                <button>
                <AiOutlineMessage className="hovring w-[18px] h-[18px]"/>
                </button>
                <button onClick={() => {setshowfriend(!showfriend)}}>
                <VscBell className="hovring w-[18px] h-[18px]"/>

                </button>
                <button>
                <BsGlobe className="hovring w-[18px] h-[18px] "/>
                </button>
                <button onClick={() => {setshowfriend(!showfriend)}}>
                <VscSettingsGear className="hovring w-[18px] h-[18px]"/>
                </button>
            </div>
    </div>
);
}

export default Section;