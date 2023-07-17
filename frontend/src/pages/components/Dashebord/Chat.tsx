import { IoArrowBackCircle, IoCheckmarkDoneOutline } from "react-icons/io5";
import {IoMdSend} from 'react-icons/io'
import { ChangeEvent, useState, KeyboardEvent, useRef, useEffect} from "react";
import { io } from "socket.io-client";


function Chat({setonlyChat, friendchat, data} : any) {
    var check = true;
    const [inputValue, setInputValue] = useState<any>('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<{
        username: string;
        message: string;
        read: boolean;
    }[]>([]);
    
    const socket = io('http://localhost:3000', {
      transports: ['websocket'],
      withCredentials: true,
    });
    socket.on('receive_message', (data: string) => {
      setMessages((prevMessages) => [
          ...prevMessages,
          { username: friendchat?.username, message: data, read:false },
      ]);
      socket.emit('read_message', friendchat.username)
    })
    socket.on('mark_read', () => {
        setMessages( (prevMessages) => prevMessages.map( message => {
            return {username: message.username, message: message.message, read: true }
        }))
	})
  useEffect(() => {
        const fetchchat = async () =>
        {
            socket.emit('read_message', friendchat.username)
            check = false;
            const oldmessages = await (
                await fetch('http://localhost:3000/chat/' + friendchat.username, {
                  credentials: 'include',
                })
              ).json();
              const oldchat = oldmessages.map((message: any) => ({
                username: message.sender_username,
                message: message.message,
                read: true
              }));
              setMessages(oldchat)
        }
        if (check) fetchchat();
      
        return () => {
            socket.disconnect();
          };
  }, [])
      
      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          setInputValue(inputRef.current?.value);
        };

        const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (inputValue)
                {
                    socket.emit('send_message', {username: friendchat?.username, message: inputValue});
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { username: data?.username, message: inputValue, read:false },
                    ]);
                }
                setInputValue('');
            };
        }
        useEffect(() => {
          const container = containerRef.current;
          if (container)
              container.scrollTop = container.scrollHeight;
        }, [messages]);
        return ( 
            <div className={`w-[60%] 2xl:w-[60%] float-right xl:w-[100%] h-[100%] test5  ml-[10px] xl:ml-0 rounded-t-[10px] overflow-hidden relative`} >
                <div className="h-[50px] bg-[#070012]"></div>
                    <div className="w-[100%] h-auto test5 relative">
                            <button onClick={() =>setonlyChat(false)} className="absolute">
                                <IoArrowBackCircle color="white"  className="w-[20px] h-[20px]"/>
                            </button>
                            <div className="w-[50%] min-h-[84px] flex justify-center">
                                <div className="w-[20%] h-[84px] flex items-center justify-end">
                                        <img src={friendchat?.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                                        <div className={`w-[12px] h-[12px] bg-[#14FF00] mt-[45px] ml-[30px] rounded-full absolute`}></div>
                                </div>
                                <div className="w-[70%] h-[84px] flex flex-col justify-center ml-[5px]">
                                    <h1 className="text-[13px] font-sora font-[600] text-[white]">{friendchat?.full_name}</h1>
                                    <h1 className="text-[10px] font-sora font-[400] text-[#969696] ">{"@" + friendchat?.username}</h1>
                                </div>
                            </div>
                    </div>
                    <div className="w-[100%] max-h-[70%] absolute overflow-y-auto overflow-x-hidden" ref={containerRef}>
                        { 
                            messages.map((message, key) => {
                                if (message.username == data?.username)
                                {
                                    return  <div key={key} className={`w-[100%] p-7 pt-5 h-fit  mb-[15px] flex flex-row-reverse items-center relative`}>
                                            <img src={data?.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                                            <div className="max-w-[500px] bg-black p-2 mr-[20px] rounded-t-[28px] rounded-l-[28px]">
                                                <p className={"text-white"}>{message.message}</p>
                                            </div>
                                                {message.read && <p className="text-white absolute mt-[70px] mr-[80px] text-[10px] flex items-center font-sora"><IoCheckmarkDoneOutline className="mt-[3px] mr-[5px] text-[#14FF00]"/>read</p>}
                                            </div>
                                }
                                else if (message.username == friendchat?.username)
                                {
                                    return  <div key={key} className={`w-[100%] pl-7 pt-5 h-fit  mb-[15px] flex  items-center relative`}>
                                            <img src={friendchat?.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                                            <div className="max-w-[500px] bg-black p-2 ml-[20px]  rounded-t-[28px] rounded-r-[28px]">
                                                <p className={`text-white`}>{message.message}</p>
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
                                    className="text-white text-[13px] font-sora font-[700] flex items-center bg-transparent  border-none outline-none pl-[20px] w-[70%]"
                                    />
                            <button>
                                <IoMdSend color="white" className="w-[24px] h-[24px]"/>
                            </button>
                        </div>
                    </div>
            </div>
     );
}

export default Chat;