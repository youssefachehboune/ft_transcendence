import Verfie from './Verification';
import OTPField from './otp';
import { useState } from 'react';
import { getText } from '@/pages/api/lang';
export default function authLogin()
{
    const [show, setShow] = useState(false);
    return (
        <div className="authLog">
            <div className="w-[100%] h-[25%] flex items-center justify-center">
                <div className="w-[90.48%] h-[70%] mt-3">
                    <p className="font-sora font-semibold text-[16px] leading-[20px] text-[#414243]">{getText('VERIFY_P')}</p>
                </div>
            </div>
            <Verfie/>
            <OTPField setVal={setShow} val={show}/>
        </div>
    );
}