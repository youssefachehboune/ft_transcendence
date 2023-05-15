export default function Button_google()
{
	return (
		<button className="w-[325px] h-[55px] bg-white rounded-[30px] absolute top-[70%] left-[8%]
							hover:border-[2px] hover:border-green hover:border-solid
							for:w-[150px] for:h-[30px] for:left-[60px] for:top-[200px]
							one:w-[200px] one:h-[40px] one:left-[50px] one:top-[230px]
							five:w-[250px] five:h-[50px] five:left-[50px] five:top-[250px]
">
				<h1 className="absolute left-[33%] top-[25%] for:text-[10px] for:left-[25%] five:text-[15px] one:text-[14px] one:left-[30%]">Continue with Google</h1>
				<img src="g4.svg" className="ml-[70px] for:w-[15px] for:ml-[20px] five:w-[20px] five:ml-[35px] one:ml-[35px]"/>
		</button>
	)
}