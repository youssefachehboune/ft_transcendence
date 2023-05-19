import { MdLanguage } from 'react-icons/md'
import { useState } from 'react';
import { TfiWorld } from "react-icons/tfi";
import LangDiv from './Lang-div';
export default function Language_icone()
{
    const [isDivVisible, setDivVisible] = useState(false);
    const handleIconClick = () => {
        setDivVisible(!isDivVisible);
    };
    return(
        <div>
            <button onClick={handleIconClick} className='button-lang'>
                <TfiWorld color='white' className='icon-lang'/>
            </button>
            {
                isDivVisible && 
                <LangDiv/>
            }
        </div>
    );
}