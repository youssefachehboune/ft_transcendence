import { getText } from "../../api/lang";

export default function Text()
{
	return (
		<div>
				<h1 className="svg_text">{getText('CONGRATS')}<span className="text-blue"> {getText('SET')}</span></h1>
		</div>
	)
}

