import { GetText } from "../../pages/api/lang";

export default function Text()
{
	return (
		<div>
				<h1 className="svg_text">{GetText('EAGER')}<span className="text-blue"> {GetText('ROAD')}</span></h1>
		</div>
	)
}

