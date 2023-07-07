import { BsClockFill, BsFillPeopleFill, BsGlobe } from "react-icons/bs";
import {FaCompass, FaGamepad, FaMedal} from 'react-icons/fa'
import Expolore from "./components/Dashebord/Expolore";
import { ChangeEvent, HtmlHTMLAttributes, KeyboardEvent, useEffect, useState } from "react";
import Profile from "./components/Dashebord/profile";
import Section from "./components/Dashebord/Section";
import Search from "./components/Dashebord/Search";
import NavBar from "./components/Dashebord/NavBar";
import History from "./components/Dashebord/History";
import Friends from "./components/Dashebord/Friends";
import Main from "./components/Dashebord/Main_Cont";
function Dashebord() {
    const [data, setdata] = useState<any>('');

    const [setshowHistorie, setsetshowHistorie] = useState<boolean>(true)
    const [Friend, setFriends] = useState<boolean>(true)
    const [main, setmain] = useState<boolean>(true)
    useEffect( () => {
        fetch('http://localhost:3000/profile', { credentials: "include" }).then((resp) => {return resp.json();}).then((data) => setdata(data))
    }, [])


    
    return ( 
        <div className="container_page">

            {main && <Main/>}
            <div className="chanel"><NavBar/></div>

            <div className="Expolore ">
                <div className="w-[100%] h-[100%]  xl:mt-0 2xl:mt-0 xl:flex xl:justify-around 2xl:flex 2xl:justify-around">
                <h1 className="text-[32px] font-sora font-[600] text-[white] mb-[20px] ml-[10px] xl:hidden 2xl:hidden">Explore</h1>
                <Expolore setmain={setmain} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} Icone={FaCompass} text={"Home"}/>
                <Expolore setmain={setmain} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} Icone={BsFillPeopleFill} text={"Friends"}/>
                <Expolore setmain={setmain} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} Icone={BsClockFill} text={"History"}/>
                <Expolore setmain={setmain} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} Icone={FaMedal} text={"Achievements"}/>
                <Expolore setmain={setmain} setsetshowHistorie={setsetshowHistorie} setFriends={setFriends} Icone={FaGamepad} text={"Game"}/>
                </div>
            </div>
            <Search/>
            <Section/>
            <Profile data={data}/>
            {!setshowHistorie && <History/>}
            {!Friend && <Friends data={data}/>}
        </div>
     );
}

export default Dashebord;