import { BsArrowRightShort } from "react-icons/bs";
import Link from 'next/link';
 
import { useState } from "react";
export default function PlayButton() {
    const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
    return (
        <div className='lastbutton' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Link href='/Sign_in'><h1>Play now!</h1><BsArrowRightShort className={`icon-play ${isHovered ? 'icon-play-hover' : '' }`}/></Link>
        </div>
    );
}