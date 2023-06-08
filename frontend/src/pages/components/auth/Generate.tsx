import { useEffect, useState } from 'react';

const MyComponent = () => {
const [changeColor, setChangeColor] = useState(false);

    useEffect(() => {
        const handleKeyUp = (e: KeyboardEvent) => {
          const inputs = document.querySelectorAll('input');
          const button = document.querySelector('button');
    
          if (!button) {
            return;
          }
    
          inputs.forEach((input: HTMLInputElement, index1: number) => {
            const currentInput = input;
            const nextInput = input.nextElementSibling as HTMLInputElement;
            const prevInput = input.previousElementSibling as HTMLInputElement;
    
            if (currentInput.value.length > 1) {
              currentInput.value = '';
              return;
            }
            
            if (nextInput && nextInput.hasAttribute('disabled') && currentInput.value !== '') {
                nextInput.removeAttribute('disabled');
                nextInput.focus();
            }
    
            if (e.key === 'Backspace') {
              inputs.forEach((input: HTMLInputElement, index2: number) => {
                if (index1 <= index2 && prevInput) {
                  input.setAttribute('disabled', 'true');
                  input.value = '';
                  prevInput.focus();
                }
              });
            }
    
            if (!inputs[5].disabled && inputs[5].value !== '') {
              setChangeColor(true);
              return;
            }
    
            setChangeColor(false);
          });
        };
    
        window.addEventListener('keyup', handleKeyUp);
    
        return () => {
          window.removeEventListener('keyup', handleKeyUp);
        };
      }, []);
    
      useEffect(() => {
        const inputs = document.querySelectorAll('input');
        if (inputs[0]) {
          inputs[0].focus();
        }
      }, []);
    
  return (
    <div className="w-[378px] h-[543px] bg-white absolute top-1/4 left-[20%] rounded-[15px]">
        <div className="w-[100%] h-[157px] flex items-center justify-center">
            <div className="w-[342px] h-[65px]">
                <p className="font-sora font-medium text-[16px] leading-[19px] text-[#414243]">You need to scan this QR Code with your google Authentication App and enter the verification code bellow</p>
            </div>
        </div>
        <div className="w-[100%] h-[115px] flex items-end justify-center">
            <div className="w-[288px] h-[100%] rounded-[10px] border border-[#414243] flex items-center justify-center">
                <img  className="w-[96px] h-[96px]" src="rr.png" alt="" />
            </div>
        </div>
        <div className="w-[100%] h-[70px]  flex items-center justify-center">
            <div className="w-[305px] h-[100%] flex items-end justify-first">
                <h1 className="font-sora font-semibold text-[12px] leading-[15px] ">Verification code</h1>
            </div>
        </div>
        <div className="w-[100%] h-[60px] flex items-center justify-center">
            <div className="w-[305px] h-[40px] flex items-center justify-between">
                <input type="number"/>
                <input type="number" disabled />
                <input type="number" disabled/>
                <input type="number" disabled/>
                <input type="number" disabled/>
                <input type="number" disabled/>
            </div>
        </div>
        <div className="w-[100%] h-[70px] flex items-end justify-center ">
           <button style={{backgroundColor: !changeColor ? ' #393e60' : '#171926'}}>Next</button>
        </div>
        <div className="w-[100%] h-[40px] flex items-end justify-center ">
            <a className="font-sora font-semibold text-[12px] text-[#24BD86] leading-[15px] cursor-none">Skip for now</a>
        </div>
    </div>
);
};

export default MyComponent;



