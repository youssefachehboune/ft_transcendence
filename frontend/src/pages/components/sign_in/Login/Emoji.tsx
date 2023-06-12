import { BsFillEmojiLaughingFill } from 'react-icons/bs'

export default function Emoji()
{
	return (
			<div className="Emoji">
				<BsFillEmojiLaughingFill className="Emoji_icone"/>
				<img src="heart.svg" alt="" className="absolute left-[57%] top-[27%] phone:w-[15px] phone:top-[25%]  phone:left-[55%] Large-phone:top-[25%] laptop:top-[25%] laptop:left-[55%] select-none"/>
				<img src="heart.svg" alt="" className="absolute left-[36%] top-[27%] phone:w-[15px] phone:top-[25%]  phone:left-[39%] Large-phone:top-[25%] Large-phone:left-[34%] laptop:top-[25%] laptop:left-[37%] select-none"/>
				<img src="heart.svg" alt="" className="absolute right-[37%] top-[16%] phone:w-[15px] phone:top-[16%] phone:right-[40%] Large-phone:top-[14%] laptop:top-[14%] laptop:right-[38%] select-none"/>
			</div>
	)
}