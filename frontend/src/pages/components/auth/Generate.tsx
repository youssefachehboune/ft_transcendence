import { useEffect, useState } from 'react';
import Verfie from './Verification';
import OTPField from './otp';
import { getText } from '@/pages/api/lang';
interface Prop {
    val: boolean;
    setVal : (val : boolean) => void;
  }

const MyComponent = (props : Prop) => {

  return (
    <div className="generate">
        <div className="w-[100%] h-[28.9%] flex items-center justify-center phone:h-[25%]">
            <div className="w-[90.48%] h-[41.4%] ">
                <p className="font-sora font-medium text-[16px] leading-[19px] text-[#414243] phone:text-[13px]">{getText('GENERATE_P')}</p>
            </div>
        </div>
        <div className="w-[100%] h-[21.2%] flex items-end justify-center">
            <div className="w-[76.19%] h-[100%] rounded-[10px] border border-[#414243] flex items-center justify-center">
                <img  className="w-[33.33%] h-[83.48%]" src="http://localhost:3000/2fa/generate" alt="" />
            </div>
        </div>
        <Verfie/>
        <OTPField setVal={props.setVal} val={props.val}/>
        <div className="w-[100%] h-[7.4%] flex items-end justify-center ">
            <a className="font-sora font-regular text-[12px] text-[#24BD86] leading-[15px] cursor-none">{getText('VERIFY_SKIP')}</a>
        </div>
    </div>
);
};

export default MyComponent;



