import Language_icone from "./feature/Language_icone";
import Logo from "./feature/Logo";
function Header()
{
	return (
		<div>
				<Logo/>
				<div className="a"></div>
				<div className="b"></div>
				<div className="c"></div>
				<Language_icone/>
				<div className="test"></div>
				<div className="test__one"></div>
				<div className="test__tow"></div>
				{/* <div className="test__tree"></div> */}
		</div>
	)
}

export default Header;