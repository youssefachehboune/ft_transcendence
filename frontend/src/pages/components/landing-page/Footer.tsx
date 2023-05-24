import GithubButton from "./Github-button";
import Eclipse from "./Eclipse";
import Shape from "./Shape";
export default function Footer() {
    return (
        <footer>
          <Shape />
          <Eclipse  EclipseName='eclipse1'/>
          <Eclipse  EclipseName='eclipse2'/>
          <GithubButton />
      </footer>
    );
}