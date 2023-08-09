
import { getText } from '@/pages/api/lang';

export default function Text()
{
	return (
		<div>
				<h1 className="svg_text">{getText('AUTH_TEXT1')}<br/><span className="text-blue">{getText('AUTH_TEXT2')}</span></h1>
		</div>
	)
}

