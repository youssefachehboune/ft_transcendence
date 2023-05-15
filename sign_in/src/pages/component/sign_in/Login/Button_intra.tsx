export default function Button_intra()
{
	return (
		<button className="w-[325px] h-[55px] bg-Sky rounded-[30px] absolute top-[55%] left-[8%]
							hover:border-[2px] hover:border-green hover:border-solid
						   for:w-[150px] for:h-[30px] for:left-[60px] for:top-[160px]
						   one:w-[200px] one:h-[40px] one:left-[50px] one:top-[180px]
						   five:w-[250px] five:h-[50px] five:left-[50px] five:top-[190px]
			">
			<h1 className="text-white absolute left-[33%] top-[25%] for:text-[10px] for:left-[25%] five:text-[15px] one:text-[14px] one:left-[30%]">Continue with Intra</h1>
			<img src="g3.svg" className="ml-[70px] for:w-[15px] for:ml-[20px] five:w-[20px] five:ml-[35px] one:w-[20px] one:ml-[35px]"/>
		</button>
	)
}