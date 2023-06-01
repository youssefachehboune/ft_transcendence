import React from 'react';


interface EclipseProps {
    EclipseName: string;
}

const Eclipse: React.FC<EclipseProps> = ({EclipseName}) =>
{
    return (
        <svg className={EclipseName} width="142" height="193" viewBox="0 0 142 193" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_149_445)">
                <circle cx="0.5" cy="10.5" r="9.5" fill="#AFAFAF"/>
                <circle cx="0.5" cy="38.5" r="9.5" fill="#AFAFAF"/>
                <circle cx="0.5" cy="122.5" r="9.5" fill="#171926"/>
                <circle cx="0.5" cy="150.5" r="9.5" fill="#171926"/>
                <circle cx="0.5" cy="66.5" r="9.5" fill="#AFAFAF"/>
                <circle cx="0.5" cy="94.5" r="9.5" fill="#171926"/>
                <circle cx="142.5" cy="38.5" r="9.5" fill="#AFAFAF"/>
                <circle cx="142.5" cy="66.5" r="9.5" fill="#AFAFAF"/>
                <circle cx="142.5" cy="150.5" r="9.5" fill="#171926"/>
                <circle cx="142.5" cy="178.5" r="9.5" fill="#171926"/>
                <circle cx="142.5" cy="94.5" r="9.5" fill="#AFAFAF"/>
                <circle cx="142.5" cy="122.5" r="9.5" fill="#171926"/>
                <circle cx="29.5" cy="16.5" r="9.5" fill="#AFAFAF"/>
                <circle cx="29.5" cy="44.5" r="9.5" fill="#AFAFAF"/>
                <circle cx="29.5" cy="128.5" r="9.5" fill="#171926"/>
                <circle cx="29.5" cy="156.5" r="9.5" fill="#171926"/>
                <circle cx="29.5" cy="72.5" r="9.5" fill="#AFAFAF"/>
                <circle cx="29.5" cy="100.5" r="9.5" fill="#171926"/>
                <circle cx="58.5" cy="23.5" r="9.5" fill="#AFAFAF"/>
                <circle cx="58.5" cy="51.5" r="9.5" fill="#AFAFAF"/>
                <circle cx="58.5" cy="135.5" r="9.5" fill="#171926"/>
                <circle cx="58.5" cy="163.5" r="9.5" fill="#171926"/>
                <circle cx="58.5" cy="79.5" r="9.5" fill="#AFAFAF"/>
                <circle cx="58.5" cy="107.5" r="9.5" fill="#171926"/>
                <circle cx="87.5" cy="29.5" r="9.5" fill="#AFAFAF"/>
                <circle cx="87.5" cy="57.5" r="9.5" fill="#AFAFAF"/>
                <circle cx="87.5" cy="141.5" r="9.5" fill="#171926"/>
                <circle cx="87.5" cy="169.5" r="9.5" fill="#171926"/>
                <circle cx="87.5" cy="85.5" r="9.5" fill="#AFAFAF"/>
                <circle cx="87.5" cy="113.5" r="9.5" fill="#171926"/>
                <circle cx="116.5" cy="34.5" r="9.5" fill="#AFAFAF"/>
                <circle cx="116.5" cy="62.5" r="9.5" fill="#AFAFAF"/>
                <circle cx="116.5" cy="146.5" r="9.5" fill="#171926"/>
                <circle cx="116.5" cy="174.5" r="9.5" fill="#171926"/>
                <circle cx="116.5" cy="90.5" r="9.5" fill="#AFAFAF"/>
                <circle cx="116.5" cy="118.5" r="9.5" fill="#171926"/>
            </g>
            <defs>
                <clipPath id="clip0_149_445">
                <rect width="142" height="193" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    );
}

export default Eclipse;