import React, { FC, useState } from "react";
import { useRef, useEffect } from "react";

  interface ApiResponse {
    isValid: boolean;
  }

let currentOTPIndex:number = 0;
const OTPField = () => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [activeOTPIndex, setactiveOTPIndex] = useState<number>(0);
    let b : boolean = false;
    let a : boolean = false;
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
      let code: {key : string, value: string} = {
        key: "token",
        value: num,
      };
      console.log("testttt");
      // Make the API request
      const response = await fetch('http://localhost:3000/2fa/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(code),
      });
    
      // Parse the response as JSON
      const data: ApiResponse = await response.json();
    
      // Set the isValid state based on the response
      a = data.isValid;
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

  return (
    <form onSubmit={handleSubmit}>
        <div className="w-[100%] h-[55px] flex  items-end justify-center">
            <div className="w-[305px] h-[40px] flex items-center justify-between">
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
                          />
                    </React.Fragment>
                  );
                })}
          </div>
        </div>
        <div className="flex items-center justify-center">
          {
            a && <h1>error</h1>
          }
        </div>
        <div className="w-[100%] h-[60px] flex items-end justify-center ">
            <button 
            style={{backgroundColor: !b ? ' #393e60' : '#171926', cursor: !b ? 'none' : 'pointer' }}
            disabled={!b}
            type="submit">Next</button>
        </div>
    </form>

  );
};

export default OTPField;