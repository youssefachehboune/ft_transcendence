import { BsClockFill, BsFillPeopleFill } from "react-icons/bs";
import { FaCompass, FaGamepad, FaMedal } from 'react-icons/fa'
import Expolore from "./components/Dashebord/Expolore";
import { useEffect, useState } from "react";
import Achievements from "./components/Dashebord/Achievements";
import Profile from "./components/Dashebord/Friendes/profile";
import Section from "./components/Dashebord/Section";
import Search from "./components/Dashebord/Search";
import NavBar from "./components/Dashebord/NavBar";
import History from "./components/Dashebord/History";
import Friends from "./components/Dashebord/Friendes/Friends";
import Main from "./components/Dashebord/Main_Cont";
import ChatFriends from "./components/Dashebord/Chat/ChatFriends";
import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import Createchanel from "./components/Dashebord/Chanels/createchanel/createchanel";
import List_memebres from "./components/Dashebord/Chanels/List_memebres";
import { MdLeaderboard } from "react-icons/md";
import Search_Public_chanel from "./components/Dashebord/Chanels/Search_public_chanel/Search_Public_chanel";
import Leaderboard from "./components/Dashebord/Leaderboard";
import socket from "./chatSocket"
import GameSection from "./components/Dashebord/Game";
import user_socket from "./userSocket";
import Invite_game from "./components/Dashebord/invite_game";
import { GameData } from './components/Dashebord/Game/gameData';
interface Data {
  sender: number;
  receiver: number;
}


enum types {
  online = "online",
  ingame = "ingame",
  offline = "offline",
}
interface status {
  userId: number;
  type: types;
}

function Dashebord() {
  const [data, setdata] = useState<any>('');

  const [setshowHistorie, setsetshowHistorie] = useState<boolean>(true)
  const [showAchievements, setshowAchievements] = useState<boolean>(true);
  const [Friend, setFriends] = useState<boolean>(true)
  const [main, setmain] = useState<boolean>(true)
  const [dataisloded, setdataisloded] = useState<boolean>(false)
  const [ListFriends, setListFriends] = useState<any>();
  const [showchatsection, setshowchatsection] = useState<boolean>(false);
  const [onlyChat, setonlyChat] = useState<boolean>(false);
  const [allhistorie, setallhistorie] = useState<boolean>(false);
  const [showprofile, setshowprofile] = useState<boolean>(true);
  const [showLeaderboard, setshowLeaderboard] = useState<boolean>(true);
  const [massagenotif, setmassagenotif] = useState<boolean>(false)
  const [menu, setmenu] = useState<boolean>(true);


  const [searchchanels, setsearchchanels] = useState<string | undefined>("");
  const [chaneldata, setchaneldata] = useState<any>();

  const [mychanel, setmychanel] = useState<any>()
  const [showchanel, setshowchanel] = useState<boolean>(false)
  const [memebers, setmemebers] = useState<any>()
  const [chanel, setchanel] = useState<any>()
  const [channelloding, setchannelloding] = useState<boolean>(false)
  const [mumeberschannelloding, setmumeberschannelloding] = useState<boolean>(false)
  const [invitationList, setinvitationList] = useState<any>()
  const [banList, setbanList] = useState<any>()
  const [mutedList, setmutedList] = useState<any>()
  const [requestList, setrequestList] = useState<any>()
  const [typememeber, settypememeber] = useState<any>()
  const [public_channel, setpublic_channel] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: ispublic, onOpen: openpublic, onClose: closepublic } = useDisclosure()

  const { isOpen: ispopgame, onOpen: onopenpopgame, onClose: onclosepopgame } = useDisclosure()
  const [invitegame, setinvitegame] = useState<any>()
  const [Gameview, setGame] = useState<boolean>(true);
  const [gameData, setGameData] = useState<GameData | undefined>(undefined);
  const [Onlines, setOnlines] = useState<status[]>([]);


  useEffect(() => {
    user_socket.on("invitation", (data: Data) => {
      if (data) {
        setinvitegame(data)
        onopenpopgame()
      }
    });
    user_socket.on("start", (data: GameData) => {
      if (data) {
        setGameData(data);
        setsetshowHistorie(true)
        setFriends(true);
        setmain(false);
        setshowAchievements(true);
        setshowLeaderboard(true);
        setGame(false);
      }
    });

    user_socket.on("updateStatus", (data: status) => {
      if (data) {
        setOnlines((prev) => {
          const index = prev.findIndex((item) => item.userId === data.userId);
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
        setOnlines((prev) => {
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
  }, [])
  const open_search_chanel = () => {
    setsearchchanels("")
    setchaneldata(null);
    openpublic()
  }
  useEffect(() => {
    if (!showchatsection) {
      socket.on('receive_message', (data: string) => {
        setmassagenotif(true)
      })

    }
    return () => { socket.off('receive_message') };

  }, [showchatsection])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const friendsResponse = await fetch('http://localhost:3000/friends', { credentials: "include" });
        const friendsData = await friendsResponse.json();
        setListFriends(friendsData);

        const profileResponse = await fetch('http://localhost:3000/profile', { credentials: "include" });
        const profileData = await profileResponse.json();
        setdata(profileData)

        const HistorieResponse = await fetch('http://localhost:3000/history/ALL/1', { credentials: "include" });
        const historiedata = await HistorieResponse.json();
        setallhistorie(historiedata)

        const mychanels = await fetch('http://localhost:3000/channel/my_channels', { credentials: "include" });
        const chanelsdata = await mychanels.json();
        setmychanel(chanelsdata)

        const publicmychanels = await fetch('http://localhost:3000/channel/channels', { credentials: "include" });
        const publicchanelsdata = await publicmychanels.json();
        setpublic_channel(publicchanelsdata)

        setdataisloded(true)
      } catch (error) {
        console.log("error: " + error)
      }
    };
    fetchData();
    socket.on('request_accepted', (channel) => {
      setmychanel((prev: any) => [...prev, channel])
    })
    socket.on('refresh', (data) => {
      if (data.action == "delete") {
        setshowchanel(false)
        setmychanel((prevMembers: any) => prevMembers.filter((member: any) => member.name !== data.name));
      }
      if (data.action == "update") {
        setmychanel((prevMembers: any) => {
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
    <div className={`${!showchatsection && !showchanel ? "container_page" : "chatsection"}`}>
      {main && !showchatsection && !showchanel && <Main />}
      <div className="chanel">
        <NavBar setrequestList={setrequestList} openpublic={open_search_chanel} setmutedList={setmutedList} data={data} settypememeber={settypememeber} setinvitationList={setinvitationList} setbanList={setbanList} setmumeberschannelloding={setmumeberschannelloding} setchannelloding={setchannelloding} setchanel={setchanel} setshowchanel={setshowchanel} setmemebers={setmemebers}
          mychanel={mychanel} socket={socket} onOpen={onOpen} setonlyChat={setonlyChat} setshowchatsection={setshowchatsection} showchatsection={showchatsection} />
      </div>
      {!showchatsection && !showchanel &&
        <div className="Expolore">
          <div className="w-[100%] h-[100%]  xl:mt-0 2xl:mt-0 xl:flex xl:justify-around 2xl:flex 2xl:justify-around">
            <h1 className="text-[32px] font-sora font-[600] text-[white] mb-[20px] ml-[10px] xl:hidden 2xl:hidden">Explore</h1>
            <Expolore setmain={setmain} setLeaderboard={setshowLeaderboard} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} setGame={setGame} setAchievements={setshowAchievements} Icone={FaCompass} text={"Home"} />
            <Expolore setmain={setmain} setLeaderboard={setshowLeaderboard} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} setGame={setGame} setAchievements={setshowAchievements} Icone={BsFillPeopleFill} text={"Friends"} />
            <Expolore setmain={setmain} setLeaderboard={setshowLeaderboard} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} setGame={setGame} setAchievements={setshowAchievements} Icone={BsClockFill} text={"History"} />
            <Expolore setmain={setmain} setLeaderboard={setshowLeaderboard} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} setGame={setGame} setAchievements={setshowAchievements} Icone={FaMedal} text={"Achievements"} />
            <Expolore setmain={setmain} setLeaderboard={setshowLeaderboard} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} setGame={setGame} setAchievements={setshowAchievements} Icone={MdLeaderboard} text={"Leaderboard"} />
            <Expolore setmain={setmain} setLeaderboard={setshowLeaderboard} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} setGame={setGame} setAchievements={setshowAchievements} Icone={FaGamepad} text={"Game"} />
          </div>
        </div>

      }
      <Search menu={menu} />
      <Section setshowchanel={setshowchanel} setmenu={setmenu} menu={menu} showprofile={showprofile} setshowprofile={setshowprofile} setshowchatsection={setshowchatsection} setonlyChat={setonlyChat} showchatsection={showchatsection} massagenotif={massagenotif} />
      <Profile setshowprofile={setshowprofile} setdata={setdata} ListFriends={ListFriends} showprofile={showprofile} data={data} dataisloded={dataisloded} />
      {!setshowHistorie && !showchatsection && !showchanel && <History historieloding={dataisloded} all={allhistorie} />}
      {!showAchievements && !showchatsection && !showchanel && <Achievements />}
      {!showLeaderboard && !showchatsection && !showchanel && <Leaderboard username={data.username} />}
      {!Gameview && <GameSection data={gameData} />}
      <Invite_game onClose={onclosepopgame} isOpen={ispopgame} data={invitegame} />
      {!Friend && !showchatsection && !showchanel && <Friends Onlines={Onlines} setListFriends={setListFriends} setonlyChat={setonlyChat} friendsloding={dataisloded} ListFriends={ListFriends} setshowchatsection={setshowchatsection} />}
      {showchatsection && <ChatFriends Onlines={Onlines} opencreatechanel={onOpen} openpublic={openpublic} setshowchanel={setshowchanel} setchanel={setchanel} setinvitationList={setinvitationList} setrequestList={setrequestList} setmutedList={setmutedList} setbanList={setbanList} settypememeber={settypememeber} setmemebers={setmemebers} setmumeberschannelloding={setmumeberschannelloding} setchannelloding={setchannelloding} mychanel={mychanel} setListFriends={setListFriends} setmassagenotif={setmassagenotif} data={data} friendsloding={dataisloded} ListFriends={ListFriends} setonlyChat={setonlyChat} onlyChat={onlyChat} showchatsection={showchatsection} setshowchatsection={setshowchatsection} />}
      {showchanel && <List_memebres setpublic_channel={setpublic_channel} setmychanel={setmychanel} setchanel={setchanel} setrequestList={setrequestList} setbanList={setbanList} setmutedList={setmutedList} setinvitationList={setinvitationList} setmemebers={setmemebers} requestList={requestList} ListFriends={ListFriends} mutedList={mutedList} typememeber={typememeber} invitationList={invitationList} banList={banList} mumeberschannelloding={mumeberschannelloding} channelloding={channelloding} data={data} chanel={chanel} setshowchanel={setshowchanel} memebers={memebers} />}
      {dataisloded && <Createchanel setmychanel={setmychanel} isOpen={isOpen} onClose={onClose} />}
      {dataisloded && <Search_Public_chanel data={data} searchchanels={searchchanels} setsearchchanels={setsearchchanels} setchaneldata={setchaneldata} chaneldata={chaneldata} setmychanel={setmychanel} setpublic_channel={setpublic_channel} public_channel={public_channel} onClose={closepublic} isOpen={ispublic} />}
    </div>
  );
}

export default Dashebord;
