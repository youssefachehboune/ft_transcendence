import { getText } from "../../pages/api/lang";

export default function Text()
{
	return (
		<div>
				<h1 className="svg_text">{getText('EAGER')}<span className="text-blue"> {getText('ROAD')}</span></h1>
		</div>
	)
}

