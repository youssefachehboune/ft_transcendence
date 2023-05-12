import Link from "next/link";
import { MdLanguage } from 'react-icons/md'

function Header()
{
	return (
		<div>
				<div className="a"></div>
				<div className="b"></div>
				<div className="c"></div>
				<Link href="/"><h2 className="z-10 absolute text-white text-5xl p-[60px]">PIP<span className='text-orange'>O</span></h2></Link>
				<button><MdLanguage color={"white"} className="z-10 fixed right-[0] mr-[65px] top-[60px] w-[50px] h-[50px] rounded-[7px]"/></button>
		</div>
	)
}

export default Header;