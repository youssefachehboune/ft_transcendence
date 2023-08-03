import Verfie from './Verification';
import OTPField from './otp';
import { useState } from 'react';
import { getText } from '@/pages/api/lang';

interface Prop {
    val: boolean;
    setVal : (val : boolean) => void;
  }

export default function authLogin(props : Prop)
{
    return (
        <div className="authLog">
            <div className="w-[100%] h-[25%] flex items-center justify-center">
                <div className="w-[90.48%] h-[70%] mt-3">
                    <p className="font-sora font-semibold text-[16px] leading-[20px] text-[#414243]">{getText('VERIFY_P')}</p>
                </div>
            </div>
            <Verfie/>
            <OTPField setVal={props.setVal} val={props.val}/>
        </div>
    );
}