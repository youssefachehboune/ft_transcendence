import Racket from './Racket'
import LeftSide from './left-side'

interface MainProps {
    logged : boolean
}
export default function Main(props : MainProps) {
    return (
        <div className='main'>
            <LeftSide logged={props.logged}/>
            <Racket/>
        </div>
    );
}