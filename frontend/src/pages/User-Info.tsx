import React, { useState } from "react";
import Language_icone from "./components/sign_in/Header/Language_icone";
import Logo from "./components/sign_in/Header/Logo";
import Rectangle from "./components/sign_in/Header/Rectangle";
import Svg_image from "./components/sign_in/svg/Svg_image";
import Text_sign_up from "./components/text_svg/text_sign_up";
import Sign_up_page from "./components/User-Info/User_Info";
import Success_div from "./components/success/Success";
import Text_success from "./components/text_svg/text_success";

function Sign_up()
{
	const [showFirstComponent, setShowFirstComponent] = useState(true);
	const [showSecondComponent, setShowSecondComponent] = useState(false);
	return (
			<div className="m-0 h-[100vh] w-[100%] relative overflow-hidden overscroll-none bg-[#070012]">
						<Svg_image/>
						<Logo/>
						<Language_icone/>
						<Rectangle/>
						{showFirstComponent && <Text_sign_up/>}
						{showSecondComponent && <Text_success/>}
						{showFirstComponent && <Sign_up_page setShowFirstComponent={setShowFirstComponent} setShowSecondComponent={setShowSecondComponent}/>}
						{showSecondComponent && <Success_div/>}
			 </div>
		)
}

export default Sign_up; 