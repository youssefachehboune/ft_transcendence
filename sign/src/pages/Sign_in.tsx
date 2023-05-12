import React from "react";
import Login from "./component/Login";
import Header from "./component/Header";
import Svg_image from "./component/Svg_image";
function Sign_in()
{
	return (
		<div className="p-0 m-0 w-[100%] h-[100vh] relative">
				<div className="w-[50%] h-[100%] float-left"><Header/><div className="Login"><Login/></div></div> 

		 		<div className="absolute h-[100%] w-[100%] right-[0] float-right"><Svg_image/></div>
		 </div>
	)
}

export default Sign_in;