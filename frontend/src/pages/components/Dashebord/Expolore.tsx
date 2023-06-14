import { IconType } from "react-icons";

interface exploring
{
    Icone: IconType;
    text: string;
}
function Expolore({Icone, text}: exploring) {
    return (
            <button className="w-[268px] h-[50px] mb-[10px] flex justify-start items-center rounded-[5px] hover:bg-[#00DAEA] xl:justify-center  2xl:justify-center">
                <Icone color="white" className="ml-[20px] xl:ml-0 2xl:ml-0"/>
                <h1 className="ml-[10px] text-[white] text-[17px] font-sora font-[400] xl:hidden 2xl:hidden">{text}</h1>
            </button>
     );
}

export default Expolore;