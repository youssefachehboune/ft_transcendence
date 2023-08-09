import React, { useEffect, useState } from 'react';
import styles from './Cursor.module.css';

interface colorProp {
  color: boolean;
  setColor : (color : boolean) => void;
}

const Cursor: React.FC<colorProp> = (props : colorProp) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateCursorPosition = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className="circleCursor"
          style={{ left: `${position.x}px`, top: `${position.y}px` , backgroundColor: !props.color ? '#00DAEA' : '#171926' }}></div>
      )}
    </>
  );
};

export default Cursor;
