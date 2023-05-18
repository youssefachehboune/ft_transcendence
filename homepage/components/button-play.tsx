import { CSSProperties } from 'react';

export default function ButtonPlay() {
    interface MyImgAttributes extends React.ImgHTMLAttributes<HTMLImageElement> {
        style?: CSSProperties;
      }
      const imgProps: MyImgAttributes = {
        src: 'https://www.htmlcssbuttongenerator.com/iconExample-eye-lined.svg',
        style: { width: '25px', marginLeft: '10px', marginRight: '0px', flexDirection: 'row'},
      };
    return (
        <button className="btn font-semibold text-white bg-171926 py-3 px-14 border-2 border-red-500 shadow-md rounded-md transition duration-1603 transform translate-y-0 flex flex-row items-center cursor-pointer hover:bg-red-500 hover:text-white hover:border-2 hover:border-171926 hover:transform hover:-translate-y-3">Play now! <img {...imgProps}/></button>
    );

}