import { IoArrowBackCircle } from 'react-icons/io5'

export default function Go_back_icone()
{
	return (
		<button>
				<IoArrowBackCircle className="absolute top-[90%] left-[40%] w-[25px] h-[25px] phone:w-[15px] phone:top-[85%] Large-phone:top-[84%] Large-phone:left-[39%]"/>
				<h1 className="absolute top-[90%] left-[48%] text-[15px] font-fredoka font-medium
								phone:text-[8px] phone:top-[87%]
								Large-phone:top-[84%]
								laptop:text-[15px] ">
								Go back
				</h1>
		</button>
	)
}