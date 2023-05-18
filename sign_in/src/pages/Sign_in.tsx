import React from "react";
import Login from "./component/sign_in/Login/Login";
import Language_icone from "./component/sign_in/Header/Language_icone";
import Logo from "./component/sign_in/Header/Logo";
import Rectangle from "./component/sign_in/Header/Rectangle";
import Svg_image from "./component/sign_in/svg/Svg_image";
import Text from "./component/sign_in/text_svg/text";

function Sign_in()
{	
	return (
		<div className="m-0 h-[100vh] w-[100%] relative overflow-hidden overscroll-none bg-blue">
					<Svg_image/>
					<Logo/>
					<Language_icone/>
					<Rectangle/>
					<Text/>
					<Login/>
		 </div>
	)
}

export default Sign_in;