import ReactCountryFlag from "react-country-flag"

export default function Div_fr_en()
{
	return (
					<div className='div-en-fr'>
					<button className='button-fr'>
						<ReactCountryFlag countryCode="FR" className='mr-[8px]'/>
						french
					</button>
					<button className='button-en'>
						<ReactCountryFlag countryCode="US" className='mr-[8px]'/>
						english
					</button>
			</div>
	)
}