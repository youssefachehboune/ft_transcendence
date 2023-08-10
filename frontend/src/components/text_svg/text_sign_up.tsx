import { getText } from "../../pages/api/lang";

export default function Text_sign_up()
{
	return (
		<div>
				<h1 className="svg_text">{getText('INITIATE')}<span className="text-blue"> {getText('JOURNEY')}</span></h1>
		</div>
	)
}

