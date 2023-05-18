import React from "react";
import Login from "./component/sign_in/Login/Login";
import Header from "./component/sign_in/Header/Header";
import Svg_image from "./component/sign_in/svg/Svg_image";
import Text from "./component/sign_in/text_svg/text";

function Sign_in()
{	
	return (
		<div className="m-0 h-[100vh] w-[100%] relative overflow-hidden overscroll-none bg-blue">
					<Svg_image/>
					<Header/>
					<Text/>
					<Login/>
		 </div>
	)
}

export default Sign_in;