import { getText } from '../../api/lang'
export default function PText() {
    return (
        <div className='textBody'>
            <p><span>{getText('WELCOME')} </span>{getText('INTRO')}</p>
        </div>
    );
}