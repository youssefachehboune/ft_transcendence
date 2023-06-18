import { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons";

interface exploring
{
    Icone: IconType;
    text: string;
    setsetshowHistorie: Dispatch<SetStateAction<boolean>>;
    setFriends: Dispatch<SetStateAction<boolean>>;
}
function Expolore({setsetshowHistorie, setFriends, Icone, text}: exploring) {

    const [isHovered, setIsHovered] = useState<boolean>(false);

	const handleMouseEnter = () => {
	  setIsHovered(true);
	};
  
	const handleMouseLeave = () => {
	  setIsHovered(false);
	};
    
    const handelonclick = () =>
    {
        setsetshowHistorie(true)
        setFriends(true);
        if (text === "Friends" || text === "History" || text === "Achievements" || text === "Game")
        {
            if (text === "History")
                setsetshowHistorie(false)
            else if (text === "Friends")
                setFriends(false)
        }
    }
    return (
            <button onClick={handelonclick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="w-[268px] h-[50px] mb-[10px] flex justify-start items-center rounded-[5px] gap-[12px] hover:bg-[#00DAEA] xl:justify-center  2xl:justify-center 2xl:h-[100%] xl:rounded-none 2xl:rounded-none">
                <Icone color="white" className={`ml-[20px] xl:ml-0 2xl:ml-0 2xl:w-[30px] 2xl:h-[30px] transform transition-transform duration-700 ${isHovered ? 'translate-x-[15px] xl:translate-y-[-5px] xl:translate-x-[0px] 2xl:translate-y-[-10px] 2xl:translate-x-[0px]' : ''}`}/>
                <h1 className={`ml-[10px] text-[white] text-[17px] font-sora font-[400] xl:hidden 2xl:hidden transform transition-transform duration-700 ${isHovered ? 'translate-x-[15px]' : ''}`}>{text}</h1>
            </button>
     );
}

export default Expolore;