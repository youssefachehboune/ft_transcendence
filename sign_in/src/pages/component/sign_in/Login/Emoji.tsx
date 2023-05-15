import { BsFillEmojiLaughingFill } from 'react-icons/bs'

export default function Emoji()
{
	return (
			<div className="absolute left-[150px] top-[70px]
							for:top-[55px] for:left-[110px]
							one:top-[60px] one:left-[120px]
							five:top-[60px] five:left-[140px]
					">

				<BsFillEmojiLaughingFill className="w-[90px] h-[90px] rounded-[50%] shadow-shdow
													for:w-[45px] for:h-[45px] for:left-[70px]
													one:w-[65px] one:h-[65px] one:left-[70px]
													five:w-[65px] five:h-[65px] five:left-[70px]
					"/>
				
				<img src="heart.svg" alt="" className="absolute left-[80%] top-[60%] for:w-[15px]"/>
				<img src="heart.svg" alt="" className="absolute right-[80%] top-[60%] for:w-[15px]"/>
				<img src="heart.svg" alt="" className="absolute left-[74%] top-[0%] for:w-[15px]"/>
			</div>
	)
}