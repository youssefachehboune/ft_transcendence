import ReactCountryFlag from "react-country-flag"

export default function LangDiv() {
    return (
        <div className='lang-div'>
            <button onClick={() => {document.cookie = "lang=fr";location.reload()}} className='fr-button'>
            <img src="france.png" alt="" />
                Francais
            </button>
            <button onClick={() => {document.cookie = "lang=en";location.reload()}} className='en-button'>
                    <img src="english.png" alt="" />
                    English
            </button>
        </div>
    );
}