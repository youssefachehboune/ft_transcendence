import { IoMdSend } from "react-icons/io";
import { ChangeEvent, useState, KeyboardEvent, useRef, useEffect} from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { io } from "socket.io-client";
import {IoMdOptions} from 'react-icons/io'
import { BsPersonFillSlash } from "react-icons/bs";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

var socket : any;
function Chat_chanel({back, chanel, data}: any) {
    var check = true;
    var test12 = true;
    const [inputValue, setInputValue] = useState<any>('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [number, setnumber] = useState<number>(0);
    const [messages, setMessages] = useState<{
        avatar: string;
        message: string;
    }[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchchat = async () =>
        {
            check = false;
            const oldmessages = await (
                await fetch('http://localhost:3000/chat/room/' + chanel?.name, {
                    credentials: 'include',
                })
                ).json();
                const oldchat = oldmessages.map((message: any) => ({
                    avatar: message.avatar,
                    message: message.message,
                }));
                setMessages(oldchat)
        }
        if (check) 
        {
            socket = io('http://localhost:3000', {
                transports: ['websocket'],
                withCredentials: true,
              });
            fetchchat();
            socket.on('receive_channel_message', (data: {avatar: string, message: string}) => {
              setMessages((prevMessages) => [
                  ...prevMessages,
                  { avatar: data.avatar, message: data.message },
              ]);

            })
        }
        if (!test12)
            return () => {socket.close()}
        else
            test12 = false
    }, [])

    useEffect(() => {
        const container = containerRef.current;
        if (container)
            container.scrollTop = container.scrollHeight;
      }, [messages]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value =  e.target.value
          setInputValue(value);
          setnumber(value?.length);
        };
        const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleSendMessage();
            }
          };
        
          const handleSendMessage = () => {
            if (inputValue) {
                socket.emit('send_channel_message', { channel: chanel.name, message: inputValue})
            }
            setInputValue("");
            setnumber(0);
        };
    return ( 
        <div className={`w-[60%] 2xl:w-[57%] float-right xl:w-[95%] h-[100%] test5  ml-[10px] rounded-t-[10px] overflow-hidden relative`} >
            <div className="h-[50px] bg-[#070012]"></div>
                <div className="w-[100%] h-auto test5 relative">
                            <button onClick={() => {back(false)}} className="absolute right-0 hidden xl:block">
                                <RxCross2 color="white"  className="w-[23px] h-[23px]"/>
                            </button>
                        <div className="w-[65%] 2xl:w-[70%] xl:w-[75%] min-h-[84px] flex justify-center">
                            <div className="w-[20%] h-[84px] flex items-center justify-end">
                                    <img src={chanel?.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                            </div>
                            <div className="w-[70%] h-[84px] flex flex-col justify-center ml-[5px]">
                                <h1 className="text-[13px] font-sora font-[600] text-[white]">{chanel?.name}</h1>
                                <h1 className={`text-[10px] font-sora font-[400] text-[#ffffff] xl:w-[350px] 2xl:w-[370px]`}>{"@" + chanel?.descrption}</h1>
                                
                            </div>
                        </div>
                </div>
                <div className="w-[100%] max-h-[70%] absolute overflow-y-auto overflow-x-hidden" ref={containerRef}>
                    { 
                        messages.map((message, key) => {
                            if (message.avatar == data?.avatar)
                            {
                                return  <div key={key} className={`w-[100%] p-7 pt-5 h-fit  mb-[15px] flex flex-row-reverse items-center`}>
                                        <img src={data?.avatar} alt="" className="w-[54px] h-[54px] rounded-full select-none"/>
                                        <div className="max-w-[400px] 2xl:max-w-[300px] xl:max-w-[200px] bg-black p-2 mr-[20px] rounded-t-[28px] rounded-l-[28px] flex">
                                            <p className={"text-white text-[10px] font-sora mr-[5px]"}>{message.message}</p>
                                        </div>
                                        </div>
                            }
                            else
                            {
                                return  <div key={key} className={`w-[100%] pl-7 pt-5 h-fit  mb-[15px] flex  items-center relative`}>
                                        <img src={message.avatar} alt="" className="w-[54px] h-[54px] rounded-full select-none"/>
                                        <div className="max-w-[400px] 2xl:max-w-[300px] xl:max-w-[200px] bg-black p-2 ml-[20px]  rounded-t-[28px] rounded-r-[28px]">
                                            <p className={`text-white text-[10px] font-sora`}>{message.message}</p>
                                        </div>
                                        </div>
                            }
                            }

                        )
                    }
                </div>
                <div className="w-[100%] h-[20%]  absolute bottom-0 flex  justify-center items-center">
                    <div className="w-[80%] h-[20%] bg-black rounded-full flex items-center justify-around">
                        <input
                                value={inputValue}
                                ref={inputRef}
                                onChange={handleChange}
                                onKeyDown={handleKeyPress}
                                type="text"
                                placeholder="Aa"
                                maxLength={100}
                                className="text-white text-[13px] font-sora font-[700] flex items-center bg-transparent  border-none outline-none pl-[20px] w-[70%]"
                                />
                        <button className="flex items-center">
                            <h1 className="text-white text-[10px] font-sora">{number + "/100"}</h1>
                            <IoMdSend onClick={handleSendMessage} color="white" className="w-[24px] h-[24px] ml-[10px]"/>
                        </button>
                    </div>
                </div>
        </div>
 );
}

export default Chat_chanel;