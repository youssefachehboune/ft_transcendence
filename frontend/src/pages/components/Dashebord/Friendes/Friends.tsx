import Link from "next/link";
import { useState, KeyboardEvent, useEffect, useRef } from "react";
import { VscSearch } from "react-icons/vsc";
import Profile_Frined from "../Profile_Frined";
import Friend from "./Friend";
import { Button, Menu, MenuButton, MenuItem, MenuList, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { FaBan, FaGamepad } from "react-icons/fa";


function Friends({setListFriends, friendsloding, ListFriends, setshowchatsection, setonlyChat} : any) { 
    const [visible, setvisible] = useState<boolean>(false);
    const [block, setblock] = useState<boolean>(true);
    const [searchfriend, setsearchfriend] = useState<string | undefined>("");
    const [datafriend, setdatafriend] = useState<any>();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [Profile , setProfile] = useState<any>();
    const [profileloding, setprofileloding] = useState<boolean>(false)
    const [clickFriend, setclickFriend] = useState<boolean>(false)
    const [friendClicked, setFriendClicked] = useState<number | null>(null);

    useEffect(() => {
        if (searchfriend)
            fetch('http://localhost:3000/search/' + searchfriend, { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {setdatafriend(data);})
    }, [searchfriend])

    const handelsearchChanges = () =>
    {
        setclickFriend(false)
        setsearchfriend(inputRef.current?.value);
    }
    const handelclick = (user: any , action: string) =>
    {
        setFriendClicked(null);
        setdatafriend(null);
        setListFriends((prevfriend: any) => prevfriend.filter((friend: any) => friend.username !== user.username));
        setvisible(false)
        fetch(`http://localhost:3000/friends/${action}/` + user.username, { credentials: "include", method: "POST"});
    }
    return (
        <div className="cont overflow-hidden flex gap-[10px] h-[100%]" >
            <div className={`w-[40%] ${visible ? "xl:w-[0%] 2xl:w-[55%]" : "xl:w-[95%] xl:ml-2 2xl:w-[55%] 2xl:ml-2"} h-[100%] test5 flex flex-col items-center overflow-y-auto rounded-[10px]`}>
                                    <div className="w-[100%] h-auto flex flex-col items-center">
                                        <div className={`test5 w-[50%] h-[28px] flex justify-center items-center rounded-[15px] mt-[20px]`}>
                                            <div className="mr-[-5px]">
                                                <VscSearch className="w-[12px] h-[12px]" color="white" />
                                            </div>
                                            <input
                                                ref={inputRef}
                                                onChange={handelsearchChanges}
                                                type="text"
                                                placeholder="Search friends"
                                                className="text-white text-[8px] font-sora font-[300] flex items-center bg-transparent  border-none outline-none pl-[20px] w-[70%]"
                                                />
                                            </div>
                                            <div className="w-[100%] h-[30px] mt-[20px] flex justify-center items-center">
                                                    <Skeleton isLoaded={friendsloding}>
                                                        <h1 className="font-[700] font-sora text-[11px] text-white">{`${ListFriends?.length} Friends`}</h1>
                                                    </Skeleton>
                                            </div>
                                    </div>
                                        <div className="w-[100%] h-[100%] gap-[10px] flex flex-col">
                                            {
                                                !friendsloding &&
                                                        Array.from(Array(8)).map((i) => (
                                                        <div key={i} className="w-[100%] h-[70px] ml-[15%] flex items-center overflow-hidden">
                                                                        <SkeletonCircle size={'54px'} ></SkeletonCircle>
                                                                        <SkeletonText width={'40'} ml={'10px'}></SkeletonText>
                                                        </div>))
                                            }
                                            {ListFriends?.length == 0 && 
                                                        <div className="text-white text-[15px] font-sora font-[700] text-center">you don't have friends</div>
                                            }
                                            {
                                                searchfriend === "" && friendsloding ? (
                                                    ListFriends?.map((user: any, index: any) => (
                                                        <Friend setListFriends={setListFriends}  index={index} changecolor={friendClicked === index} setchangecolor={setFriendClicked} user={user} setblock={setblock} setvisible={setvisible} setprofileloding={setprofileloding} setProfile={setProfile}/>
                                                ))) : searchfriend && !datafriend?.message && datafriend?.friendShipStatus == "FRIENDS" ? (
                                                    <div  className="min-h-[61px] flex items-center">
                                                            <button onClick={ () => {
                                                                setvisible(true);
                                                                setprofileloding(false)
                                                                setclickFriend(true)
                                                                fetch('http://localhost:3000/profile/' + datafriend.username , { credentials: "include" }).then((resp) => { return resp.json(); }).then((data) => {setProfile(data);setprofileloding(true);})
                                                                }} className={`w-[80%] flex items-center justify-center rounded-l-[6px] ${clickFriend ? "bg-[#00DAEA]" : ""}`}>
                                                                <div className="w-[75px] h-[70px] flex justify-center items-center relative">
                                                                    <img src={datafriend.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                                                                    <div className={`w-[12px] h-[12px] bg-[#14FF00] mt-[45px] ml-[30px] rounded-full absolute`}></div>
                                                                </div>
                                                                <div className="w-[200px] h-[100%] flex flex-col justify-center items-start ml-[3%]">
                                                                    <h1 className={`text-[13px] font-sora font-[600] text-[white] ${clickFriend ? "text-black" : ""}`}>{datafriend.firstName + " " + datafriend.lastName}</h1>
                                                                    <h1 className={`text-[10px] font-sora font-[400] text-[#969696] ${clickFriend ? "text-black" : ""}`}>{"@" + datafriend.username}</h1>
                                                                </div>
                                                            </button>
                                                            <Menu>
                                                            <MenuButton height={'full'} roundedRight={'6px'} transition={'none'} background={`${clickFriend ? "#00DAEA": ""}`} textColor={`${clickFriend ? "text-black": "white"}`} roundedLeft={'0px'} as={Button} colorScheme='none' className={`w-[20%]`}>
                                                                    ...
                                                            </MenuButton>
                                                            <MenuList>
                                                                <MenuItem onClick={() => handelclick(datafriend, "BLOCK")} icon={<FaBan/>}>block</MenuItem>
                                                                <MenuItem onClick={() => handelclick(datafriend, "UNFRIEND")} icon={<FaBan/>}>remove friend</MenuItem>
                                                                <MenuItem  icon={<FaGamepad/>}>Invite game</MenuItem>
                                                            </MenuList>
                                                         </Menu>

                                                        </div>
                                                ) : (
                                                    friendsloding && ListFriends?.length != 0 && <h1 className='text-white text-[15px] font-sora font-[700] text-center'>Not Found</h1>
                                                )
                                            }
                                        </div>
                </div>
                {visible && <Profile_Frined setFriendClicked={setFriendClicked} setclickFriend={setclickFriend} setonlyChat={setonlyChat} setshowchatsection={setshowchatsection} setvisible={setvisible} Profile={Profile} profileloding={profileloding} setblock={setblock} block={block} />}                        
        </div>
     );
}

export default Friends;