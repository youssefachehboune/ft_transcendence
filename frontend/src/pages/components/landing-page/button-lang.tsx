import { useState, useRef, useEffect, RefObject } from 'react';
import { TfiWorld } from 'react-icons/tfi';
import LangDiv from './Lang-div';

export default function LanguageIcon() {
  const [isDivVisible, setDivVisible] = useState(false);
  const langDivRef: RefObject<HTMLButtonElement> = useRef(null);

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
        <TfiWorld color="white" className="icon-lang" />
      </button>
      {isDivVisible && <LangDiv />}
    </div>
  );
}
