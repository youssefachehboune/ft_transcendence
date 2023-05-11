import React from "react";

import { MdLanguage } from 'react-icons/md'



function Sign_in()
{
	return (
		<div className="p-0 m-0 w-[100%] h-[100vh] relative">
			<div className="w-[30%] bg-orange">
				<div className="a"></div>
				<div className="b"></div>
				<div className="c"></div>
			<h2 className="z-10 absolute text-white text-5xl p-[60px]">PIP<span className='text-orange'>O</span></h2>

			</div>
			<div className="absolute h-[100%] w-[70%] right-[0]">
				<h1 className="z-10 text-white absolute left-[60%] top-[40%] text-5xl w-[380px] max-2xl:hidden">Yay, you're here! Let's get this show on the <span className="text-blue">road</span></h1>
				<img src="Vector.svg" className=" absolute h-[100%] right-[0%] max-2xl:hidden"/>
					<button><MdLanguage color={"white"} className="z-10 p-0 m-0 fixed left-[90%] top-[60px] w-[50px] h-[50px] bg-[#AFAFAF] rounded-[7px]"/></button>
					<div className="test"></div>
					<div className="test__one"></div>
					<div className="test__tow"></div>
					<div className="test__tree"></div>
			</div>
		</div>
	)
}

export default Sign_in;