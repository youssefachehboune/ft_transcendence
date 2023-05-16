// import React, { useState } from 'react';

// type ButtonProps = {
//   onClick: () => void;
// };

// export default function Button() {
//   const [color, setColor] = useState('text-gray-500');
// const [background, setBackground] = useState('bg-gray-800');
//   const [check , setCheck] = useState(false);
//   const handleClick = () => {
//     // hide the button
//     if (check == false) {
//       setBackground('bg-orange-500');
//       setColor('text-white-500 ');
//       setCheck(true);
//     } else {
//       setBackground('bg-gray-800');
//       setColor('text-gray-500');
//       setCheck(false);
//     }
//   };

//   return (
//     <button onClick={handleClick} id="lang" className={`rounded-md ${background}  py-2 px-3 hover:border-b-8 hover:border-orange-500 hover:transition-all hover:duration-500`}>
//         <svg className={`h-8 w-8 sm:h-10 ${color} sm:w-10 `} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
//         </svg>
//         {
//             background == "bg-orange-500" ?
//             <div className='flex flex-col'>
//                 <button className="bg-gray-800 text-white border border-orange-500 py-2 px-4">
//                     French
//                 </button>
//                 <button className="bg-gray-800 text-white border border-orange-500 py-2 px-4">
//                     English
//                 </button>
//           </div> :
//             <div></div>
//         }
//     </button>
//   );
// };

import { MdLanguage } from 'react-icons/md'
import { useState } from 'react';

export default function Language_icone()
{
    // const [isDivVisible, setDivVisible] = useState(false);
    // const handleIconClick = () => {
    //     setDivVisible(!isDivVisible);
    // };

    return(
        <div>
                
                <button><MdLanguage color={"white"} className="z-10 fixed right-[0] mr-[65px] top-[50px] w-[70px] h-[62px] rounded-[10px] duration-1000 bg-test
                                                                                        phone:w-[45px] phone:h-[40px] phone:top-[30px] phone:mr-[15px]
                                                                                        Large-phone:top-[30px] Large-phone:mr-[25px] Large-phone:w-[45px] Large-phone:h-[40px]
                                                                                        laptop:top-[30px] laptop:mr-[25px] laptop:w-[55px] laptop:h-[50px] 
                                                                                        "/>
                </button>
                {/* {
                    isDivVisible && 
                    <ul className='w-[100px] h-[48px] bg-white absolute right-0 mr-[40px] mt-[5%] z-20 rounded-[3px]'>
                        <button className='bg-Sky w-[100%]'>french</button>
                        <br />
                        <button className='bg-orange w-[100%]'>english</button>
                    </ul>
                } */}
        </div>
    )
}