

import Button_intra from './Button_intra';
import Button_google from './Button_google';
import Emoji from './Emoji';
import Go_back_icone from './Go_back_icone';

function Login()
{
	return (
		<div className="Login">
			<h1 className="Login_join_text">Join the movement!</h1>
			<h1 className="Login_sign_text">Sign-in or sign-up</h1>
			<Emoji/>
			<Button_intra/>
			<Button_google/>
			<Go_back_icone/>
		</div>
	)
}

export default Login;