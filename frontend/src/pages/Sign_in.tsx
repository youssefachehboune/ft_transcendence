import React, { useState } from "react";
import Login from "../components/sign_in/Login/Login";
import Logo from '../components/landing-page/logo'
import Lang from '../components/landing-page/button-lang'
import Rectangle from "../components/sign_in/Header/Rectangle";
import Svg_image from "../components/sign_in/svg/Svg_image";
import Text from "../components/text_svg/text_sign_in_page";
import Cursor from "../components/landing-page/Cursor";
import Head from "next/head";
import { useEffect } from "react";
import { Triangle } from "react-loader-spinner";
function Sign_in()
{
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
	  setTimeout(() => {
		setLoading(false)
	  }, 1000);
	}
	, [])
	const [changeColor, setChangeColor] = useState(false);
	return (

			  <div>
			  <Head>
				  <title>Pong Game ,sign-in Page</title>
			  </Head>
			  <div className="h-[100vh] w-[100%] relative flex justify-center items-center overflow-hidden overscroll-none bg-[#070012]">
						  {/* <Cursor setColor={setChangeColor} color={changeColor}/> */}
						  <Svg_image setColor={setChangeColor} color={changeColor}/>
						  <Logo />
						  <Rectangle setColor={setChangeColor} color={changeColor}/>
						  <Text/>
						  <Login/>
			  </div>
			  
		  </div>
	)
}

export default Sign_in;