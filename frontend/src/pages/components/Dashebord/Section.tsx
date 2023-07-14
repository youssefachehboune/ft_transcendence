import { Dispatch, SetStateAction } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import { VscBell, VscSettingsGear } from 'react-icons/vsc'
import {CgProfile} from 'react-icons/cg'

function Section({setshowchatsection, showchatsection}: any) {
return ( 
    <div className="section ">
            <div className="w-[100%] h-[100%] flex items-center justify-around">
                <button className="hidden 2xl:block xl:block">
                    <CgProfile className="hovring w-[18px] h-[18px]"/>
                </button>
                <button onClick={() => {setshowchatsection(!showchatsection)}}>
                <AiOutlineMessage className="hovring w-[18px] h-[18px]"/>
                </button>
                <button>
                <VscBell className="hovring w-[18px] h-[18px]"/>

                </button>
                <button>
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