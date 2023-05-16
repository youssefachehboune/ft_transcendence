import { MdLanguage } from 'react-icons/md'
import { useState } from 'react';

export default function Language_icone()
{
	// const [isDivVisible, setDivVisible] = useState(false);
	// const handleIconClick = () => {
	// 	setDivVisible(!isDivVisible);
	// };

	return(
		<div>
				
				<button><MdLanguage color={"white"} className="z-10 fixed right-[0] mr-[65px] top-[50px] w-[78px] h-[70px] rounded-[10px] duration-1000 bg-test
																						phone:w-[45px] phone:h-[40px] phone:top-[30px] phone:mr-[15px]
																						Large-phone:top-[30px] Large-phone:mr-[25px] Large-phone:w-[45px] Large-phone:h-[40px]
																						laptop:top-[30px] laptop:mr-[25px] laptop:w-[55px] laptop:h-[50px] 
																						"/>
				</button>
				{/* {
					isDivVisible && 
					<ul className='w-[100px] h-[48px] bg-white absolute right-0 mr-[40px] mt-[5%] z-20 rounded-[3px]'>
						<button className='bg-Sky w-[100%]'>french</button>
						<br />
						<button className='bg-orange w-[100%]'>english</button>
					</ul>
				} */}
		</div>
	)
}