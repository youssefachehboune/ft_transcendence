import { MdLanguage } from 'react-icons/md'
import { useState } from 'react';
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
					<ul className='w-[100px] h-[48px] bg-white absolute right-0 mr-[40px] mt-[5%] z-20 rounded-[3px]'>
						<button className='bg-Sky w-[100%]'>french</button>
						<br />
						<button className='bg-orange w-[100%]'>english</button>
					</ul>
				}
		</div>
	)
}