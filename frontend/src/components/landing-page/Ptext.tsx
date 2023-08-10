import { GetText } from '../../pages/api/lang'
export default function PText() {
    return (
        <div className='textBody'>
            <p><span>{GetText('WELCOME')} </span>{GetText('INTRO')}</p>
        </div>
    );
}