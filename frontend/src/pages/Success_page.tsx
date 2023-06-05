import React from "react";
import Language_icone from "./components/sign_in/Header/Language_icone";
import Logo from "./components/sign_in/Header/Logo";
import Rectangle from "./components/sign_in/Header/Rectangle";
import Svg_image from "./components/sign_in/svg/Svg_image";
import Text_success from "./components/text_svg/text_success";
import Success_div from "./components/success/Success"
function Success_page()
{
	return (
		<div className="m-0 h-[100vh] w-[100%] relative overflow-hidden overscroll-none bg-blue">
					<Svg_image/>
					<Logo/>
					<Language_icone/>
					<Rectangle/>
					<Text_success/>
					<Success_div/>
		 </div>
	)
}

export default Success_page;