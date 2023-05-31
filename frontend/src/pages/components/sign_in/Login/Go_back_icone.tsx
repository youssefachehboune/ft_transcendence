import Link from 'next/link'
import { IoArrowBackCircle } from 'react-icons/io5'
import { getText } from "../../../api/lang";

export default function Go_back_icone()
{
	return (
		<button>
			<Link href={'/'}>
				<IoArrowBackCircle className="go_back_icone"/>
				<h1 className="go_back_text">{getText('BACK')}</h1>
			</Link>
		</button>
	)
}