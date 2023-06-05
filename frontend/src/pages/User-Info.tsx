import React from "react";
import Language_icone from "./components/sign_in/Header/Language_icone";
import Logo from "./components/sign_in/Header/Logo";
import Rectangle from "./components/sign_in/Header/Rectangle";
import Svg_image from "./components/sign_in/svg/Svg_image";
import Text_sign_up from "./components/sign_in/text_svg/text_sign_up";
import Sign_up_page from "./components/User-Info/User_Info";

function Sign_up()
{
	return (
			<div className="m-0 h-[100vh] w-[100%] relative overflow-hidden overscroll-none bg-blue">
						<Svg_image/>
						<Logo/>
						<Language_icone/>
						<Rectangle/>
						<Text_sign_up/>
						<Sign_up_page/>
			 </div>
		)
}

export default Sign_up; 