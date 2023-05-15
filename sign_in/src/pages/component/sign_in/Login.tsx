

import Button_intra from './Login/Button_intra';
import Button_google from './Login/Button_google';
import Emoji from './Login/Emoji';
import Go_back_icone from './Login/Go_back_icone';

function Login()
{
	return (
		<div className="w-[378px] h-[475px] bg-white absolute z-[100] ml-[25%] mt-[10%] rounded-[20px]
						for:w-[270px] for:h-[300px] for:ml-[15%] for:mt-[65%]
						one:w-[300px] one:h-[340px] one:ml-[15%] one:mt-[40%]
						five:w-[350px] five:h-[370px] five:ml-[15%] five:mt-[30%]
					">
			<h1 className="absolute text-[25px] left-[90px] top-[20px]
						   for:text-[15px] for:left-[70px]
						   one:text-[18px] one:left-[75px]
						   five:text-[20px] five:left-[90px]
					">
				Join the movement!
			</h1>
			<Emoji/>
			<h1 className="text-[25px] absolute top-[40%] left-[25%]
						   for:text-[15px] for:left-[75px] for:top-[110px]
						   one:text-[18px] one:left-[80px] one:top-[140px]
						   five:text-[20px] five:left-[95px] five:top-[140px]
				">
				Sign-in or sign-up
			</h1>
			<Button_intra/>
			<Button_google/>
			<Go_back_icone/>
		</div>
	)
}

export default Login;