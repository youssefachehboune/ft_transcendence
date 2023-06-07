import React from "react";
import Login from "./components/sign_in/Login/Login";
import Language_icone from "./components/sign_in/Header/Language_icone";
import Logo from "./components/sign_in/Header/Logo";
import Rectangle from "./components/sign_in/Header/Rectangle";
import Svg_image from "./components/sign_in/svg/Svg_image";
import Text from "./components/sign_in/text_svg/text_sign_in_page";
import { useState } from 'react'
import Cursor from './components/landing-page/Cursor'
function Sign_in()
{	
	const [changeColor, setChangeColor] = useState(false);
	return (
		<div className="h-[100vh] w-[100%] relative overflow-hidden overscroll-none bg-blue">
					<Cursor setColor={setChangeColor} color={changeColor}/>
					<Svg_image setColor={setChangeColor} color={changeColor}/>
					<Logo/>
					<Language_icone/>
					<Rectangle/>
					<Text/>
					<Login/>
		 </div>
	)
}

export default Sign_in;