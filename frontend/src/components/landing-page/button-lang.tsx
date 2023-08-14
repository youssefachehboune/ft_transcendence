import { useState, useRef, useEffect, RefObject } from 'react';
import LangDiv from './Lang-div';
import { BsGlobe2 } from "react-icons/bs";
import LeftSide from './left-side';
export default function LanguageIcon() {
  const [isDivVisible, setDivVisible] = useState(false);
  const langDivRef: RefObject<HTMLButtonElement> = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleIconClick = () => {
    setDivVisible(!isDivVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (langDivRef.current && !langDivRef.current.contains(event.target as Node)) {
      setDivVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <button onClick={handleIconClick} className="button-lang" ref={langDivRef}>
        <BsGlobe2 onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} 
        color="white"
        className="icon-lang"
        style={{
          color: isHovered ? "#00DAEA" : "white",
          transition: "color 0.5s",
        }}/>
      </button>
      {isDivVisible && <LangDiv />}
    </div>
  );
}
