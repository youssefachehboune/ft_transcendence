import PlayButton from './PlayButton';
import H1Text from './H1Text';
import PText from './Ptext';

interface MainProps {
    logged : boolean
}

export default function LeftSide(props : MainProps) {
    return (
        <div className='doc1'>
            <H1Text/>
            <PText/>
            <PlayButton logged={props.logged}/>
          </div>
    );
}