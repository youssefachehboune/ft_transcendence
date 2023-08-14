import Image from "next/image";
import ReactCountryFlag from "react-country-flag"

export default function LangDiv() {
    return (
        <div className='lang-div'>
            <button onClick={() => {document.cookie = "lang=fr";location.reload()}} className='fr-button'>
            <Image src="/france.png" alt="" width={20} height={20}/>
                Francais
            </button>
            <button onClick={() => {document.cookie = "lang=en";location.reload()}} className='en-button'>
                    <Image src="/english.png" alt="" width={20} height={20} />
                    English
            </button>
        </div>
    );
}