
import { BsFillEmojiLaughingFill } from 'react-icons/bs'
import { IoArrowBackCircle } from 'react-icons/io5'


function Login()
{
	return (
		<div className="Login">
			<h1 className="join_text">Join the movement!</h1>

			<div className="all_emoji">
				<BsFillEmojiLaughingFill className="emoji"/>
				<img src="heart.svg" alt="" className="absolute left-[80%] top-[60%] for:w-[15px]"/>
				<img src="heart.svg" alt="" className="absolute right-[80%] top-[60%] for:w-[15px]"/>
				<img src="heart.svg" alt="" className="absolute left-[74%] top-[0%] for:w-[15px]"/>
			</div>

			<h1 className="sign_in_text">Sign-in or sign-up</h1>
			
			<button className="sign__in__intra ">
				<h1 className="text-white absolute left-[33%] top-[25%] for:text-[10px] for:left-[25%] five:text-[15px] one:text-[14px] one:left-[30%]">Continue with Intra</h1>
				<img src="g3.svg" className="ml-[70px] for:w-[15px] for:ml-[20px] five:w-[20px] five:ml-[35px] one:w-[20px] one:ml-[35px]"/>
				
			</button>

			<button className="sign__in__google">
				<h1 className="absolute left-[33%] top-[25%] for:text-[10px] for:left-[25%] five:text-[15px] one:text-[14px] one:left-[30%]">Continue with Google</h1>
				<img src="g4.svg" className="ml-[70px] for:w-[15px] for:ml-[20px] five:w-[20px] five:ml-[35px] one:ml-[35px]"/>

			</button>
			<button className="go_back">
				<IoArrowBackCircle className="absolute top-[90%] left-[40%] w-[25px] h-[25px] for:w-[15px] for:top-[85%]"/>
				<h1 className="absolute top-[90%] left-[48%] text-[15px] for:text-[8px] for:top-[87%] five:text-[15px]">Go_back</h1>
			</button>

		</div>
	)
}

export default Login;