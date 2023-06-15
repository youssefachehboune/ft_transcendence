import { VscSearch } from 'react-icons/vsc'
import { KeyboardEvent} from 'react'

interface Search 
{
    handelsearchChanges: (e: KeyboardEvent<HTMLInputElement>) => void;
}
function Search({handelsearchChanges} : Search) {
    return ( 
            <div className="search">
            <div className="w-[100%] h-[100%] flex flex-col justify-center items-center">
                <div className="test5 w-[302px] h-[28px] rounded-[15px] flex justify-center items-center">
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
            </div>
        </div>
     );
}

export default Search;