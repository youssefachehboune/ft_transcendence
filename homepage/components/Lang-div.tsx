import ReactCountryFlag from "react-country-flag"

export default function LangDiv() {
    return (
        <div className='lang-div'>
            <button className='fr-button'>
                <ReactCountryFlag countryCode="FR" className='mr-[8px]'/>
                french
            </button>
            <button className='en-button'>
                    <ReactCountryFlag countryCode="US" className='mr-[8px]'/>
                    english
            </button>
        </div>
    );
}