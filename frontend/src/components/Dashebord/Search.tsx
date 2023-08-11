
import { VscSearch } from 'react-icons/vsc'
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react'
import { BsCheckLg, BsFillPersonPlusFill, BsPersonCheckFill, BsPersonFillSlash } from 'react-icons/bs';
import {BiGitPullRequest} from 'react-icons/bi'
import { Alert, AlertIcon } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import {RxCross2} from 'react-icons/rx'
import Image from "next/image";

interface block {
    block: boolean,
    notfriend: boolean,
    requsetd: boolean
}
function Search({menu, setListFriends}: any) {
    
    const [search, setsearch] = useState<string | undefined>("");
    const [showSearchfriend, setshowSearchfriend] = useState<boolean>(true)
    const [datasearch, setdatasearch] = useState<any>();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [sendRequest, setsendRequest] = useState<boolean>(true)
    const [deleteRequest, setdeleteRequest] = useState<boolean>(true)
    const searchref = useRef<HTMLInputElement | null>(null);
    const [checkrequest, setcheckrequest] = useState<any>();
    const [handelblock, sethandelblock] = useState<block>({
        block: true,
        notfriend: false,
        requsetd: false
    })
    const toast = useToast()

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);
    
    const handleClickOutside = (event: MouseEvent) => {
        if (searchref.current && !searchref.current.contains(event.target as Node)) {
            setshowSearchfriend(true);
        }
      };
    const handelsearchChanges = () =>
    {
        sethandelblock({block: true, notfriend: false, requsetd: false})
        setsendRequest(true)
        setdeleteRequest(true)
        setsearch(inputRef.current?.value)
        setshowSearchfriend(true)
    }
    useEffect(() => {
            if (search)
            {
                fetch('http://localhost:3000/search/' + search, { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {setdatasearch(data);}).then(() => 
                fetch('http://localhost:3000/friends/username/' + search, { credentials: "include" }).then((resp) => resp.text()).then((data) => {setcheckrequest(data)}).then(() => setshowSearchfriend(false))
                )
            }
    }, [search])
    const divtest = showSearchfriend ? `w-[100%] h-[100%] flex flex-col justify-center ${menu ? "items-start" : "items-center"} ` : `w-[100%] h-[250%] flex flex-col justify-center ${menu ? "items-start" : "items-center"}`
    const borderRaduis = showSearchfriend ? "rounded-[15px]" : "rounded-t-[15px]"
    return ( 
            <div className={`${menu ? "section" : "search xl:hidden"}`}>
            <div className={divtest} >
                <div className={`test5 w-[302px] h-[28px] ${borderRaduis} xl:w-[70%] flex justify-center items-center z-[11]`}>
                        <div className="mr-[5px]">
                            <VscSearch className="w-[12px] h-[12px]" color="white" />
                        </div>
                        <input
                            ref={inputRef}
                            onChange={handelsearchChanges}
                            type="text"
                            placeholder="You can add your friend with their username."
                            className="text-white text-[8px] font-sora font-[300] flex items-center bg-transparent  border-none outline-none pl-[20px] w-[70%]"
                            />
                </div>
                        {!showSearchfriend && 
                            <div className="w-[302px] h-[76px] xl:w-[70%] test5 rounded-b-[15px]  z-[10]" ref={searchref} >
                                       { 
                                        !datasearch?.message ? (
                                            <div  className="w-[100%] min-h-[65px] text-white flex justify-between overflow-hidden">
                                            <div className="w-[100%] flex items-center ml-[15%]">
                                                <Image width={'54'} height={'54'} src={datasearch?.avatar} alt="" className="w-[54px] xl:w-[40px] rounded-full"/>
                                                <div className="w-[120px] xl:w-[140px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                                                    <h1 className="text-[7px] xl:text-[5px] font-sora font-[600] text-[white] ">{datasearch?.firstName + " " +  datasearch?.lastName}</h1>
                                                    <h1 className="text-[7px] xl:text-[5px] font-sora font-[600] text-[white] ">{"@" + datasearch?.username}</h1>
                                                </div>
                                                    { 
                                                        datasearch?.friendShipStatus === "NOTFRIENDS" ? (
                                                            <button onClick={() => {
                                                            if (sendRequest)
                                                            {
                                                                setsendRequest(!sendRequest)
                                                                toast({
                                                                    title: `request sent successfully`,
                                                                    position: 'top-right',
                                                                    status: 'success',
                                                                    duration: 9000,
                                                                    isClosable: true,
                                                                })
                                                                fetch("http://localhost:3000/friends/REQUEST/" + datasearch?.username, { credentials: "include", method: "POST"})
                                                                
                                                            }
                                                            else if (!sendRequest)
                                                            {
                                                                setsendRequest(!sendRequest)
                                                                toast({
                                                                    title: `remove request`,
                                                                    position: 'top-right',
                                                                    status: 'success',
                                                                    duration: 9000,
                                                                    isClosable: true,
                                                                  })
                                                                fetch("http://localhost:3000/friends/REMOVE/" + datasearch?.username, { credentials: "include", method: "POST"})
                                                            }
                                                                
                                                            }
                                                                } className={`w-[111px] xl:ml-[-70px] ${sendRequest ? "bg-[#2F313D] hover:bg-[#00DAEA]" : "bg-[#5ACDA4]"} h-[24px] self-end mr-[15%] rounded-[4px] flex justify-center items-center`}>
                                                                {sendRequest && <h1 className='text-[7px] font-[400] font-sora flex items-center mr-[-5px]'><BsFillPersonPlusFill className='mr-[5px]'/>Send Request</h1>}
                                                                {!sendRequest && <h1 className='text-[7px] font-[400] font-sora flex items-center mr-[-5px]'><BiGitPullRequest className='mr-[5px]'/>Requested</h1>}
                                                                </button>
                                                        ) : datasearch?.friendShipStatus === "FRIENDS" ? (
                                                            <button className="w-[111px] xl:ml-[-60px] xl:w-[95px] h-[24px] bg-[#00DAEA] self-end mr-[15%] rounded-[4px] flex justify-center items-center">
                                                                <h1 className='text-[7px] font-[400] font-sora flex items-center mr-[-5px]'><BsPersonCheckFill className='mr-[5px]'/>Friends</h1>
                                                            </button>
                                                        ) : datasearch?.friendShipStatus === "REQUESTED" &&  checkrequest == "SentRequest" ?
                                                        (
                                                            <button onClick={() => {
                                                                if (deleteRequest)
                                                                {
                                                                    setdeleteRequest(!deleteRequest)
                                                                    toast({
                                                                        title: `remove request`,
                                                                        position: 'top-right',
                                                                        status: 'success',
                                                                        duration: 9000,
                                                                        isClosable: true,
                                                                      })
                                                                    fetch("http://localhost:3000/friends/REMOVE/" + datasearch?.username, { credentials: "include", method: "POST"})
                                                                }
                                                                    
                                                                else if (!deleteRequest)
                                                                {
                                                                    setdeleteRequest(!deleteRequest)
                                                                    toast({
                                                                        title: `request sent successfully`,
                                                                        position: 'top-right',
                                                                        status: 'success',
                                                                        duration: 9000,
                                                                        isClosable: true,
                                                                      })
                                                                    fetch("http://localhost:3000/friends/REQUEST/" + datasearch?.username, { credentials: "include", method: "POST"})
                                                                }
                                                                }
                                                                } 
                                                                className={`w-[111px] xl:ml-[-70px] ${!deleteRequest ? "bg-[#2F313D] hover:bg-[#00DAEA]" : "bg-[#5ACDA4]"} h-[24px] self-end mr-[15%] rounded-[4px] flex justify-center items-center`}>
                                                                {deleteRequest && <h1 className='text-[7px] font-[400] font-sora flex items-center mr-[-5px]'><BiGitPullRequest className='mr-[5px]'/>Requested</h1>}
                                                                {!deleteRequest && <h1 className='text-[7px] font-[400] font-sora flex items-center mr-[-5px]'><BsFillPersonPlusFill className='mr-[5px]'/>Send Request</h1>}
                                                            </button>
                                                        ): datasearch?.friendShipStatus === "BLOCKED" && checkrequest == "BLOCKED" ?
                                                        (
                                                            handelblock.block && !handelblock.notfriend && !handelblock.requsetd ?
                                                            (
                                                                <button onClick={() => {
                                                                    sethandelblock({block: false, notfriend: true, requsetd: false})
                                                                    toast({
                                                                        title: `The user has been unblocked successfully.`,
                                                                        position: 'top-right',
                                                                        status: 'success',
                                                                        duration: 9000,
                                                                        isClosable: true,
                                                                      })
                                                                    fetch("http://localhost:3000/friends/UNBLOCK/" + datasearch?.username, { credentials: "include", method: "POST"})
                                                                    
                                                                }} className={`w-[111px] xl:ml-[-70px] bg-[red] h-[24px] self-end mr-[15%] rounded-[4px] flex justify-center items-center`}>
                                                                    <h1 className='text-[7px] font-[400] font-sora flex items-center mr-[-5px]'><BsPersonFillSlash className='mr-[5px]'/>unblock</h1>
                                                                </button>
                                                            ): !handelblock.block && handelblock.notfriend && !handelblock.requsetd ?  (
                                                                <button onClick={() =>
                                                                    {
                                                                        sethandelblock({block: false, notfriend: false, requsetd: true})
                                                                        toast({
                                                                            title: `request sent successfully`,
                                                                            position: 'top-right',
                                                                            status: 'success',
                                                                            duration: 9000,
                                                                            isClosable: true,
                                                                          })
                                                                        fetch("http://localhost:3000/friends/REQUEST/" + datasearch?.username, { credentials: "include", method: "POST"})
                                                                    }
                                                                } className={`w-[111px] xl:ml-[-70px] hover:bg-[#00DAEA]" bg-[#5ACDA4] hover:bg-[#00DAEA] h-[24px] self-end mr-[15%] rounded-[4px] flex justify-center items-center`}>
                                                                    <h1 className='text-[7px] font-[400] font-sora flex items-center mr-[-5px]'><BsFillPersonPlusFill className='mr-[5px]'/>Send Request</h1>
                                                                </button>
                                                            ) : !handelblock.block && !handelblock.notfriend && handelblock.requsetd ? (
                                                                <button onClick={() => 
                                                                    {
                                                                        sethandelblock({block: false, notfriend: true, requsetd: false})
                                                                        toast({
                                                                            title: `remove request`,
                                                                            position: 'top-right',
                                                                            status: 'success',
                                                                            duration: 9000,
                                                                            isClosable: true,
                                                                          })
                                                                        fetch("http://localhost:3000/friends/REMOVE/" + datasearch?.username, { credentials: "include", method: "POST"})
                                                                    }
                                                                } className={`w-[111px] xl:ml-[-70px] hover:bg-[#00DAEA]" bg-[#5ACDA4] h-[24px] self-end mr-[15%] rounded-[4px] flex justify-center items-center`}>
                                                                    <h1 className='text-[7px] font-[400] font-sora flex items-center mr-[-5px]'><BiGitPullRequest className='mr-[5px]'/>Requested</h1>
                                                                </button>
                                                            ) : null
                                                        ):  datasearch?.friendShipStatus === "REQUESTED" &&  checkrequest == "ReceivedRequest" ?
                                                        (
                                                            <div className='w-[100px] h-[50px] flex'>
                                                                <button onClick={() => {
                                                                        setshowSearchfriend(true)
                                                                        setListFriends((prev: any) => [...prev, datasearch])
                                                                        toast({
                                                                            title: `accept`,
                                                                            position: 'top-right',
                                                                            status: 'success',
                                                                            duration: 9000,
                                                                            isClosable: true,
                                                                        })
                                                                        fetch("http://localhost:3000/friends/ACCEPT/" + datasearch?.username, { credentials: "include", method: "POST"})
                                                                    }
                                                                    } 
                                                                    className={`w-[20px] xl:ml-[-30px] ${!deleteRequest ? "bg-[#2F313D] hover:bg-[#00DAEA]" : "bg-[#5ACDA4]"} h-[20px] self-end mr-[15%] rounded-[4px] flex justify-center items-center`}>
                                                                    <BsCheckLg className='text-[7px] font-[400] font-sora flex items-center'/>
                                                                </button>
                                                                <button onClick={() => {
                                                                    setshowSearchfriend(true)
                                                                    toast({
                                                                        title: `reject`,
                                                                        position: 'top-right',
                                                                        status: 'success',
                                                                        duration: 9000,
                                                                        isClosable: true,
                                                                    })
                                                                    fetch("http://localhost:3000/friends/REJECT/" + datasearch?.username, { credentials: "include", method: "POST"})     
                                                                    }
                                                                    } 
                                                                    className={`w-[20px] ${!deleteRequest ? "bg-[#2F313D] hover:bg-[#00DAEA]" : "bg-[#cd3a3a]"} h-[20px] self-end mr-[15%] rounded-[4px] flex justify-center items-center`}>
                                                                    <RxCross2 className='text-[7px] font-[400] font-sora flex items-center'/>
                                                                </button>
                                                            </div>
                                                            
                                                        ): null
                                                    }
                                            </div>
                                            </div>

                                        ): (
                                            <div  className="w-[100%] min-h-[65px] flex items-center justify-center overflow-hidden">
                                            <h1 className='text-white text-[15px] font-sora font-[700]'>Not Found</h1>
                                            </div>
                                        )
                                        } 
                                </div>
                        }
            </div>
        </div>
     );
}

export default Search;