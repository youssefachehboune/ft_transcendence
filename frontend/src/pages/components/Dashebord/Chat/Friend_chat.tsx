import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { FaBan, FaGamepad } from "react-icons/fa";

function Friend_chat({setListFriends, index, changecolor, setchangecolor, user, setchatloding, setonlyChat, setfriendchat}: any) {
    const handelclick = (action: string) =>
    {
        setchangecolor(null)
        setListFriends((prevfriend: any) => prevfriend.filter((friend: any) => friend.username !== user.username));
        setonlyChat(false)
        fetch(`http://localhost:3000/friends/${action}/` + user.username, { credentials: "include", method: "POST"});
    }
    return ( 
        <div key={user.user_id} className="min-h-[61px] flex items-center">
            <button onClick={() =>
            {
                setonlyChat(false)
                setchatloding(true)
                setchangecolor((prev: any) => (prev === index ? null : index));
                fetch('http://localhost:3000/profile/' + user.username , { credentials: "include" }).then((resp) => { return resp.json(); }).then((data) => {setfriendchat(data); setchatloding(false)}).then(() => setonlyChat(true))
            }
            } className={`w-[80%]  flex items-center justify-center rounded-l-[6px] ${changecolor ? "bg-[#00DAEA]": ""}`}>
                <div className="w-[75px] h-[70px] flex justify-center items-center relative">
                        <img src={user.avatar} alt="" className="w-[54px] rounded-full select-none"/>
                        <div className={`w-[12px] h-[12px] bg-[#14FF00] mt-[45px] ml-[30px] rounded-full absolute`}></div>
                </div>
                <div className="w-[200px] h-[100%] flex flex-col justify-center items-start ml-[3%]">
                    <h1 className={`text-[13px] font-sora font-[600] text-[white] ${changecolor ? "text-black" : ""}`}>{user.firstName + " " + user.lastName}</h1>
                    <h1 className={`text-[10px] font-sora font-[400] text-[#969696] ${changecolor ? "text-black" : ""}`}>{"@" + user.username}</h1>
                </div>
            </button>
            <Menu>
                <MenuButton height={'full'} roundedRight={'6px'} transition={'none'} background={`${changecolor ? "#00DAEA": ""}`} textColor={`${changecolor ? "text-black": "white"}`} roundedLeft={'0px'} as={Button} colorScheme='none' className={`w-[20%]`}>
                        ...
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => handelclick("BLOCK")} icon={<FaBan/>}>block</MenuItem>
                    <MenuItem onClick={() => handelclick("UNFRIEND")} icon={<FaBan/>}>remove friend</MenuItem>
                    <MenuItem  icon={<FaGamepad/>}>Invite game</MenuItem>
                </MenuList>
            </Menu>
        </div>
     );
}

export default Friend_chat;