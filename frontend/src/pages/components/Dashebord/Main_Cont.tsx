import { useState } from "react";


export default function Main() {
    const [isShow, setIsShow] = useState<boolean>(false);
    function handlePlayClick()
    {
        setIsShow(true);
    }
    function handlePlayLeave()
    {
        setIsShow(false);
    }
    return (
        <div className="cont">
            <div className="w-[100%] h-[35%] #070012 flex items-center justify-center phone:h-[50%]">
                <div className="Play_div flex items-center justify-center" onMouseLeave={handlePlayLeave} onClick={handlePlayClick}>
                <img  className="w-[370px] h-[100%]" src="Liquide.svg" alt="" />
                <div className="circle1">
                </div>
                <div className="circle2">
                </div>
                <div className="w-[100%] h-[80px] absolute bottom-1 flex items-center justify-center phone:h-[50px]"
                    style={{
                        bottom: isShow ? 'auto' : '10px',
                        top: isShow ? '10px' : 'auto',
                        transition: '0.5s',
                    }}
                >
                <h1 className="header_play">How to Play</h1>

                </div>
                {
                    isShow &&                     <div className="w-[90%] h-[50%] absolute bottom-1 flex items-center justify-center phone:h-[70%]" >
                    <p className="parag_play ">In our version of Pong, the objective is to score points by hitting the ball past your opponent's paddle. The first player to reach 10 points wins. Move your paddle vertically using the designated controls and react quickly to hit the ball. Missing the ball results in your opponent scoring a point. Vary your shots, and anticipate your opponent's moves to gain an advantage. Stay focused, hone your skills, and have fun as you compete in this exciting game of Pong!</p>

                </div>
                }


                <svg style={
                    {
                        // bottom: isShow ? 'auto' : 'px',
                    }
                }
                width="1326" height="613" viewBox="0 0 1326 613" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_bi_1280_4230)">
                    <path   d="M0 51.1452C0 25.4793 0 12.6464 8.1279 5.48018C16.2558 -1.68602 29.0051 -0.0762972 54.5036 3.14315C169.906 17.7139 445.084 49.5 649.5 49.5C856.127 49.5 1151.44 17.0227 1271.81 2.67655C1297.18 -0.347137 1309.87 -1.85898 1317.93 5.3021C1326 12.4632 1326 25.1915 1326 50.648V613H0V51.1452Z" fill="#CBCBCB" fillOpacity="0.08"/>
                    </g>
                    <defs>
                    <filter id="filter0_bi_1280_4230" x="-20" y="-19.8416" width="1366" height="652.842" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="10"/>
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1280_4230"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1280_4230" result="shape"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="1"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.7 0"/>
                    <feBlend mode="overlay" in2="shape" result="effect2_innerShadow_1280_4230"/>
                    </filter>
                    </defs>
                </svg>
                </div>
            </div>
            <div className="w-[100%] h-[65%]  phone:h-[50%]">
                <div className="w-[100%] h-1/2 flex items-center justify-center bg-white">
                </div>
                <div className="w-[100%] h-1/2 flex items-center justify-center bg-green">
                </div>
            </div>
    </div>
    );
}