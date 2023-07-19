import { BsPlus } from "react-icons/bs";
import { useState } from "react";
import { FaCompass } from 'react-icons/fa'
import Link from "next/link";
export default function NavBar() {
    const [isShow, setIsShow] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<null | number>(null);
    const [svgPosition, setSvgPosition] = useState(0);
    const handleClick = (index : number) => {
        setIsShow(index === activeIndex ? false : true);
        setActiveIndex(index === activeIndex ? null : index);
        setSvgPosition(index * 70);
        
    //   console.log(index);
    };
    return (
            <div className=" h-[100%] w-[100%] flex items-center justify-end relative">
                    <Link  href={'/'}><img src="pipo.png" alt="" className="w-[100px] p-4 select-none absolute left-0 top-0"/></Link>
                        <div   className="div_navbar ">
                            <div onClick={() => handleClick(0)} className={`${0 === activeIndex ? 'active' : 'nav_hover'} w-[45px] h-[45px] bg-[#6e6e6e] ml-8 rounded-full flex items-center justify-center mb-[25px]`}>
                                <FaCompass color="white" className="Compass_icon"/>
                            </div>
                            <div className="relative   w-auto h-[350px] scroll">
                                <div onClick={() => handleClick(1)} className={`${1 === activeIndex ? 'active' : 'nav_hover'} w-[45px] h-[45px] ml-8 rounded-full flex items-center justify-center mb-[25px] overflow-hidden`}>
                                        <img src="1337.jpeg" className="" alt="" />
                                </div>
                                <div  onClick={() => handleClick(2)} className={`${2 === activeIndex ? 'active' : 'nav_hover'} w-[45px] h-[45px]  bg-[#02cdd1] ml-8 rounded-full flex items-center justify-center mb-[25px] overflow-hidden`}>
                                    <img src="Bios.svg" alt="" />
                                </div>
                                <div  onClick={() => handleClick(3)} className={`${3 === activeIndex ? 'active' : 'nav_hover'} w-[45px] h-[45px]  bg-[#235a16] ml-8 rounded-full flex items-center justify-center mb-[25px] overflow-hidden`}>
                                    <img src="Commodore.svg" alt="" />
                                </div>
                                <div  onClick={() => handleClick(4)} className={`${4 === activeIndex ? 'active' : 'nav_hover'} w-[45px] h-[45px]  bg-[#f5bc39] ml-8 rounded-full flex items-center justify-center mb-[25px] overflow-hidden`}>
                                    <img src="Freax.svg" alt="" />
                                </div>
                                <div  onClick={() => handleClick(5)} className={`${5 === activeIndex ? 'active' : 'nav_hover'} w-[45px] h-[45px]  bg-[#b61282] ml-8 rounded-full flex items-center justify-center mb-[25px] overflow-hidden`}>
                                    <img src="Pandora.svg" alt="" />
                                </div>
                            </div>
                            <div onClick={() => handleClick(6)} className={`${6 === activeIndex ? 'active' : 'nav_hover'} w-[45px] h-[45px] bg-[#6e6e6e] ml-8 rounded-full flex items-center justify-center mb-[25px]`}>
                                <BsPlus color="white" className="Add_icon"/>
                            </div>
                            <img src="indicator.svg" alt=""  className="w-[50%] absolute left-[15px]"
                                style={{
                                    display: isShow ? 'block' : 'none',
                                    top: `${svgPosition}px`,
                                    transition: 'top 0.3s ease-in-out',
                                }}
                            />
                        </div>
                        <div className="line_navbar">
                        </div>
        </div>  
    );
}