import { BsClockFill, BsFillPeopleFill, BsGlobe } from "react-icons/bs";
import {FaCompass, FaGamepad, FaMedal} from 'react-icons/fa'
import Expolore from "./components/Dashebord/Expolore";
import {useEffect, useState } from "react";
import Achievements from "./components/Dashebord/Achievements";
import Profile from "./components/Dashebord/profile";
import Section from "./components/Dashebord/Section";
import Search from "./components/Dashebord/Search";
import NavBar from "./components/Dashebord/NavBar";
import History from "./components/Dashebord/History";
import Friends from "./components/Dashebord/Friends";
import Main from "./components/Dashebord/Main_Cont";
import ChatFriends from "./components/Dashebord/ChatFriends";
import Chat from "./components/Dashebord/Chat";
import React from "react";

function Dashebord() {
    const [data, setdata] = useState<any>('');

    const [setshowHistorie, setsetshowHistorie] = useState<boolean>(true)
    const [showAchievements, setshowAchievements] = useState<boolean>(true);
    const [Friend, setFriends] = useState<boolean>(true)
    const [main, setmain] = useState<boolean>(true)
    const [dataisloded, setdataisloded] =  useState<boolean>(false)
    const [ListFriends, setListFriends] = useState<any>();
    const [showchatsection, setshowchatsection] = useState<boolean>(false);
    const [onlyChat, setonlyChat] = useState<boolean>(false);
    const [allhistorie, setallhistorie] = useState<boolean>(false);
    const [showprofile, setshowprofile] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const friendsResponse = await fetch('http://localhost:3000/friends', { credentials: "include" });
            const friendsData = await friendsResponse.json();
            setListFriends(friendsData);
      
            const profileResponse = await fetch('http://localhost:3000/profile', { credentials: "include" });
            const profileData = await profileResponse.json();
            setdata(profileData)
            
            const HistorieResponse = await fetch('http://localhost:3000/history/ALL', { credentials: "include" });
            const historiedata = await HistorieResponse.json();
            setallhistorie(historiedata)
            
            setdataisloded(true)
          } catch (error) {
            console.log("error: " + error)
          }
        };
        fetchData();
        const interval = setInterval(fetchData, 5000);
      
        return () => clearInterval(interval); 
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
    return ( 
        <div className={`${!showchatsection ? "container_page" : "chatsection"}`}>

            {main && !showchatsection && <Main/>}
            <div className="chanel"><NavBar setshowchatsection={setshowchatsection} showchatsection={showchatsection}/></div>
            {!showchatsection &&
                    <div className="Expolore">
                        <div className="w-[100%] h-[100%]  xl:mt-0 2xl:mt-0 xl:flex xl:justify-around 2xl:flex 2xl:justify-around">
                        <h1 className="text-[32px] font-sora font-[600] text-[white] mb-[20px] ml-[10px] xl:hidden 2xl:hidden">Explore</h1>
                        <Expolore setmain={setmain} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} setAchievements={setshowAchievements} Icone={FaCompass} text={"Home"}/>
                        <Expolore setmain={setmain} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} setAchievements={setshowAchievements} Icone={BsFillPeopleFill} text={"Friends"}/>
                        <Expolore setmain={setmain} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} setAchievements={setshowAchievements} Icone={BsClockFill} text={"History"}/>
                        <Expolore setmain={setmain} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} setAchievements={setshowAchievements} Icone={FaMedal} text={"Achievements"}/>
                        <Expolore setmain={setmain} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} setAchievements={setshowAchievements} Icone={FaGamepad} text={"Game"}/>
                        </div>
                    </div>

            }
            <Search />
            <Section showprofile={showprofile} setshowprofile={setshowprofile} setshowchatsection={setshowchatsection} showchatsection={showchatsection}/>
            <Profile showprofile={showprofile} data={data} dataisloded={dataisloded}/>
            {!setshowHistorie  && !showchatsection && <History historieloding={dataisloded} all={allhistorie}/>}
            {!showAchievements && !showchatsection && <Achievements/>}
            {!Friend && !showchatsection && <Friends friendsloding={dataisloded} count_frinds={data} ListFriends={ListFriends} setshowchatsection={setshowchatsection}/>}
            {showchatsection && <ChatFriends friendsloding={dataisloded} count_frinds={data} ListFriends={ListFriends} setonlyChat={setonlyChat} onlyChat={onlyChat} showchatsection={showchatsection} setshowchatsection={setshowchatsection}/>}

        </div>
     );
}

export default Dashebord;

