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
import Leaderboard from "./components/Dashebord/Leaderboard";
function Dashebord() {
    const [data, setdata] = useState<any>('');

    const [setshowHistorie, setsetshowHistorie] = useState<boolean>(true)
    const [showAchievements, setshowAchievements] = useState<boolean>(true);
    const [Friend, setFriends] = useState<boolean>(true)
    const [main, setmain] = useState<boolean>(true)
    const [dataisloded, setdataisloded] =  useState<boolean>(false)
    const [ListFriends, setListFriends] = useState<any>();
    const [friendsloding, setfriendsloding] = useState<boolean>(false)
    const [count_frinds, setcount_frinds] = useState<any>();

    useEffect( () => {
        fetch('http://localhost:3000/profile', { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => setdata(data)).then(() => setdataisloded(true))
    }, [])

    useEffect( () => {
        fetch('http://localhost:3000/friends' , { credentials: "include" }).then((resp) => resp.json()).then((data) => setListFriends(data)).then(()=>
        fetch('http://localhost:3000/profile', { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => {setcount_frinds(data); setfriendsloding(true)}))
    }, [count_frinds])

    
    return ( 
        <div className="container_page">

            {main && <Main setMain={setmain}/>}
            {!main && <Leaderboard/>}
            <div className="chanel"><NavBar/></div>
            <div className="Expolore ">
                <div className="w-[100%] h-[100%]  xl:mt-0 2xl:mt-0 xl:flex xl:justify-around 2xl:flex 2xl:justify-around">
                <h1 className="text-[32px] font-sora font-[600] text-[white] mb-[20px] ml-[10px] xl:hidden 2xl:hidden">Explore</h1>
                <Expolore setmain={setmain} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} setAchievements={setshowAchievements} Icone={FaCompass} text={"Home"}/>
                <Expolore setmain={setmain} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} setAchievements={setshowAchievements} Icone={BsFillPeopleFill} text={"Friends"}/>
                <Expolore setmain={setmain} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} setAchievements={setshowAchievements} Icone={BsClockFill} text={"History"}/>
                <Expolore setmain={setmain} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} setAchievements={setshowAchievements} Icone={FaMedal} text={"Achievements"}/>
                <Expolore setmain={setmain} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} setAchievements={setshowAchievements} Icone={FaGamepad} text={"Game"}/>
                </div>
            </div>
            <Search/>
            <Section/>
            <Profile data={data} dataisloded={dataisloded}/>
            {!setshowHistorie && <History/>}
            {!showAchievements && <Achievements/>}
            {!Friend && <Friends friendsloding={friendsloding} count_frinds={count_frinds} ListFriends={ListFriends}/>}
        </div>
     );
}

export default Dashebord;