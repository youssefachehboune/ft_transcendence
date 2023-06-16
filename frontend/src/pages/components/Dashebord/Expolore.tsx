import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";

interface exploring
{
    Icone: IconType;
    text: string;
    setshowfriend: Dispatch<SetStateAction<boolean>>;
}
function Expolore({setshowfriend, Icone, text}: exploring) {

    const handelonclick = () =>
    {
        console.log(text)
        if (text === "Friends" || text === "History" || text === "Achievements" || text === "Game")
            setshowfriend(false);
        if (text === "Home")
            setshowfriend(true);
    }
    return (
            <button onClick={handelonclick} className="w-[268px] h-[50px] mb-[10px] flex justify-start items-center rounded-[5px] hover:bg-[#00DAEA] xl:justify-center  2xl:justify-center 2xl:h-[100%] xl:rounded-none 2xl:rounded-none">
                <Icone color="white" className="ml-[20px] xl:ml-0 2xl:ml-0 2xl:w-[30px] 2xl:h-[30px]"/>
                <h1 className="ml-[10px] text-[white] text-[17px] font-sora font-[400] xl:hidden 2xl:hidden">{text}</h1>
            </button>
     );
}

export default Expolore;