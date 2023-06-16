import { BsClockFill, BsFillPeopleFill, BsGlobe } from "react-icons/bs";
import {FaCompass, FaGamepad, FaMedal} from 'react-icons/fa'
import Expolore from "./components/Dashebord/Expolore";
import { ChangeEvent, HtmlHTMLAttributes, KeyboardEvent, useEffect, useState } from "react";
import getProfile from "./api/getProfile";
import Link from "next/link";
import Profile from "./components/Dashebord/profile";
import Section from "./components/Dashebord/Section";
import Search from "./components/Dashebord/Search";
import Div_Search_friend from "./components/Dashebord/Div_Search_friend";

function Dashebord() {
    const [data, setdata] = useState<any>('');
    const [search, setsearch] = useState<string>("");
    const [showfriend, setshowfriend] = useState<boolean>(true)
    const [showSearchfriend, setshowSearchfriend] = useState<boolean>(true)
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
            <div className="cont"></div>

            
            <div className="chanel">
                <Link href={'/'}><img src="pipo.png" alt="" className="w-[100px] p-4 select-none"/></Link>
            </div>

            <div className="Expolore xl:flex xl:justify-around 2xl:flex 2xl:justify-around">
                <h1 className="text-[32px] font-sora font-[600] text-[white] mb-[20px] ml-[10px] xl:hidden 2xl:hidden">Explore</h1>
                <Expolore setshowfriend={setshowfriend} Icone={FaCompass} text={"Home"}/>
                <Expolore setshowfriend={setshowfriend} Icone={BsFillPeopleFill} text={"Friends"}/>
                <Expolore setshowfriend={setshowfriend} Icone={BsClockFill} text={"History"}/>
                <Expolore setshowfriend={setshowfriend} Icone={FaMedal} text={"Achievements"}/>
                <Expolore setshowfriend={setshowfriend} Icone={FaGamepad} text={"Game"}/>
            </div>
            <Search handelsearchChanges={handelsearchChanges} />
            {!showSearchfriend && <Div_Search_friend/>}
            <Section/>
            {showfriend && <Profile showfriend={showfriend} data={data}/> }
        </div>
     );
}

export default Dashebord;