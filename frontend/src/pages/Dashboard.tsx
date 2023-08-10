import { BsClockFill, BsFillPeopleFill } from "react-icons/bs";
import { FaCompass, FaGamepad, FaMedal } from 'react-icons/fa'
import Expolore from "../components/Dashebord/Expolore";
import { useEffect, useState } from "react";
import Profile from "../components/Dashebord/Friendes/profile";
import Section from "../components/Dashebord/Section";
import Search from "../components/Dashebord/Search";
import NavBar from "../components/Dashebord/NavBar";
import React from "react";
import Createchanel from "../components/Dashebord/Chanels/createchanel/createchanel";
import { MdLeaderboard } from "react-icons/md";
import Search_Public_chanel from "../components/Dashebord/Chanels/Search_public_chanel/Search_Public_chanel";
import socket from "./chatSocket"
import GetContext from "./context";
import Main from "../components/Dashebord/Main_Cont";
import { useDisclosure } from "@chakra-ui/react";
import { GameData, Players } from "@/components/Dashebord/Game/gameData";
import user_socket from "./userSocket";
import Invite_game from "@/components/Dashebord/invite_game";
import { useRouter } from "next/router";

enum types {
  online = "online",
  ingame = "ingame",
  offline = "offline",
}
interface status {
  userId: number;
  type: types;
}

function Dashebord({ children }: any) {
  let golobal = GetContext()
  const [showprofile, setshowprofile] = useState<boolean>(true);
  const [menu, setmenu] = useState<boolean>(true);
  const [searchchanels, setsearchchanels] = useState<string | undefined>("");
  const [chaneldata, setchaneldata] = useState<any>();
  const router = useRouter();


  const { isOpen: ispopgame, onOpen: onopenpopgame, onClose: onclosepopgame } = useDisclosure()
  const [invitegame, setinvitegame] = useState<Players>()

  const open_search_chanel = () => {
    setsearchchanels("")
    setchaneldata(null);
    golobal.openpublic()
  }
  useEffect(() => {
    if (!golobal.showchatsection) {
      socket.on('receive_message', (data: string) => {
        golobal.setmassagenotif(true)
      })

    }
    return () => { socket.off('receive_message') };

  }, [golobal.showchatsection])
  useEffect(() => {
    user_socket.on("invitation", (data: Players) => {
      if (data) {
        setinvitegame(data)
        onopenpopgame()
      }
    });
    user_socket.on("start", (data: GameData) => {
      if (data) {
        golobal.setGameData(data);
        router.push('/Game')
      }
    });

    user_socket.on("updateStatus", (data: status) => {
      if (data) {
        golobal.setOnlines((prev: any) => {
          const index = prev.findIndex((item: any) => item.userId === data.userId);
          if (index !== -1) {
            prev[index].type = data.type;
          }
          else {
            prev.push(data);
          }
          return [...prev];
        });
      }
    });

    user_socket.on("onlineFriends", (data: number[]) => {
      if (data) {
        const newData = data.map((item) => {
          return { userId: item, type: types.online };
        });
        golobal.setOnlines((prev: any) => {
          return [...prev, ...newData];
        });
      }
    });
    return () => {
      user_socket.off('start');
      user_socket.off('updateStatus');
      user_socket.off('invitation');
      user_socket.off('onlineFriends');
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const friendsResponse = await fetch('http://localhost:3000/friends', { credentials: "include" });
        const friendsData = await friendsResponse.json();
        golobal.setListFriends(friendsData);

        const profileResponse = await fetch('http://localhost:3000/profile', { credentials: "include" });
        const profileData = await profileResponse.json();
        golobal.setdata(profileData)

        const HistorieResponse = await fetch('http://localhost:3000/history/ALL/1', { credentials: "include" });
        const historiedata = await HistorieResponse.json();
        golobal.setallhistorie(historiedata)

        const mychanels = await fetch('http://localhost:3000/channel/my_channels', { credentials: "include" });
        const chanelsdata = await mychanels.json();
        golobal.setmychanel(chanelsdata)

        const publicmychanels = await fetch('http://localhost:3000/channel/channels', { credentials: "include" });
        const publicchanelsdata = await publicmychanels.json();
        golobal.setpublic_channel(publicchanelsdata)

        golobal.setdataisloded(true)
      } catch (error) {
        console.log("error: " + error)
      }
    };
    fetchData();
    socket.on('request_accepted', (channel) => {
      golobal.setmychanel((prev: any) => [...prev, channel])
    })
    socket.on('refresh', (data) => {
      if (data.action == "delete") {
        golobal.setshowchanel(false)
        golobal.setmychanel((prevMembers: any) => prevMembers.filter((member: any) => member.name !== data.name));
      }
      if (data.action == "update") {
        golobal.setmychanel((prevMembers: any) => {
          return prevMembers.map((member: any) => {
            return member.name === data.name ? { ...member, name: data.new } : member;
          });
        });
      }
    })
    return () => { socket.off('refresh'), socket.off('request_accepted') }
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (!showprofile)
        setshowprofile(window.innerWidth > 1300);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [showprofile]);

  useEffect(() => {
    const handleResize = () => {
      if (menu)
        setmenu(window.innerWidth < 767);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menu]);


  return (
    <div className={`${!golobal.showchatsection && !golobal.showchanel ? "container_page" : "chatsection"}`}>
      <div className="chanel">
        <NavBar setrequestList={golobal.setrequestList} openpublic={open_search_chanel} setmutedList={golobal.setmutedList} data={golobal.data}
          settypememeber={golobal.settypememeber} setinvitationList={golobal.setinvitationList} setbanList={golobal.setbanList} setmumeberschannelloding={golobal.setmumeberschannelloding}
          setchannelloding={golobal.setchannelloding} setchanel={golobal.setchanel} setshowchanel={golobal.setshowchanel} setmemebers={golobal.setmemebers}
          mychanel={golobal.mychanel} socket={socket} onOpen={golobal.onOpen} setshowchatsection={golobal.setshowchatsection} showchatsection={golobal.showchatsection} />
      </div>
      {!golobal.showchatsection && !golobal.showchanel &&
        <div className="Expolore">
          <div className="w-[100%] h-[100%]  xl:mt-0 2xl:mt-0 xl:flex xl:justify-around 2xl:flex 2xl:justify-around">
            <h1 className="text-[32px] font-sora font-[600] text-[white] mb-[20px] ml-[10px] xl:hidden 2xl:hidden">Explore</h1>
            <Expolore Icone={FaCompass} text={"Home"} />
            <Expolore Icone={BsFillPeopleFill} text={"Friends"} />
            <Expolore Icone={BsClockFill} text={"History"} />
            <Expolore Icone={FaMedal} text={"Achievements"} />
            <Expolore Icone={MdLeaderboard} text={"Leaderboard"} />
            <Expolore Icone={FaGamepad} text={"Game"} />
          </div>
        </div>
      }
      <Search setListFriends={golobal.setListFriends} menu={menu} />
      <Section setListFriends={golobal.setListFriends} setshowchanel={golobal.setshowchanel} setmenu={setmenu} menu={menu} showprofile={showprofile} setshowprofile={setshowprofile} setshowchatsection={golobal.setshowchatsection} setonlyChat={golobal.setonlyChat} showchatsection={golobal.showchatsection} massagenotif={golobal.massagenotif} />
      <Profile setshowprofile={setshowprofile} setdata={golobal.setdata} ListFriends={golobal.ListFriends} showprofile={showprofile} data={golobal.data} dataisloded={golobal.dataisloded} />
      {golobal.dataisloded && <Createchanel setmychanel={golobal.setmychanel} isOpen={golobal.isOpen} onClose={golobal.onClose} />}
      {golobal.dataisloded && <Search_Public_chanel data={golobal.data} searchchanels={searchchanels} setsearchchanels={setsearchchanels} setchaneldata={setchaneldata} chaneldata={chaneldata} setmychanel={golobal.setmychanel} setpublic_channel={golobal.setpublic_channel} public_channel={golobal.public_channel} onClose={golobal.closepublic} isOpen={golobal.ispublic} />}
      <Invite_game onClose={onclosepopgame} isOpen={ispopgame} data={invitegame} />
      {children ? children : <Main />}
    </div>
  );
}

export default Dashebord;

