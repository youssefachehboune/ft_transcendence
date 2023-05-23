import ReactCountryFlag from "react-country-flag"

export default function LangDiv() {
    return (
        <div className='lang-div'>
            <button className='fr-button'>
                <ReactCountryFlag countryCode="FR" className='mr-[8px]'/>
                &nbsp; french
            </button>
            <button className='en-button'>
                    <ReactCountryFlag countryCode="US" className='ml-[8px]'/>
                    &nbsp; english
            </button>
        </div>
    );
}