export default function Button_google()
{
	return (
		<button className="w-[325px] h-[55px] bg-white rounded-[30px] absolute top-[70%] left-[8%] font-sans border-[1px] border-solid border-[#DADCE0]
							hover:border-[2px] hover:border-green hover:border-solid
							phone:w-[150px] phone:h-[30px] phone:left-[60px] phone:top-[200px]
							Large-phone:w-[200px] Large-phone:h-[40px] Large-phone:left-[50px] Large-phone:top-[230px]
							laptop:w-[250px] laptop:h-[50px] laptop:left-[50px] laptop:top-[250px]
">
				<h1 className="absolute left-[33%] top-[25%] font-medium phone:text-[10px] phone:left-[25%] laptop:text-[15px] Large-phone:text-[14px] Large-phone:left-[25%]">Continue with Google</h1>
				<img src="g4.svg" className="ml-[70px] phone:w-[15px] phone:ml-[20px] laptop:w-[20px] laptop:ml-[50px] Large-phone:ml-[25px]"/>
		</button>
	)
}