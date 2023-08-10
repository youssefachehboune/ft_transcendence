import { useEffect, useRef, useState } from "react";
import { HiUserAdd } from "react-icons/hi";
import Image from "next/image";
import socket from '../../../../pages/chatSocket'

function Join_channels({data, user, setpublic_channel, setmychanel}: any) {
      
    const [type, settype] = useState<string>('')
    const [enterpassword, setenterpassword] = useState<boolean>(true)
    const [checkpassword, setcheckpassword] = useState<boolean>(false)
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const truncateDescription = (description: string) => {
        return description.length > 20 ? description.substring(0, 20) + "..." : description;
    };
    useEffect(() => {
        const fetchData = async () => {
          try {
            const typeResponse = await fetch(`http://localhost:3000/channel/type/${user.name}/${data.username}`, { credentials: "include" });
            const typeData = await typeResponse.text();
            settype(typeData);
          } catch (error) {
            console.log("error: " + error)
          }
        };
        fetchData();
      }, []);

    const handlePublicClick = () => {
        const newChannel = {
            avatar: user.avatar,
            name: user.name,
            description: user.description,
            password: user.password,
            type: user.typechanel,
        };
        socket.emit('add_channel', user.name);
        setmychanel((prevChannels: any) => [...prevChannels, newChannel]);
        setpublic_channel((prevpublic_channel: any) => prevpublic_channel.filter((public_channel: any) => public_channel.name !== user.name));
        const data : {name: string, password: string | undefined | null} = {name: user.name, password: user.password};
        fetch(`http://localhost:3000/channel/user/join`, {
            credentials: "include",
            method: 'PUT',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
      };
      const handle_send_request_Private_chanel = () => {
        settype("REQUESTED")
        const data : {name: string, password: string | undefined | null} = {name: user.name, password: user.password};
        fetch(`http://localhost:3000/channel/user/join`, {
            credentials: "include",
            method: 'PUT',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
      };
      const handle_cancel_request_Private_chanel = () => {
        settype("NOTMEMBER")
        const data : {name: string, password: string | undefined | null} = {name: user.name, password: user.password};
        fetch(`http://localhost:3000/channel/user/cancel`, {
            credentials: "include",
            method: 'PUT',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
      };
      const handel_password = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const data : {name: string, password: string | undefined | null} = {name: user.name, password: passwordRef.current?.value};
        if (event.key === "Enter") {
            fetch(`http://localhost:3000/channel/user/join`, {
                credentials: "include",
                method: 'PUT',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify(data),
              }).then((data) => data.json()).then((data) => 
              {
                  if (data.success)
                  {
                      socket.emit('add_channel', user.name);
                      setenterpassword(true)
                      const newChannel = {
                          avatar: user.avatar,
                          name: user.name,
                          description: user.description,
                          password: user.password,
                          type: user.typechanel,
                      };
                      setmychanel((prevChannels: any) => [...prevChannels, newChannel]);
                      setpublic_channel((prevpublic_channel: any) => prevpublic_channel.filter((public_channel: any) => public_channel.name !== user.name));
                  }
                  else
                    setcheckpassword(true)
              }
              );

        }
      };
    return ( 
        <div className="w-[100%] min-h-[61px] flex  gap-2">
            <div className={`w-[100%] flex items-center  rounded-l-[6px]`}>
            <div className="w-[75px] h-[70px] flex justify-center items-center relative">
                    <Image width={'54'} height={'54'} src={user.avatar} alt="" className="w-[54px] rounded-full select-none"/>
            </div>
            <div className="w-[200px] h-[100%] flex flex-col justify-center items-start ml-[3%]">
                <h1 className={`text-[13px] font-sora font-[600] text-[#ffffff]`}>{user.name}</h1>
                <h1 className={`text-[10px] font-sora font-[400] text-[#ffffff]`}>{truncateDescription(user.description)}</h1>
            </div>
            </div>
            {
                user.type == "PRIVATE" ? 
                (
                    <>
                        {
                            (type == "NOTMEMBER" || !type) && 
                            <button onClick={handle_send_request_Private_chanel} className={`w-[130px] bg-[#14FF00] h-[24px] self-center  rounded-[4px] flex justify-center items-center`}>
                                <h1 className='text-[10px] font-[400] font-sora flex items-center mr-[-5px]'><HiUserAdd className='mr-[5px]'/>send request</h1>
                            </button>
                        }
                        {
                            type == "REQUESTED" && 
                            <button onClick={handle_cancel_request_Private_chanel}  className={`w-[130px] bg-[#7f7e80] h-[24px] self-center  rounded-[4px] flex justify-center items-center`}>
                                <h1 className='text-[10px] font-[400] font-sora flex items-center mr-[-5px]'><HiUserAdd className='mr-[5px]'/>requested</h1>
                            </button>
                        }
        
                    </>
                ) : user.type == "PUBLIC" ? 
                (
                    <button onClick={handlePublicClick} className={`w-[130px] bg-[#14FF00] h-[24px] self-center  rounded-[4px] flex justify-center items-center`}>
                        <h1 className='text-[10px] font-[400] font-sora flex items-center mr-[-5px]'><HiUserAdd className='mr-[5px]'/>join</h1>
                    </button>
                ) : user.type == "PROTECTED" ? 
                (
                    <>
                    {
                        enterpassword && 
                        <button onClick={() => setenterpassword(!enterpassword)}  className={`w-[130px] bg-[#14FF00] h-[24px] self-center  rounded-[4px] flex justify-center items-center`}>
                            <h1 className='text-[10px] font-[400] font-sora flex items-center mr-[-5px]'><HiUserAdd className='mr-[5px]'/>Enter password</h1>
                        </button>
                    }
                    {
                        !enterpassword &&
                            <input ref={passwordRef} onKeyDown={handel_password} type="password" placeholder={"Enter your password"} className={`w-[130px] p-1 bg-[#ebf0ea] outline-0 ${checkpassword ? "border-[red]" : "border-[#0a0a0a]"} border-solid  border-[2px] font-sora text-[10px] font-[400]  text-black  h-[30px] self-center  rounded-[5px]`}/>
                    }
                    </>
                ): null
            }
        </div>
     );
}

export default Join_channels;