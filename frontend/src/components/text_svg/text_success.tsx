import { GetText } from "../../pages/api/lang";

export default function Text()
{
	return (
		<div>
				<h1 className="svg_text">{GetText('CONGRATS')}<span className="text-blue"> {GetText('SET')}</span></h1>
		</div>
	)
}

