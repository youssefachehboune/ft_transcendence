import { useEffect, useState } from 'react';
import OTPField from './otp';
const MyComponent = () => {

    const [isValid, setIsValid] = useState(false);
  return (
    <div className="w-[378px] h-[543px] bg-white absolute top-1/4 left-[20%] rounded-[15px]">
        <div className="w-[100%] h-[157px] flex items-center justify-center">
            <div className="w-[342px] h-[65px]">
                <p className="font-sora font-medium text-[16px] leading-[19px] text-[#414243]">You need to scan this QR Code with your google Authentication App and enter the verification code bellow</p>
            </div>
        </div>
        <div className="w-[100%] h-[115px] flex items-end justify-center">
            <div className="w-[288px] h-[100%] rounded-[10px] border border-[#414243] flex items-center justify-center">
                <img  className="w-[96px] h-[96px]" src="http://localhost:3000/2fa/generate" alt="" />
            </div>
        </div>
        <div className="w-[100%] h-[70px]  flex items-center justify-center">
            <div className="w-[305px] h-[100%] flex items-end justify-first">
                <h1 className="font-sora font-semibold text-[12px] leading-[15px] ">Verification code</h1>
            </div>
        </div>
        <OTPField/>
        <div className="w-[100%] h-[40px] flex items-end justify-center ">
            <a className="font-sora font-semibold text-[12px] text-[#24BD86] leading-[15px] cursor-none">Skip for now</a>
        </div>
    </div>
);
};

export default MyComponent;



