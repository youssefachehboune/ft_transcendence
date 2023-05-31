import ReactCountryFlag from "react-country-flag"
import { useRef } from "react";

interface Handel_focuse
{
	setDivVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Div_fr_en({setDivVisible}: Handel_focuse)
{
	const myRef = useRef<HTMLDivElement>(null);

	const handleClick = () => {
	  const element: HTMLDivElement | null = myRef.current;
	  if (element)
	  	element.style.display = 'none';
		setDivVisible(false);
	};
	return (
					<div className='div-en-fr-sign' ref={myRef}>
					<button className='button-fr-sign' onClick={handleClick}>
						<ReactCountryFlag countryCode="FR" className='mr-[8px]'/>
						french
					</button>
					<button className='button-en-sign' onClick={handleClick}>
						<ReactCountryFlag countryCode="US" className='mr-[8px]'/>
						english
					</button>
			</div>
	)
}