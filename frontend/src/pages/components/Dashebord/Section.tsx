import { AiOutlineMessage } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import { VscBell, VscSettingsGear } from 'react-icons/vsc'

function Section() {
return ( 
    <div className="section">
            <div className="w-[100%] h-[100%] flex items-center justify-around">
                <button >
                <AiOutlineMessage className="hovring w-[18px] h-[18px]"/>
                </button>
                <button className="xl:hidden">
                <VscBell className="hovring w-[18px] h-[18px]"/>

                </button>
                <button className="xl:hidden">
                <BsGlobe className="hovring w-[18px] h-[18px] "/>
                </button>
                <button>
                <VscSettingsGear className="hovring w-[18px] h-[18px]"/>
                </button>
            </div>
    </div>
);
}

export default Section;