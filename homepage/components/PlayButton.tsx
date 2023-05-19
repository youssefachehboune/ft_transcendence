import { AiOutlineArrowRight } from "react-icons/ai";
import Link from 'next/link';

export default function PlayButton() {
    return (
        <div className='lastbutton'>
            <Link href='#'><h1>Play now!</h1><AiOutlineArrowRight/></Link>
        </div>
    );
}