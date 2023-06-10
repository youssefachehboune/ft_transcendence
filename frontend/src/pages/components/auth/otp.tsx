import React, { FC, useState } from "react";
import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
  interface ApiResponse {
    isValid: boolean;
  }

let currentOTPIndex:number = 0;
const OTPField = () => {
    const router = useRouter();
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [activeOTPIndex, setactiveOTPIndex] = useState<number>(0);
    const [isValid, setIsValid] = useState<boolean>(true);
    let b : boolean = false;
    let a : boolean = false;
    let show : boolean = false;
    let num : string = "";
      if (activeOTPIndex === 6) {
        b = true;
        otp.forEach((value) => {
          num += value;
        }
        );
    }
    else {
        b = false;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      // Make the API request
      const response = await fetch('http://localhost:3000/2fa/validate', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token: num}),
      });
    
      // Parse the response as JSON
      const data: boolean = await response.json();
    
      // Set the isValid state based on the response
      if (data === true)
      {
        setIsValid(true);
        a = true;
      }
      else
      {
        setIsValid(false);
        a = false;
      }
    };
    
    
    const inputRef = useRef<HTMLInputElement>(null)
    const handleOnChange = ({target,} : React.ChangeEvent<HTMLInputElement>): void => {
        const {value} = target;
        const newOTP : string[] = [...otp];
        newOTP[currentOTPIndex] = value.substring(value.length - 1);
        if (!value) 
            setactiveOTPIndex(currentOTPIndex - 1);
        else
            setactiveOTPIndex(currentOTPIndex + 1);
        setOtp(newOTP);
    }
    const handleOnkeyDown = ({key}: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        currentOTPIndex = index;
        if (key === 'Backspace')
            setactiveOTPIndex(currentOTPIndex - 1);
        
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [activeOTPIndex]); 

    useEffect(() => {
      if (activeOTPIndex !== 7) 
        setIsValid(true);
    }, [currentOTPIndex]);
  return (
    <form onSubmit={handleSubmit}>
    <div className="w-[100%] h-[55px] flex  items-end justify-center">
        <div className="div_input">
            {otp.map((_, index) => {
              return (
                <React.Fragment key={index}>
                  <input
                      ref={index === activeOTPIndex ? inputRef : null}
                    type="number"
                    className="
                      focus:text-gray-700
                      text-gray-400 transition"
                    onChange={handleOnChange} value={otp[index]}
                    onKeyDown={(e) => {handleOnkeyDown(e, index)}}
                    style={{borderColor: isValid ? '#414243' : '#FF0000'}}
                      />
                </React.Fragment>
              );
            })}
      </div>
    </div>
    <div className="flex items-center justify-center">
      {
        !isValid && <h1 className="text-[#FF0000] mt-2 font-sora font-regular text-[8px] leading-[10px]">
          The code you entered is incorrect
          </h1>
      }
    </div>
    <div className="w-[100%] h-[60px] flex items-end justify-center ">
        <button 
        className="Nextt"
        style={{backgroundColor: !b ? ' #393e60' : '#171926', cursor: !b ? 'none' : 'pointer' }}
        disabled={!b}
        type="submit">Next</button>
    </div>
</form>

  );
};
export default OTPField;

