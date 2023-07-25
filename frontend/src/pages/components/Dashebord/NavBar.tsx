import { BsPlus } from "react-icons/bs";
import { useState } from "react";
import { FaCompass } from 'react-icons/fa'
import Link from "next/link";
import IconNavBar from "./IconNavBar";

export default function NavBar(props : any) {

    const lastkey = props.mychanel?.length + 1;
    const [isShow, setIsShow] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<null | number>(null);
    const handleClick = (index : number) => {
        setIsShow(index === activeIndex ? false : true);
        setActiveIndex(index === activeIndex ? null : index);
    };
    return (
            <div className=" h-[100%] w-[100%] flex items-center justify-end relative">
                    <Link  href={'/'}><img src="pipo.png" alt="" className="w-[100px] p-4 select-none absolute left-0 top-0"/></Link>
                        <div   className="div_navbar ">
                            <div className={`relative w-[100px] h-[71px] flex items-center overflow-y-auto`}>
                                <div onClick={() => {handleClick(0); props.setshowchanel(false); props.setshowchatsection(!props.showchatsection); props.setonlyChat(false)}} className={`${0 === activeIndex ? 'active' : 'nav_hover'} w-[45px] h-[45px] bg-[#6e6e6e] ml-8 rounded-full flex items-center justify-center`}>
                                    <FaCompass color="white" className="Compass_icon"/>
                                </div>
                                <div className={`w-[7px]  bg-white absolute z-99 right-[75%] rounded-l-[2px] rounded-r-[5px] transition-all  ${0 === activeIndex ? 'h-[50%]' : 'h-[0%]'} `}>
                                </div>
                            </div>
                            <div className={`relative   w-auto scroll overflow-y-auto`}
                            style={
                                {
                                    height: (lastkey - 1) > 5 ? '350px' : 'auto',
                                }
                            }
                            >
                                {
                                    props.mychanel?.map((item: any, key : any) => {
                                        return (
                                            <div className="relative w-[100px] h-[71px] flex items-center ">
                                                <div onClick={() => {handleClick(key + 1);props.setshowchatsection(false); props.setshowchanel(true); 
                                                    fetch(`http://localhost:3000/channel/${item.name}/members`, { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {props.setmemebers(data)})
                                                    fetch(`http://localhost:3000/channel/${item.name}`, { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {props.setchanel(data)})
                                                    }} 
                                                    className={`${(key + 1) === activeIndex ? 'active' : 'nav_hover'} w-[45px] h-[45px] ml-8 rounded-full flex items-center justify-center overflow-hidden`}>
                                                        <img src={item.avatar} className="" alt="" />
                                                </div>
                                                <div className={`w-[7px]  bg-white absolute z-99 right-[75%] rounded-l-[2px] rounded-r-[5px] transition-all  ${(key + 1) === activeIndex ? 'h-[50%]' : 'h-[0%]'} `}>
                                                </div>
                                            </div>
                                        );
                                    })

                                }
                            </div>
                            <div className="relative w-[100px] h-[71px] flex items-center ">
                                <div onClick={() => {handleClick(lastkey); props.onOpen()}} className={`${(lastkey) === activeIndex ? 'active' : 'nav_hover'} w-[45px] h-[45px] bg-[#6e6e6e] ml-8 rounded-full flex items-center justify-center `}>
                                    <BsPlus color="white" className="Add_icon"/>
                                </div>
                                <div className={`w-[7px]  bg-white absolute z-99 right-[75%] rounded-l-[2px] rounded-r-[5px] transition-all  ${lastkey === activeIndex ? 'h-[50%]' : 'h-[0%]'} `}>
                                </div>
                            </div>
                        </div>
                        <div className="line_navbar">
                        </div>
        </div>  
    );
}