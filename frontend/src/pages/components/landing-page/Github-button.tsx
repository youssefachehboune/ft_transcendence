import Link from "next/link";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

export default function GithubButton() {
    return (
        <Link href="https://github.com/youssefachehboune/ft_transcendence" target="_blank" className='git'><h1>Github</h1><BsFillArrowRightCircleFill/></Link>
    );
}