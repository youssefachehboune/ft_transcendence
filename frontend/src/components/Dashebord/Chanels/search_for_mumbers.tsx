import { Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import { BsFillVolumeMuteFill, BsPersonFillAdd } from "react-icons/bs";
import { FaBan, FaGamepad } from "react-icons/fa";
import {TbUserCancel} from 'react-icons/tb'
import Image from "next/image";

function Search_for_mumbers({setdatamumber, setmutedList, setbanList, setmemebers, chanel, typememeber, user, typeofmumber, updateUserType, play}: any) {
    const handleBanClick = (action: string) => {
        if (action == 'ban')
            setbanList((prevBanList : any) => [...prevBanList, user])
        if (action == 'mute')
            setmutedList((prevBanList : any) => [...prevBanList, user])
        setmemebers((prevMembers: any) => prevMembers.filter((member: any) => member.username !== user.username));
        setdatamumber(null);
        fetch(`http://localhost:3000/channel/Admin/${chanel.name}/${user.username}/${action}`, {
          credentials: "include",
          method: 'PUT',
        })
      };
      const handelmakeuser_admin = (action : any) =>
      {
        if (action === "makeAdmin") {
            updateUserType(user.username, "ADMIN");
        }
        if (action === "makeUser") {
            updateUserType(user.username, "MEMBER");
        }
        fetch(`http://localhost:3000/channel/Admin/${chanel.name}/${user.username}/${action}`, {credentials: "include",method: 'PUT',})
      }
    return ( 
        <div className="min-h-[61px] flex items-center">
                
                <button className={`w-[80%] flex items-center justify-center rounded-l-[6px]`}>
                    <div className="w-[75px] h-[70px] flex justify-center items-center relative">
                            <Image width={'54'} height={'54'} src={user.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                            <div className={`w-[12px] h-[12px] bg-[#14FF00] mt-[45px] ml-[30px] rounded-full absolute`}></div>
                    </div>
                    <div className="w-[200px] h-[100%] flex flex-col justify-center items-start ml-[3%]">
                        <h1 className={`text-[13px] font-sora font-[600] text-[white]`}>{user.firstName + " " + user.lastName}</h1>
                        <h1 className={`text-[10px] font-sora font-[400] text-[#969696]`}>{"@" + user.username}</h1>
                    </div>
                </button>
                
                {
                    typememeber == 'OWNER' ? (
                        typeofmumber == "MEMBER" ?
                        (
                            <Menu>
                                <MenuButton as={Button} colorScheme='none' className="w-[20%] h-full rounded-r-[6px] text-white">
                                        ...
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={() => handleBanClick("ban")} icon={<FaBan/>}>Ban</MenuItem>
                                    <MenuItem onClick={() => handleBanClick("mute")} icon={<BsFillVolumeMuteFill/>}>mute</MenuItem>
                                    <MenuItem onClick={() => handleBanClick("kick")} icon={<TbUserCancel/>}>kick</MenuItem>
                                    <MenuItem onClick={() => handelmakeuser_admin("makeAdmin")} icon={<BsPersonFillAdd/>}>make admin</MenuItem>
                                    <MenuItem onClick={() => play(user.user_id)} icon={<FaGamepad/>}>Invite game</MenuItem>
                                </MenuList>
                            </Menu>
                        ): typeofmumber == "ADMIN" ?
                        (
                            <Menu>
                            <MenuButton as={Button} colorScheme='none' className="w-[20%] h-full rounded-r-[6px] text-white">
                                    ...
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => handleBanClick("ban")} icon={<FaBan/>}>Ban</MenuItem>
                                <MenuItem onClick={() => handleBanClick("mute")} icon={<BsFillVolumeMuteFill/>}>mute</MenuItem>
                                <MenuItem onClick={() => handleBanClick("kick")} icon={<TbUserCancel/>}>kick</MenuItem>
                                <MenuItem onClick={() => handelmakeuser_admin("makeUser")} icon={<BsPersonFillAdd/>}>make User</MenuItem>
                                <MenuItem onClick={() => play(user.user_id)} icon={<FaGamepad/>}>Invite game</MenuItem>
                            </MenuList>
                            </Menu>
                        ): null
                    ): typememeber == 'MEMBER' ?
                    (
                            <Menu>
                            <MenuButton as={Button} colorScheme='none' className="w-[20%] h-full rounded-r-[6px] text-white">
                                    ...
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => play(user.user_id)} icon={<FaGamepad/>}>Invite game</MenuItem>
                            </MenuList>
                            </Menu>
                    ): typememeber == 'ADMIN' ?
                    (
                        typeofmumber == "MEMBER" ?
                        (
                            <Menu>
                                <MenuButton as={Button} colorScheme='none' className="w-[20%] h-full rounded-r-[6px] text-white">
                                        ...
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={() => handleBanClick("ban")} icon={<FaBan/>}>Ban</MenuItem>
                                    <MenuItem onClick={() => handleBanClick("mute")} icon={<BsFillVolumeMuteFill/>}>mute</MenuItem>
                                    <MenuItem onClick={() => handleBanClick("kick")} icon={<TbUserCancel/>}>kick</MenuItem>
                                    <MenuItem onClick={() => play(user.user_id)} icon={<FaGamepad/>}>Invite game</MenuItem>
                                </MenuList>
                            </Menu>
                        ): 
                        (
                            <Menu>
                            <MenuButton as={Button} colorScheme='none' className="w-[20%] h-full rounded-r-[6px] text-white">
                                    ...
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => play(user.user_id)} icon={<FaGamepad/>}>Invite game</MenuItem>
                            </MenuList>
                            </Menu>
                        )

                    ): null
                }
    </div>
    );
}

export default Search_for_mumbers;