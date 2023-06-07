import React, { useState } from "react";
import Login from "./components/sign_in/Login/Login";
import Logo from './components/landing-page/logo'
import Lang from './components/landing-page/button-lang'
import Rectangle from "./components/sign_in/Header/Rectangle";
import Svg_image from "./components/sign_in/svg/Svg_image";
import Text from "./components/text_svg/text_sign_in_page";
import Cursor from "./components/landing-page/Cursor";

function Sign_in()
{	
	const [changeColor, setChangeColor] = useState(false);
	return (
		<div className="h-[100vh] w-[100%] relative overflow-hidden overscroll-none bg-[#070012]">
					<Cursor setColor={setChangeColor} color={changeColor}/>
					<Svg_image setColor={setChangeColor} color={changeColor}/>
					<Logo />
        			<Lang />
					<Rectangle setColor={setChangeColor} color={changeColor}/>
					<Text/>
					<Login/>
		 </div>
	)
}

export default Sign_in;