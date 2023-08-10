
import { GetText } from '@/pages/api/lang';

export default function Text()
{
	return (
		<div>
				<h1 className="svg_text">{GetText('AUTH_TEXT1')}<br/><span className="text-blue">{GetText('AUTH_TEXT2')}</span></h1>
		</div>
	)
}

