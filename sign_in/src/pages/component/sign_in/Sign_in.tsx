import React from "react";
import Login from "./Login/Login";
import Header from "./Header/Header";
import Svg_image from "./svg/Svg_image";
import Text from "./svg/text";

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