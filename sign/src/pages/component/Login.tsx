
import { BsFillEmojiLaughingFill } from 'react-icons/bs'
import { IoArrowBackCircle } from 'react-icons/io5'


function Login()
{
	return (
		<div>
			<h1 className="join_text">Join the movement!</h1>

			<div className="all_emoji">
				<BsFillEmojiLaughingFill className="emoji"/>
				<img src="heart.svg" alt="" className="absolute left-[80%] top-[60%]"/>
				<img src="heart.svg" alt="" className="absolute right-[80%] top-[60%]"/>
				<img src="heart.svg" alt="" className="absolute left-[74%] top-[0%]"/>
			</div>

			<h1 className="sign_in_text">Sign-in or sign-up</h1>
			
			<button className="sign__in__intra ">
				<h1 className="text-white absolute left-[33%] top-[25%]">Continue with Intra</h1>
				<img src="g3.svg" className="ml-[70px]"/>
				
			</button>

			<button className="sign__in__google">
				<h1 className="absolute left-[33%] top-[25%]">Continue with Intra</h1>
				<img src="g4.svg" className="ml-[70px]"/>

			</button>
			<button className="go_back">
				<IoArrowBackCircle className="absolute top-[90%] left-[40%] w-[25px] h-[25px]"/>
				<h1 className="absolute top-[90%] left-[48%] text-[15px]">Go_back</h1>
			</button>

		</div>
	)
}

export default Login;