import { TfiWorld } from "react-icons/tfi";
import { RefObject, useEffect, useRef, useState } from 'react';
import Div_fr_en from "./Div_fr_en";

export default function Language_icone()
{
	const [isDivVisible, setDivVisible] = useState(false);
  	const langDivRef: RefObject<HTMLButtonElement> = useRef(null);
	const handleIconClick = () => {
		setDivVisible(!isDivVisible);
	};
	  const handleClickOutside = (event: MouseEvent) => {
    if (langDivRef.current && !langDivRef.current.contains(event.target as Node)) {
      setDivVisible(false);
    }
  };

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
		document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return(
		<div >
                <button ref={langDivRef} onClick={handleIconClick} className='button-lang-sign'><TfiWorld color='white'  className='icon-lang-sign'/></button>
				{
					isDivVisible && <Div_fr_en/>
				}
		</div>
	)
}