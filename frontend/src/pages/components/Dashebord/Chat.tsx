import { IoArrowBackCircle } from "react-icons/io5";
import {IoMdSend} from 'react-icons/io'
import { ChangeEvent, useState, KeyboardEvent, useRef} from "react";
function Chat({setonlyChat} : any) {
    const [inputValue, setInputValue] = useState<any>('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [messages, setMessages] = useState<{
        username: string;
        message: string;
      }[]>([]);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(inputRef.current?.value);
      };
      const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (inputValue)
          {
                setMessages((prevMessages) => [
                ...prevMessages,
                { username: inputValue, message: inputValue },
            ]);
          }
          setInputValue('');
      };
    }
    return ( 
            <div className={`w-[50%] 2xl:w-[70%] float-right xl:w-[100%] h-[96%] test5 ml-[10px] 2xl:ml-0 xl:ml-0 rounded-t-[10px] overflow-hidden relative`}>
                    <div className="w-[100%] h-[7%] test5">
                            <button onClick={() =>setonlyChat(false)} className="absolute">
                                <IoArrowBackCircle color="white"  className="w-[20px] h-[20px]"/>
                            </button>
                            <div className="w-[50%] min-h-[84px] flex ">
                                <div className="w-[20%] h-[84px] flex items-center justify-end">
                                        <img src={"mbjaghou.jpeg"} alt="" className="w-[54px] rounded-full select-none"/>
                                        <div className={`w-[12px] h-[12px] bg-[#14FF00] mt-[45px] ml-[30px] rounded-full absolute`}></div>
                                </div>
                                <div className="w-[70%] h-[84px] flex flex-col justify-center ml-[5px]">
                                    <h1 className="text-[13px] font-sora font-[600] text-[white]">mouhamed bjaghou</h1>
                                    <h1 className="text-[10px] font-sora font-[400] text-[#969696] ">@mbjaghou</h1>
                                </div>
                            </div>
                    </div>
                    <div className="w-[100%] h-[78%] overflow-y-auto">
                        { 
                            messages.map((message, key) =>

                            <div className="w-[50%] h-auto mb-[15px] flex items-center">
                                 <img src={"mbjaghou.jpeg"} alt="" className="w-[54px] rounded-full select-none"/>
                                 <div className="w-[auto] p-2 bg-black ml-[10px] rounded-full ">
                                    <p className="text-white ">{message.message}</p>
                                 </div>
                            </div>
                            )
                        }
                    </div>
                    <div className="w-[100%] h-[130px] absolute bottom-0 flex  justify-center">
                        <div className="w-[80%] h-[40%] bg-black rounded-full flex items-center justify-around">
                            <input
                                    value={inputValue}
                                    ref={inputRef}
                                    onChange={handleChange}
                                    onKeyDown={handleKeyPress}
                                    type="text"
                                    placeholder="Aa"
                                    className="text-white text-[13px] font-sora font-[700] flex items-center bg-transparent  border-none outline-none pl-[20px] w-[70%]"
                                    />
                            <button >
                                <IoMdSend color="white" className="w-[24px] h-[24px]"/>
                            </button>
                        </div>
                    </div>
            </div>
     );
}

export default Chat;