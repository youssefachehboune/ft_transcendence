import { MdLanguage } from 'react-icons/md'
import { useState } from 'react';

import ReactCountryFlag from "react-country-flag"
export default function Language_icone()
{
	const [isDivVisible, setDivVisible] = useState(false);
	const handleIconClick = () => {
		setDivVisible(!isDivVisible);
	};

	return(
		<div>
				<button onClick={handleIconClick}><MdLanguage color={"white"} className="Language_icone"/></button>
				{
					isDivVisible && 
					<div className='w-[100px] h-[70px] bg-test absolute right-0 mr-[75px] mt-[80px] z-20 rounded-[5px] 
									phone:mr-[20px] phone:mt-[55px]
									Large-phone:mr-[30px] Large-phone:mt-[55px]
									laptop:mr-[30px] laptop:mt-[65px]'
									>
						<button className='w-[100px] h-[35px] text-white'>
							<ReactCountryFlag countryCode="FR" className='mr-[8px]'/>
							french
						</button>
						<button className='w-[100px] h-[35px] text-white'>
							<ReactCountryFlag countryCode="US" className='mr-[8px]'/>
							english
						</button>
					</div>
				}
		</div>
	)
}