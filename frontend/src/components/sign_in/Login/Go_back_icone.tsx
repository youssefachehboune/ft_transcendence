import Link from 'next/link'
import { IoArrowBackCircle } from 'react-icons/io5'
import { GetText } from "../../../pages/api/lang";
import { useState } from 'react';

export default function Go_back_icone()
{
	const [isHovered, setIsHovered] = useState<boolean>(false);

	const handleMouseEnter = () => {
	  setIsHovered(true);
	};
  
	const handleMouseLeave = () => {
	  setIsHovered(false);
	};
	return (
		<div className={`w-[90px] h-[50px] phone:w-[50px] Large-phone:w-[70px] flex items-center justify-between`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

			<Link href={'/'}>
				<IoArrowBackCircle className={`go_back_icone transform transition-transform duration-700 ${isHovered ? 'translate-x-[-7px]' : ''}`}/>
			</Link>
			<Link href={'/'}>
				<h1 className="go_back_text">{GetText('BACK')}</h1>
			</Link>
		</div>
	)
}