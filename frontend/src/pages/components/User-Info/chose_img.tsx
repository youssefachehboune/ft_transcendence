import React from 'react'

interface chose_img
{
	avatar: string;
	return_avatar: string;
	handleAvatarSelection: (avatarUrl: string) => void;
}
export default function Chose_img({avatar, return_avatar, handleAvatarSelection} : chose_img) {
  return (
	<div className="flex w-[220px] h-[70px] ml-[80px] justify-around items-center phone:w-[180px] phone:h-[35px] phone:ml-[35px] Large-phone:w-[180px] Large-phone:h-[40px] Large-phone:ml-[45px] laptop:h-[45px] laptop:w-[180px] laptop:ml-[90px] desktop:h-[50px]">
	<img
		src={avatar == return_avatar ? "https://api.dicebear.com/6.x/bottts/svg?eyes=bulging,dizzy,eva" : return_avatar}
		onClick={() =>
		handleAvatarSelection(
			avatar == return_avatar ? "https://api.dicebear.com/6.x/bottts/svg?eyes=bulging,dizzy,eva" : return_avatar
		)
		}
		className="w-[32px] h-[32px] select-none rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]"
	/>
	<img
		src="https://api.dicebear.com/6.x/bottts/svg?baseColor=00acc1,1e88e5,5e35b1"
		onClick={() =>
		handleAvatarSelection("https://api.dicebear.com/6.x/bottts/svg?baseColor=00acc1,1e88e5,5e35b1")
		}
		className="w-[32px] select-none h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]"
	/>
	<img
		src="https://api.dicebear.com/6.x/bottts/svg?backgroundType=gradientLinear,solid"
		onClick={() =>
		handleAvatarSelection(
			"https://api.dicebear.com/6.x/bottts/svg?backgroundType=gradientLinear,solid"
		)
		}
		className="w-[32px] select-none h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]"
	/>
	<img
		src="https://api.dicebear.com/6.x/bottts/svg?seed=Aneka"
		onClick={() =>
		handleAvatarSelection(
			"https://api.dicebear.com/6.x/bottts/svg?seed=Aneka"
		)
		}
		className="w-[32px] select-none h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]"
	/>
	<img
		src="https://api.dicebear.com/6.x/bottts/svg?seed=Felix"
		onClick={() =>
		handleAvatarSelection(
			"https://api.dicebear.com/6.x/bottts/svg?seed=Felix"
		)
		}
		className="w-[32px] select-none h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]"
	/>
	</div>
  )
}
