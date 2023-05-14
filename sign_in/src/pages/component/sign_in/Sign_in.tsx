import React from "react";
import Login from "./Login";
import Header from "./Header";
import Svg_image from "./feature/Svg_image";
import Text_svg from "./feature/text";
function Sign_in()
{
	return (
		<div className="p-0 m-0 h-[100vh] w-[100%] relative">
			
		 		<div className="relative h-[100%] w-[100%] overflow-hidden">
					<Text_svg/>
					<Svg_image/>
					<Header/>
					<Login/>
				</div>
						
		 </div>
	)
}

export default Sign_in;