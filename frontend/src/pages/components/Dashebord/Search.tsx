import { VscSearch } from 'react-icons/vsc'
import { KeyboardEvent} from 'react'
import { BsFillPersonPlusFill } from 'react-icons/bs';

interface Search 
{
    handelsearchChanges: (e: KeyboardEvent<HTMLInputElement>) => void;
    showSearchfriend: boolean;
}
function Search({showSearchfriend, handelsearchChanges} : Search) {

    const divtest = showSearchfriend ? "w-[100%] h-[100%] flex flex-col justify-center items-center" : "w-[100%] h-[250%] flex flex-col justify-center items-center "
    const borderRaduis = showSearchfriend ? "rounded-[15px]" : "rounded-t-[15px]"
    return ( 
            <div className="search ">
            <div className={divtest}>
                <div className={`test5 w-[302px] h-[28px] ${borderRaduis} flex justify-center items-center z-[11]`}>
                        <div className="mr-[5px]">
                            <VscSearch className="w-[12px] h-[12px]" color="white" />
                        </div>
                        <input
                            onKeyDown={handelsearchChanges}
                            type="text"
                            placeholder="You can add your friend with their username."
                            className="text-white text-[8px] font-sora font-[300] flex items-center bg-transparent  border-none outline-none pl-[20px] w-[70%]"
                            />
                </div>
                        {!showSearchfriend && 
                            <div className="w-[302px] h-[76px] test5 rounded-b-[15px]  z-[10]">
                                <div  className="w-[100%] min-h-[65px] text-white flex justify-between overflow-hidden">
                                <div className="w-[100%] flex items-center ml-[15%]">
                                    <img src="mbjaghou.jpeg" alt="" className="w-[54px] rounded-full"/>
                                    <div className="w-[100px] h-[100%] flex flex-col justify-center ml-[3%] mb-[5%]">
                                        <h1 className="text-[7px] font-sora font-[600] text-[white] ">mouhamed bjaghou</h1>
                                        <h1 className="text-[7px] font-sora font-[600] text-[white] ">@mbjaghou</h1>
                                    </div>
                                    <button className="w-[111px] h-[24px] bg-[#2F313D] self-end mr-[15%] rounded-[4px] flex justify-center items-center hover:bg-[#00DAEA]">
                                        <h1 className='text-[7px] font-[400] font-sora flex items-center mr-[-5px]'><BsFillPersonPlusFill className='mr-[5px]'/>Send Request</h1>
                                    </button>
                            </div>
                            </div>
                            </div>
                        }
            </div>
        </div>
     );
}

export default Search;