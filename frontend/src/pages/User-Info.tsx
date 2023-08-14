import React, { useState, useEffect } from "react";
import Logo from '../components/landing-page/logo'
import Lang from '../components/landing-page/button-lang'
import Rectangle from "../components/sign_in/Header/Rectangle";
import Svg_image from "../components/sign_in/svg/Svg_image";
import Text_sign_up from "../components/text_svg/text_sign_up";
import Sign_up_page from "../components/User-Info/User_Info";
import Success_div from "../components/success/Success";
import Text_success from "../components/text_svg/text_success";
import Cursor from "../components/landing-page/Cursor";
import Head from "next/head";
import { Triangle } from "react-loader-spinner";
function Sign_up()
{
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
	  setTimeout(() => {
		setLoading(false)
	  }, 1000);
	}
	, [])
	const [showFirstComponent, setShowFirstComponent] = useState(true);
	const [showSecondComponent, setShowSecondComponent] = useState(false);
	const [changeColor, setChangeColor] = useState(false);
	return (

			  <div>
			<Head>
				<title>Sign up</title>
			</Head>
			<div className="m-0 h-[100vh] w-[100%] flex justify-center items-center relative overflow-hidden overscroll-none bg-[#070012]">
						{/* <Cursor setColor={setChangeColor} color={changeColor}/> */}
						<Svg_image setColor={setChangeColor} color={changeColor}/>
						<Logo />
						{/* <Lang /> */}
						<Rectangle setColor={setChangeColor} color={changeColor}/>
						{showFirstComponent && <Text_sign_up/>}
						{showSecondComponent && <Text_success/>}
						{showFirstComponent && <Sign_up_page setShowFirstComponent={setShowFirstComponent} setShowSecondComponent={setShowSecondComponent}/>}
						{showSecondComponent && <Success_div/>}
			 </div>
			</div>
		)
}

export default Sign_up; 