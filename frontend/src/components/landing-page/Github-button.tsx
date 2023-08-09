import Link from "next/link";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useState } from "react";
export default function GithubButton() {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
    return (
        <Link href="https://github.com/youssefachehboune/ft_transcendence" target="_blank" className='git' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <h1>Github</h1>
            <BsFillArrowRightCircleFill className={`icon-play-git ${isHovered ? 'icon-play-git-hover' : '' }`}/>
            </Link>
    );
}   