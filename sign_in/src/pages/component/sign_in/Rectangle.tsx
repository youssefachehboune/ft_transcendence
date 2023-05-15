export default function Rectangle()
{
	return (
		<div>
				{/* left rectangles */}
				<div className="w-[205px] h-[478px] fixed ml-[-87px] mb-[-250px] bottom-[0]  rounded-b-[135px] rounded-l-[135px] bg-orange rotate-[-140.9deg]
					for:w-[105px]  for:h-[408px] for:ml-[-102px]
					one:w-[105px]  one:h-[408px] one:ml-[-105px]
					five:w-[154px]  five:h-[308px] five:ml-[-85px] five:mb-[-150px]
					">
				</div>
				
				<div className="w-[85px] h-[130px] fixed left-[-33px] mb-[170px] bottom-[0] rounded-t-[0px]  rounded-b-[135px] rounded-l-[135px] bg-orange rotate-[-140.9deg]
					for:w-[40px]  for:h-[120px] for:mb-[80px]
					one:w-[40px]  one:h-[120px] one:mb-[80px]
					five:w-[65px]  five:h-[100px] five:mb-[140px] five:rotate-[-125.1deg]
					">

				</div>
				<div className="w-[91px] h-[180px] fixed mb-[-95px] ml-[180px] bottom-[0] left-[0] rounded-t-[0px]  rounded-b-[135px] rounded-l-[135px] bg-orange rotate-[-140.9deg]
					for:w-[40px]  for:h-[150px] for:ml-[60px]
					one:w-[40px]  one:h-[150px] one:ml-[60px]
					five:w-[65px]  five:h-[140px] five:ml-[100px]
					">

				</div>

				{/* right rectangles */}
				<div className="w-[205px] h-[478px] fixed mr-[-87px] mt-[-250px] top-[0] right-[0] rounded-t-[0px]  rounded-b-[135px] rounded-l-[135px] bg-blue rotate-[40.1deg]
					for:w-[105px]  for:h-[408px] for:mr-[-105px]
					one:w-[105px]  one:h-[408px] one:ml-[-105px]
					five:w-[155px]  five:h-[308px] five:mr-[-85px] five:mt-[-150px]
					">
				</div>

				<div className="w-[85px] h-[130px] fixed mr-[200px] mt-[-54px] top-[0] right-[0] rounded-b-[135px] rounded-l-[135px] bg-blue rotate-[41.1deg]
					for:w-[30px]  for:h-[100px] for:mr-[70px]
					one:w-[30px]  one:h-[100px] one:mr-[80px]
					five:w-[65px]  five:h-[100px] five:mr-[120px] five:mt-[-40px]
					">
				</div>

				<div className="w-[91px] h-[180px] fixed mr-[-30px] mt-[110px] right-[0] rounded-t-[0px] rounded-b-[135px] rounded-l-[135px] bg-blue rotate-[50.1deg]
					for:w-[30px]  for:h-[100px] for:mr-[-20px] for:mt-[60px]
					one:w-[30px]  one:h-[100px] one:mr-[-20px] one:mt-[40px] one:rotate-[45.1deg]
					five:w-[65px]  five:h-[140px] five:mr-[-35px] five:mt-[85px] five:rotate-[55.1deg]
					">
				</div>
				<div className="w-[80px] h-[190px] fixed mr-[27rem] mb-[-5rem] right-[0] bottom-[0] rounded-t-[0px] rounded-b-[135px] rounded-l-[135px] bg-blue rotate-[-143.55deg]
					for:w-[40px]  for:h-[150px] for:mr-[7rem]
					one:w-[40px]  one:h-[150px] one:mr-[9rem]
					five:w-[60px]  five:h-[150px] five:mr-[10rem]
					">
				</div>
		</div>
	)
}