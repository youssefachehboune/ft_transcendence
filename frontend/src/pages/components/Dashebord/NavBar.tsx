import { BsPlus } from "react-icons/bs";
import { useState } from "react";
import { FaCompass } from 'react-icons/fa'
import Link from "next/link";
import { BiSearch } from "react-icons/bi";

interface IconNavBarProps{
    'image' : string,
    'color' : string,
}

export default function NavBar() {
    const data : IconNavBarProps[] = [
        {
            'image' : '1337.jpeg',
            'color' : 'black',
        },
        {
            'image' : 'mbjaghou.jpeg',
            'color' : '#f5bc39',
        },
        {
            'image' : 'mbjaghou.jpeg',
            'color' : '#f5bc39',
        },
        {
            'image' : 'mbjaghou.jpeg',
            'color' : '#f5bc39',
        },
        {
            'image' : 'mbjaghou.jpeg',
            'color' : '#f5bc39',
        },
        {
            'image' : 'mbjaghou.jpeg',
            'color' : '#f5bc39',
        },
        {
            'image' : 'mbjaghou.jpeg',
            'color' : '#f5bc39',
        },
        
    ];
    const lastkey = data.length + 1;
    const LastKeyPlus = lastkey + 1;
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
                                <div onClick={() => handleClick(0)} className={`${0 === activeIndex ? 'active' : 'nav_hover'} w-[45px] h-[45px] bg-[#6e6e6e] ml-8 rounded-full flex items-center justify-center`}>
                                    <FaCompass color="white" className="Compass_icon"/>
                                </div>
                                <div className={`w-[7px]  bg-white absolute z-99 right-[75%] rounded-l-[2px] rounded-r-[5px] transition-all  ${0 === activeIndex ? 'h-[50%]' : 'h-[0%]'} `}>
                                </div>
                            </div>
                            <div className={`relative   w-auto scroll overflow-y-auto`}
                            style={
                                {
                                    height: (lastkey - 1) > 5 ? '280px' : 'auto',
                                }
                            }
                            >
                                {
                                    data.map((item : IconNavBarProps, key : any) => {
                                        return (
                                            <div key={key} className="relative w-[100px] h-[71px] flex items-center ">
                                                <div onClick={() => handleClick(key + 1)} className={`${(key + 1) === activeIndex ? 'active' : 'nav_hover'} w-[45px] h-[45px] bg-[${item.color}] ml-8 rounded-full flex items-center justify-center overflow-hidden`}>
                                                        <img src={item.image} className="" alt="" />
                                                </div>
                                                <div className={`w-[7px]  bg-white absolute z-99 right-[75%] rounded-l-[2px] rounded-r-[5px] transition-all  ${(key + 1) === activeIndex ? 'h-[50%]' : 'h-[0%]'} `}>
                                                </div>
                                            </div>
                                        );
                                    })

                                }
                            </div>
                            <div className="relative w-[100px] h-[71px] flex items-center ">
                                <div onClick={() => handleClick(lastkey)} className={`${(lastkey) === activeIndex ? 'active' : 'nav_hover'} w-[45px] h-[45px] bg-[#6e6e6e] ml-8 rounded-full flex items-center justify-center `}>
                                    <BiSearch color="white" />
                                </div>
                                <div className={`w-[7px]  bg-white absolute z-99 right-[75%] rounded-l-[2px] rounded-r-[5px] transition-all  ${lastkey === activeIndex ? 'h-[50%]' : 'h-[0%]'} `}>
                                </div>
                            </div>
                            <div className="relative w-[100px] h-[71px] flex items-center ">
                                <div onClick={() => handleClick(LastKeyPlus)} className={`${(LastKeyPlus) === activeIndex ? 'active' : 'nav_hover'} w-[45px] h-[45px] bg-[#6e6e6e] ml-8 rounded-full flex items-center justify-center `}>
                                    <BsPlus color="white" className="Add_icon"/>
                                </div>
                                <div className={`w-[7px]  bg-white absolute z-99 right-[75%] rounded-l-[2px] rounded-r-[5px] transition-all  ${(LastKeyPlus) === activeIndex ? 'h-[50%]' : 'h-[0%]'} `}>
                                </div>
                            </div>
                        </div>
                        <div className="line_navbar">
                        </div>
        </div>  
    );
}