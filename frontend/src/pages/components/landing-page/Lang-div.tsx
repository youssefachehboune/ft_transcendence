import ReactCountryFlag from "react-country-flag"

export default function LangDiv() {
    return (
        <div className='lang-div'>
            <button onClick={() => {document.cookie = "lang=fr";location.reload()}} className='fr-button'>
                <ReactCountryFlag countryCode="FR" className='mr-[8px]'/>
                &nbsp; français
            </button>
            <button onClick={() => {document.cookie = "lang=en";location.reload()}} className='en-button'>
                    <ReactCountryFlag countryCode="US" className='ml-[8px]'/>
                    &nbsp; english
            </button>
        </div>
    );
}