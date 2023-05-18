import { MdLanguage } from 'react-icons/md'
import { useState } from 'react';
import { TfiWorld } from "react-icons/tfi";
import ReactCountryFlag from "react-country-flag"
export default function Language_icone()
{
    const [isDivVisible, setDivVisible] = useState(false);
    const handleIconClick = () => {
        setDivVisible(!isDivVisible);
    };

// <MdLanguage color={"white"} onClick={handleIconClick} className=" w-[40px] h-[40px]"/>
    return(
        <div>
                
                <button className='button-lang'>
                    <TfiWorld color='white' onClick={handleIconClick} className='icon-lang'/>
                </button>
                {
                    isDivVisible && 
                    <div className='w-[100px] h-[70px] bg-test absolute right-[90px] top-[120px] z-20 rounded-[5px] 
                                    phone:right-[50px] phone:top-[80px] phone:w-[80px] phone:h-[60px]
                                    Large-phone:right-[50px] Large-phone:top-[80px] Large-phone:w-[85px] Large-phone:h-[65px]
                                    laptop:right-[55px] laptop:top-[90px] laptop:w-[90px] laptop:h-[70px]'
                                    >
                        <button className='w-[100px] h-[35px] text-white text-sm
                                            phone:w-[80px] phone:h-[30px]
                                            Large-phone:w-[85px] Large-phone:h-[35px]
                                            laptop:w-[84px] laptop:h-[35px]'>
                            <ReactCountryFlag countryCode="FR" className='mr-[8px]'/>
                            french
                        </button>
                        <button className='w-[100px] h-[35px] text-white text-sm
                                            phone:w-[80px] phone:h-[30px]
                                            Large-phone:w-[85px] Large-phone:h-[35px]
                                            laptop:w-[84px] laptop:h-[35px]'>
                            <ReactCountryFlag countryCode="US" className='mr-[8px]'/>
                            english
                        </button>
                    </div>
                }
        </div>
    )
}