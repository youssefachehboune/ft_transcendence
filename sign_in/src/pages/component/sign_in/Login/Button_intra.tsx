export default function Button_intra()
{
	return (
		<button className="w-[325px] h-[55px] bg-Sky rounded-[30px] absolute top-[55%] left-[8%]
							hover:border-[2px] hover:border-green hover:border-solid
						   phone:w-[150px] phone:h-[30px] phone:left-[60px] phone:top-[160px]
						   Large-phone:w-[200px] Large-phone:h-[40px] Large-phone:left-[50px] Large-phone:top-[180px]
						   laptop:w-[250px] laptop:h-[50px] laptop:left-[50px] laptop:top-[190px]
			">
			<h1 className="text-white absolute left-[33%] top-[25%] font-medium
							phone:text-[10px] phone:left-[25%]
							Large-phone:text-[14px] Large-phone:left-[25%]
							laptop:text-[15px]
							">
							Continue with Intra
			</h1>
			<img src="g3.svg" className="ml-[70px] phone:w-[15px] phone:ml-[20px] 
										Large-phone:w-[20px] Large-phone:ml-[25px]
										laptop:w-[20px] laptop:ml-[50px]
									"/>
		</button>
	)
}