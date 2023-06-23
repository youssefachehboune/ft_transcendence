import { Dispatch, SetStateAction } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import { VscBell, VscSettingsGear } from 'react-icons/vsc'
import { useState } from "react";
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
            <div className="w-[20%] h-[70%] absolute bg-[#F8F8F821] top-[5%] right-[0.5%] z-99 rounded-[6px] overflow-hidden" style={
                {
                    display: show ? 'block' : 'none'
                }
            }
            >
                <div className="w-[100%] h-[13%] bg-red-100 "></div>
            </div>

    </div>
);
}

export default Section;