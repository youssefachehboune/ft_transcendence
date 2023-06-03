import Link from 'next/link'
import { IoArrowBackCircle } from 'react-icons/io5'
import { getText } from "../../../api/lang";

export default function Go_back_icone()
{
	return (
		<div className='w-[90px] h-[50px] phone:w-[50px] Large-phone:w-[70px] flex items-center justify-between '>

			<Link href={'/'}>
				<IoArrowBackCircle className="go_back_icone"/>
			</Link>
			<Link href={'/'}>
				<h1 className="go_back_text">{getText('BACK')}</h1>
			</Link>
		</div>
	)
}