import { getText } from "../../../api/lang";
import Button_intra from './Button_intra';
import Button_google from './Button_google';
import Emoji from './Emoji';
import Go_back_icone from './Go_back_icone';

function Login()
{
	return (
		<div className="Login">
			<h1 className="Login_join_text">{getText('JOIN')}</h1>
			<h1 className="Login_sign_text">{getText('ACCESS')}</h1>
			<Emoji/>
			<Button_intra/>
			<Button_google/>
			<Go_back_icone/>
		</div>
	)
}

export default Login;