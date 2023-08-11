import { IoCheckmarkDoneOutline } from "react-icons/io5";
import {IoMdSend} from 'react-icons/io'
import { ChangeEvent, useState, useRef, useEffect} from "react";
import { RxCross2 } from "react-icons/rx";
import socket from '../../../chatSocket'
import Image from "next/image";

function Chat({setclickFriend, setFriendClicked, setonlyChat, friendchat, data} : any) {
    var check = true;
    var test12 = true;
    const [inputValue, setInputValue] = useState<any>('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<{
        username: string;
        message: string;
        read: boolean;
    }[]>([]);
    const [number, setnumber] = useState<number>(0);
    useEffect(() => {
        const fetchchat = async () =>
        {
            check = false;
            const oldmessages = await (
                await fetch('http://localhost:3000/chat/' + friendchat?.username, {
                    credentials: 'include',
                })
                ).json();
                const oldchat = oldmessages.map((message: any) => ({
                    username: message.sender_username,
                    message: message.message,
                    read: message.readAt ? true : false
                }));
                setMessages(oldchat)
        }
        if (check) 
        {
            fetchchat();
            socket.emit('read_message', friendchat?.username)
            socket.on('receive_message', (data: string) => {
              setMessages((prevMessages) => [
                  ...prevMessages,
                  { username: friendchat?.username, message: data, read:false },
              ]);
              socket.emit('read_message', friendchat?.username)
            })
            socket.on('mark_read', () => {
                setMessages( (prevMessages) => prevMessages.map( message => {
                    return {username: message.username, message: message.message, read: true }
                }))
            })
            socket.on('message_sent', (message: string) => {
               setMessages((prevMessages) => [
                ...prevMessages,
                { username: data.username, message: message, read:false }
               ])

            })
        }
        if (!test12)
            return () => {socket.off('receive_message');}
        else
            test12 = false
    }, [])
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
                 socket.emit("send_message", {
                username: friendchat.username,
                message: inputValue,
              });
            }
            setInputValue("");
            setnumber(0);
        };
        useEffect(() => {
          const container = containerRef.current;
          if (container)
              container.scrollTop = container.scrollHeight;
        }, [messages]);

        return ( 
            <div className={`w-[60%] 2xl:w-[57%] float-right xl:w-[95%] h-[100%] test5  ml-[10px] xl:ml-0 rounded-t-[10px] overflow-hidden relative`} >
                <div className="h-[50px] bg-[#070012]"></div>
                    <div className="w-[100%] h-auto test5 relative">
                            <button onClick={() => {setonlyChat(false); setclickFriend(false); setFriendClicked((prev: any) => prev == null)}} className="absolute right-0">
                                <RxCross2 color="white"  className="w-[23px] h-[23px]"/>
                            </button>
                            <div className="w-[65%] 2xl:w-[70%] xl:w-[75%] min-h-[84px] flex justify-center">
                                <div className="w-[20%] h-[84px] flex items-center justify-end">
                                        <Image width={'54'} height={'54'} src={friendchat?.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                                </div>
                                <div className="w-[70%] h-[84px] flex flex-col justify-center ml-[5px]">
                                    <h1 className="text-[13px] font-sora font-[600] text-[white]">{friendchat?.firstName + " " + friendchat?.lastName}</h1>
                                    <h1 className="text-[10px] font-sora font-[400] text-[#969696] ">{"@" + friendchat?.username}</h1>
                                </div>
                            </div>
                    </div>
                    <div className="w-[100%] max-h-[70%] absolute overflow-y-auto overflow-x-hidden" ref={containerRef}>
                        { 
                            messages.map((message, key) => {
                                if (message.username == data?.username)
                                {
                                    return  <div key={key} className={`w-[100%] p-7 pt-5 h-fit  mb-[15px] flex flex-row-reverse items-center`}>
                                            <Image width={'54'} height={'54'} src={data?.avatar} alt="" className="w-[54px] h-[54px] rounded-full select-none"/>
                                            <div className="max-w-[400px] 2xl:max-w-[300px] xl:max-w-[200px] bg-black p-2 mr-[20px] rounded-t-[28px] rounded-l-[28px] flex">
                                                <p className={"text-white text-[10px] font-sora mr-[5px] whitespace-wrap"}>{message.message}</p>
                                                {message.read && <IoCheckmarkDoneOutline className="mt-[3px] w-[20px] mr-[5px] text-[#14FF00] text-[10px] flex items-center font-sora self-center"/>}
                                            </div>
                                            </div>
                                }
                                else if (message.username == friendchat?.username)
                                {
                                    return  <div key={key} className={`w-[100%] pl-7 pt-5 h-fit  mb-[15px] flex  items-center relative`}>
                                            <Image width={'54'} height={'54'} src={friendchat?.avatar} alt="" className="w-[54px] h-[54px] rounded-full select-none"/>
                                            <div className="max-w-[400px] 2xl:max-w-[300px] xl:max-w-[200px] bg-black p-2 ml-[20px]  rounded-t-[28px] rounded-r-[28px]">
                                                <p className={`text-white text-[10px] font-sora whitespace-wrap `}>{message.message}</p>
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

export default Chat;