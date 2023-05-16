import React from "react";
import Login from "./component/sign_in/Login";
import Header from "./component/sign_in/Header";
import Svg_image from "./component/sign_in/Svg_image";
import Text_svg from "./component/sign_in/text";
function Sign_in()
{
	return (
		<div className="m-0 h-[100vh] w-[100%] relative overflow-hidden overscroll-none bg-blue">
					<Text_svg/>
					<Svg_image/>
					<Header/>
					<Login/>
		 </div>
	)
}

export default Sign_in;