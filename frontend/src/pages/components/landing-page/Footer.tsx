import GithubButton from "./Github-button";
import Eclipse from "./Eclipse";
import Shape from "./Shape";

interface colorProp {
  color: boolean;
  setColor : (color : boolean) => void;
}


const Footer  = (props : colorProp) => {
    return (
        <footer>
          <Shape color={props.color} setColor={props.setColor}/>
          <GithubButton />
      </footer>
    );
}

export default Footer;