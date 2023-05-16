

import Button_intra from './Login/Button_intra';
import Button_google from './Login/Button_google';
import Emoji from './Login/Emoji';
import Go_back_icone from './Login/Go_back_icone';

function Login()
{
	return (
		<div className="w-[378px] h-[475px] bg-white absolute z-[100] ml-[25%] mt-[10%] rounded-[20px]
						phone:w-[270px] phone:h-[300px] phone:ml-[15%] phone:mt-[65%]
						Large-phone:w-[300px] Large-phone:h-[340px] Large-phone:ml-[15%] Large-phone:mt-[40%]
						laptop:w-[350px] laptop:h-[370px] laptop:ml-[15%] laptop:mt-[30%]
					">
			<h1 className="absolute text-[25px] left-[70px] top-[20px] font-ibm-plex-sans-kr font-semibold
						   phone:text-[15px] phone:left-[70px]
						   Large-phone:text-[18px] Large-phone:left-[75px]
						   laptop:text-[20px] laptop:left-[90px]
					">
				Join the movement!
			</h1>
			<Emoji/>
			<h1 className="text-[25px] absolute top-[40%] left-[25%] font-ibm-plex-sans font-semibold
						   phone:text-[15px] phone:left-[75px] phone:top-[110px]
						   Large-phone:text-[18px] Large-phone:left-[80px] Large-phone:top-[140px]
						   laptop:text-[20px] laptop:left-[95px] laptop:top-[140px]
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