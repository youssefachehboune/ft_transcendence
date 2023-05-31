import ReactCountryFlag from "react-country-flag"
import { useRef } from "react";

export default function Div_fr_en()
{
	const myRef = useRef<HTMLDivElement>(null);

const handleClick = (lang: string) => {
		document.cookie = "lang=" + lang;
	  const element: HTMLDivElement | null = myRef.current;
	  if (element)
	  	element.style.display = 'none';
		location.reload();
	};
	return (
					<div className='div-en-fr-sign' ref={myRef}>
					<button className='button-fr-sign' onClick={() => handleClick('fr')}>
						<ReactCountryFlag countryCode="FR" className='mr-[8px]'/>
						français
					</button>
					<button className='button-en-sign' onClick={() => handleClick('en')}>
						<ReactCountryFlag countryCode="US" className='mr-[8px]'/>
						english
					</button>
			</div>
	)
}