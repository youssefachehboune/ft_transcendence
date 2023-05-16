import { BsFillEmojiLaughingFill } from 'react-icons/bs'

export default function Emoji()
{
	return (
			<div className="absolute left-[150px] top-[70px]
							phone:top-[55px] phone:left-[110px]
							Large-phone:top-[60px] Large-phone:left-[120px]
							laptop:top-[60px] laptop:left-[140px]
					">

				<BsFillEmojiLaughingFill className="w-[90px] h-[90px] rounded-[50%] shadow-shdow
													phone:w-[45px] phone:h-[45px] phone:left-[70px]
													Large-phone:w-[65px] Large-phone:h-[65px] Large-phone:left-[70px]
													laptop:w-[65px] laptop:h-[65px] laptop:left-[70px]
					"/>
				
				<img src="heart.svg" alt="" className="absolute left-[80%] top-[60%] phone:w-[15px]"/>
				<img src="heart.svg" alt="" className="absolute right-[80%] top-[60%] phone:w-[15px]"/>
				<img src="heart.svg" alt="" className="absolute left-[74%] top-[0%] phone:w-[15px]"/>
			</div>
	)
}