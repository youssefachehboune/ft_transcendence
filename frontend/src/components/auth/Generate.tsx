import { useEffect, useState } from 'react';
import Verfie from './Verification';
import OTPField from './otp';
import { GetText } from '@/pages/api/lang';
import Image from 'next/image';
import Link from 'next/link';
import path from 'path';
interface Prop {
    val: boolean;
    setVal : (val : boolean) => void;
  }

const MyComponent = (props : Prop) => {

    const imageLoader = () => "http://localhost:3000/2fa/generate"

  return (
    <div className="generate">
        <div className="w-[100%] h-[28.9%] flex items-center justify-center phone:h-[25%]">
            <div className="w-[90.48%] h-[41.4%] ">
                <p className="font-sora font-medium text-[16px] leading-[19px] text-[#414243] phone:text-[13px]">{GetText('GENERATE_P')}</p>
            </div>
        </div>
        <div className="w-[100%] h-[21.2%] flex items-end justify-center">
            <div className="w-[76.19%] h-[100%] rounded-[10px] border border-[#414243] flex items-center justify-center">
                <Image loader={imageLoader}  className="w-[33.33%] h-[83.48%]" src="http://localhost:3000/2fa/generate" alt="" width={33} height={33}/>
            </div>
        </div>
        <Verfie/>
        <OTPField setVal={props.setVal} val={props.val}/>
        <div className="w-[100%] h-[7.4%] flex items-end justify-center ">
            <Link href={'/Dashboard'} className="font-sora font-regular text-[12px] text-[#24BD86] leading-[15px] cursor-none">{GetText('VERIFY_SKIP')}</Link>
        </div>
    </div>
);
};

export default MyComponent;




