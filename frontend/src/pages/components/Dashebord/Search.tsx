
import { VscSearch } from 'react-icons/vsc'
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react'
import { BsCheckLg, BsFillPersonPlusFill, BsPersonCheckFill, BsPersonFillSlash } from 'react-icons/bs';
import {BiGitPullRequest} from 'react-icons/bi'
import { Alert, AlertIcon } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'

interface block {
    block: boolean,
    notfriend: boolean,
    requsetd: boolean
}
function Search() {
    
    const [search, setsearch] = useState<string | undefined>("");
    const [showSearchfriend, setshowSearchfriend] = useState<boolean>(true)
    const [datasearch, setdatasearch] = useState<any>();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [sendRequest, setsendRequest] = useState<boolean>(true)
    const [deleteRequest, setdeleteRequest] = useState<boolean>(true)
    const searchref = useRef<HTMLInputElement | null>(null);
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
                fetch('http://localhost:3000/search/' + search, { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {setdatasearch(data);}).then(() => setshowSearchfriend(false))
    }, [search])
    const divtest = showSearchfriend ? "w-[100%] h-[100%] flex flex-col justify-center items-center" : "w-[100%] h-[250%] flex flex-col justify-center items-center"
    const borderRaduis = showSearchfriend ? "rounded-[15px]" : "rounded-t-[15px]"
    return ( 
            <div className="search ">
            <div className={divtest} >
                <div className={`test5 w-[302px] h-[28px] ${borderRaduis} flex justify-center items-center z-[11]`}>
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
                            <div className="w-[302px] h-[76px] test5 rounded-b-[15px]  z-[10]" ref={searchref} >
                                       { 
                                        !datasearch?.message ? (
                                            <div  className="w-[100%] min-h-[65px] text-white flex justify-between overflow-hidden">
                                            <div className="w-[100%] flex items-center ml-[15%]">
                                                <img src={datasearch?.avatar} alt="" className="w-[54px] rounded-full"/>
                                                <div className="w-[120px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                                                    <h1 className="text-[7px] font-sora font-[600] text-[white] ">{datasearch?.firstName + " " +  datasearch?.lastName}</h1>
                                                    <h1 className="text-[7px] font-sora font-[600] text-[white] ">{"@" + datasearch?.username}</h1>
                                                </div>
                                                    { 
                                                        datasearch?.friendShipStatus === "NOTFRIENDS" ? (
                                                            <button onClick={() => {
                                                            if (sendRequest)
                                                            {
                                                                fetch("http://localhost:3000/friends/REQUEST/" + datasearch?.username, { credentials: "include", method: "POST"}).then(() => setsendRequest(!sendRequest)).then(() => 
                                                                    toast({
                                                                        title: `request sent successfully`,
                                                                        position: 'top-right',
                                                                        status: 'success',
                                                                        duration: 9000,
                                                                        isClosable: true,
                                                                    })
                                                                )
                                                            }
                                                            else if (!sendRequest)
                                                                fetch("http://localhost:3000/friends/REMOVE/" + datasearch?.username, { credentials: "include", method: "POST"}).then(() => setsendRequest(!sendRequest)).then(() => 
                                                                toast({
                                                                    title: `remove request`,
                                                                    position: 'top-right',
                                                                    status: 'success',
                                                                    duration: 9000,
                                                                    isClosable: true,
                                                                  })
                                                                )
                                                            }
                                                                } className={`w-[111px] ${sendRequest ? "bg-[#2F313D] hover:bg-[#00DAEA]" : "bg-[#5ACDA4]"} h-[24px] self-end mr-[15%] rounded-[4px] flex justify-center items-center`}>
                                                                {sendRequest && <h1 className='text-[7px] font-[400] font-sora flex items-center mr-[-5px]'><BsFillPersonPlusFill className='mr-[5px]'/>Send Request</h1>}
                                                                {!sendRequest && <h1 className='text-[7px] font-[400] font-sora flex items-center mr-[-5px]'><BiGitPullRequest className='mr-[5px]'/>Requested</h1>}
                                                                </button>
                                                        ) : datasearch?.friendShipStatus === "FRIENDS" ? (
                                                            <button className="w-[111px] h-[24px] bg-[#00DAEA] self-end mr-[15%] rounded-[4px] flex justify-center items-center">
                                                                <h1 className='text-[7px] font-[400] font-sora flex items-center mr-[-5px]'><BsPersonCheckFill className='mr-[5px]'/>Friends</h1>
                                                            </button>
                                                        ) : datasearch?.friendShipStatus === "REQUESTED" ?
                                                        (
                                                            <button onClick={() => {
                                                                if (deleteRequest)
                                                                    fetch("http://localhost:3000/friends/REMOVE/" + datasearch?.username, { credentials: "include", method: "POST"}).then(() => setdeleteRequest(!deleteRequest)).then(() => 
                                                                    toast({
                                                                        title: `remove request`,
                                                                        position: 'top-right',
                                                                        status: 'success',
                                                                        duration: 9000,
                                                                        isClosable: true,
                                                                      })
                                                                    )
                                                                else if (!deleteRequest)
                                                                {
                                                                    fetch("http://localhost:3000/friends/REQUEST/" + datasearch?.username, { credentials: "include", method: "POST"}).then(() => setdeleteRequest(!deleteRequest)).then(() =>
                                                                    toast({
                                                                        title: `request sent successfully`,
                                                                        position: 'top-right',
                                                                        status: 'success',
                                                                        duration: 9000,
                                                                        isClosable: true,
                                                                      })
                                                                    )
                                                                }
                                                                }
                                                                } 
                                                                className={`w-[111px] ${!deleteRequest ? "bg-[#2F313D] hover:bg-[#00DAEA]" : "bg-[#5ACDA4]"} h-[24px] self-end mr-[15%] rounded-[4px] flex justify-center items-center`}>
                                                                {deleteRequest && <h1 className='text-[7px] font-[400] font-sora flex items-center mr-[-5px]'><BiGitPullRequest className='mr-[5px]'/>Requested</h1>}
                                                                {!deleteRequest && <h1 className='text-[7px] font-[400] font-sora flex items-center mr-[-5px]'><BsFillPersonPlusFill className='mr-[5px]'/>Send Request</h1>}
                                                            </button>
                                                        ): datasearch?.friendShipStatus === "BLOCKED" ?
                                                        (
                                                            handelblock.block && !handelblock.notfriend && !handelblock.requsetd ?
                                                            (
                                                                <button onClick={() => {
                                                                    fetch("http://localhost:3000/friends/UNBLOCK/" + datasearch?.username, { credentials: "include", method: "POST"}).then(() => sethandelblock({block: false, notfriend: true, requsetd: false})).then(() => 
                                                                    toast({
                                                                        title: `The user has been unblocked successfully.`,
                                                                        position: 'top-right',
                                                                        status: 'success',
                                                                        duration: 9000,
                                                                        isClosable: true,
                                                                      })
                                                                    )
                                                                }} className={`w-[111px] bg-[red] h-[24px] self-end mr-[15%] rounded-[4px] flex justify-center items-center`}>
                                                                    <h1 className='text-[7px] font-[400] font-sora flex items-center mr-[-5px]'><BsPersonFillSlash className='mr-[5px]'/>unblock</h1>
                                                                </button>
                                                            ): !handelblock.block && handelblock.notfriend && !handelblock.requsetd ?  (
                                                                <button onClick={() =>
                                                                    fetch("http://localhost:3000/friends/REQUEST/" + datasearch?.username, { credentials: "include", method: "POST"}).then(() => sethandelblock({block: false, notfriend: false, requsetd: true})).then(() =>
                                                                    toast({
                                                                        title: `request sent successfully`,
                                                                        position: 'top-right',
                                                                        status: 'success',
                                                                        duration: 9000,
                                                                        isClosable: true,
                                                                      })
                                                                    )
                                                                } className={`w-[111px]  hover:bg-[#00DAEA]" bg-[#5ACDA4] hover:bg-[#00DAEA] h-[24px] self-end mr-[15%] rounded-[4px] flex justify-center items-center`}>
                                                                    <h1 className='text-[7px] font-[400] font-sora flex items-center mr-[-5px]'><BsFillPersonPlusFill className='mr-[5px]'/>Send Request</h1>
                                                                </button>
                                                            ) : !handelblock.block && !handelblock.notfriend && handelblock.requsetd ? (
                                                                <button onClick={() => 
                                                                    fetch("http://localhost:3000/friends/REMOVE/" + datasearch?.username, { credentials: "include", method: "POST"}).then(() => sethandelblock({block: false, notfriend: true, requsetd: false})).then(() =>
                                                                    toast({
                                                                        title: `remove request`,
                                                                        position: 'top-right',
                                                                        status: 'success',
                                                                        duration: 9000,
                                                                        isClosable: true,
                                                                      })
                                                                    )
                                                                } className={`w-[111px]  hover:bg-[#00DAEA]" bg-[#5ACDA4] h-[24px] self-end mr-[15%] rounded-[4px] flex justify-center items-center`}>
                                                                    <h1 className='text-[7px] font-[400] font-sora flex items-center mr-[-5px]'><BiGitPullRequest className='mr-[5px]'/>Requested</h1>
                                                                </button>
                                                            ) : null
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