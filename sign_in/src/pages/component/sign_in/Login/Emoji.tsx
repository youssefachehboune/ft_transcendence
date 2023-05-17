import { BsFillEmojiLaughingFill } from 'react-icons/bs'

export default function Emoji()
{
	return (
			<div className="Emoji">
				<BsFillEmojiLaughingFill className="Emoji_icone"/>
				<img src="heart.svg" alt="" className="absolute left-[80%] top-[60%] phone:w-[15px]"/>
				<img src="heart.svg" alt="" className="absolute right-[80%] top-[60%] phone:w-[15px]"/>
				<img src="heart.svg" alt="" className="absolute left-[74%] top-[0%] phone:w-[15px]"/>
			</div>
	)
}