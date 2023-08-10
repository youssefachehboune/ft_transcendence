import { GetText } from "../../pages/api/lang";

export default function Text_sign_up()
{
	return (
		<div>
				<h1 className="svg_text">{GetText('INITIATE')}<span className="text-blue"> {GetText('JOURNEY')}</span></h1>
		</div>
	)
}

