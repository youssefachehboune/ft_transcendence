import { AiOutlineArrowRight } from "react-icons/ai";
import Link from 'next/link';
import { getText } from "../../api/lang";

export default function PlayButton() {
    return (
        <div className='lastbutton'>
            <Link href='/Sign_in'><h1>{getText('PLAY')}</h1><AiOutlineArrowRight/></Link>
        </div>
    );
}