import { IconType } from "react-icons";

interface exploring
{
    Icone: IconType;
    text: string;
}
function Expolore({Icone, text}: exploring) {
    return ( 
        <button className="w-[268px] h-[50px] mb-[10px] flex flex-col justify-center rounded-[5px] hover:bg-[#00DAEA]">
            <h1 className="flex items-center ml-[20px] text-[white] text-[17px] font-sora font-[400]"><span className="mr-[5px]"><Icone/></span>{text}</h1>
        </button>
     );
}

export default Expolore;