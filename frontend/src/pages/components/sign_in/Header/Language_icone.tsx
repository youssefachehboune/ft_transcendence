import { TfiWorld } from "react-icons/tfi";
import { useState } from 'react';
import Div_fr_en from "./Div_fr_en";

export default function Language_icone()
{
	const [isDivVisible, setDivVisible] = useState(false);
	const handleIconClick = () => {
		setDivVisible(!isDivVisible);
	};

	return(
		<div>
                <button onClick={handleIconClick} className='button-lang'><TfiWorld color='white'  className='icon-lang'/></button>
				{
					isDivVisible && <Div_fr_en/>
				}
		</div>
	)
}