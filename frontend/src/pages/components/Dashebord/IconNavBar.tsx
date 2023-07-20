interface IconNavBarProps{
    'image' : string,
    'activeIndex' : number | null,
    'handleClick' : (index : number) => void,
    'number' : number,

}

export default function IconNavBarp(props : IconNavBarProps) {
    return (
     <div className="relative w-[100px] h-[71px] flex items-center overf">
        <div onClick={() => props.handleClick(props.number)} className={`${props.number === props.activeIndex ? 'active' : 'nav_hover'} w-[45px] h-[45px] ml-8 rounded-full flex items-center justify-center overflow-hidden`}>
            <img src={props.image} className="" alt="" />
        </div>
        <div className={`w-[7px]  bg-white absolute z-99 right-[75%] rounded-l-[2px] rounded-r-[5px] transition-all  ${0 === props.activeIndex ? 'h-[50%]' : 'h-[0%]'} `}>
            </div>
        </div>
    );

}