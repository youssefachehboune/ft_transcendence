import { BsClockFill, BsFillPeopleFill, BsGlobe } from "react-icons/bs";
import {FaCompass, FaGamepad, FaMedal} from 'react-icons/fa'
import Expolore from "./components/Dashebord/Expolore";
import { ChangeEvent, HtmlHTMLAttributes, KeyboardEvent, useEffect, useState } from "react";
import getProfile from "./api/getProfile";
import Achievements from "./components/Dashebord/Achievements";
import Profile from "./components/Dashebord/profile";
import Section from "./components/Dashebord/Section";
import Search from "./components/Dashebord/Search";
import NavBar from "./components/Dashebord/NavBar";
import History from "./components/Dashebord/History";
import Friends from "./components/Dashebord/Friends";
import Main from "./components/Dashebord/Main_Cont";
import Achievement from "./components/Dashebord/Achievement";
function Dashebord() {
    const [data, setdata] = useState<any>('');
    const [search, setsearch] = useState<string>("");
    const [showSearchfriend, setshowSearchfriend] = useState<boolean>(true)
    const [setshowHistorie, setsetshowHistorie] = useState<boolean>(true)
    const [showAchievements, setshowAchievements] = useState<boolean>(true);
    const [Friend, setFriends] = useState<boolean>(true)
    const [main, setmain] = useState<boolean>(true)
    useEffect(() => {
		const fetchData = async () => {
			try {
			const fetchedUserData = await getProfile();
			setdata(fetchedUserData);
			} catch (error) {
			console.log('Error:', error);
			}
		};
		if (!data) {
			fetchData();
		}
		}, [data]);
        const handelsearchChanges = (e: KeyboardEvent<HTMLInputElement>) =>
        {
            setshowSearchfriend(true)
            if (e.key === 'Enter')
            {
                setshowSearchfriend(false)
                setsearch(e.currentTarget.value);  
                console.log(e.currentTarget.value)

            }
        }
    
    return ( 
        <div className="container_page">

            {main && <Main/>}
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
            <Search showSearchfriend={showSearchfriend} handelsearchChanges={handelsearchChanges} />
            <Section/>
            <Profile data={data}/>
            {!setshowHistorie && <History/>}
            {!showAchievements && <Achievements/>}
            {!Friend && <Friends data={data}/>}
        </div>
     );
}

export default Dashebord;