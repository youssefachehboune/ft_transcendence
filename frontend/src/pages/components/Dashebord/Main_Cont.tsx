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
            <div className="w-[100%] h-[30%] #070012 flex items-center justify-center">
                <div className="Play_div flex items-center justify-center" onMouseLeave={handlePlayLeave} onClick={handlePlayClick}>
                <img  className="w-[370px] h-[100%]" src="Liquide.svg" alt="" />
                <div className="circle1">
                </div>
                <div className="circle2">
                </div>
                <div className="w-[100%] h-[80px] absolute bottom-1 flex items-center justify-center"
                    style={{
                        bottom: isShow ? 'auto' : '10px',
                        top: isShow ? '10px' : 'auto',
                        transition: '0.5s',
                    }}
                >
                    <h1 className="header_play">How to Play</h1>

                </div>
                {
                    isShow &&                     <div className="w-[90%] h-[45%] absolute bottom-1 flex items-center justify-center ">
                    <p className="parag_play ">In our version of Pong, the objective is to score points by hitting the ball past your opponent's paddle. The first player to reach 10 points wins. Move your paddle vertically using the designated controls and react quickly to hit the ball. Missing the ball results in your opponent scoring a point. Vary your shots, and anticipate your opponent's moves to gain an advantage. Stay focused, hone your skills, and have fun as you compete in this exciting game of Pong!</p>

                </div>
                }

                <svg width="1548" height="492" viewBox="0 0 1548 492" fill="none" xmlns="http://www.w3.org/2000/svg"
                    style={{
                            top: isShow ? '1.5vw' : '6vw',
                    }}
                                        >
                    <g filter="url(#filter0_bi_1317_4550)">
                    <path className="backdrop-blur-lg" d="M0 50.9967C0 25.3916 0 12.589 8.11956 5.42349C16.2391 -1.74205 28.9358 -0.150928 54.329 3.03131C184.68 19.3667 522.518 58.5 767.5 58.5C1013.51 58.5 1361.37 19.0369 1493.88 2.8265C1519.17 -0.266807 1531.81 -1.81346 1539.91 5.34994C1548 12.5133 1548 25.2728 1548 50.7917V492H0V50.9967Z" fill="#CBCBCB" fill-opacity="0.08"/>
                    </g>
                    <defs>
                    <filter id="filter0_bi_1317_4550" x="-20" y="-19.7666" width="1588" height="531.767" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="10"/>
                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1317_4550"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1317_4550" result="shape"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="1"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.7 0"/>
                    <feBlend mode="overlay" in2="shape" result="effect2_innerShadow_1317_4550"/>
                    </filter>
                    </defs>
                </svg>
                </div>
            </div>
            <div className="w-[100%] h-[70%] ">
                <div className="w-[100%] h-1/2 flex items-center justify-center bg-white">
                </div>
                <div className="w-[100%] h-1/2 flex items-center justify-center bg-green">
                </div>
            </div>
    </div>
    );
}