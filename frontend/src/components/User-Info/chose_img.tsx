import React from 'react'
import Image from "next/image";

export default function Chose_img({ avatar, return_avatar, handleAvatarSelection }: any) {
	return (
		<div className="flex w-[220px] h-[70px] ml-[80px] justify-around items-center phone:w-[180px] phone:h-[35px] phone:ml-[35px] Large-phone:w-[180px] Large-phone:h-[40px] Large-phone:ml-[45px] laptop:h-[45px] laptop:w-[180px] laptop:ml-[90px] desktop:h-[50px]">
			<Image
				width={'32'} height={'32'}
				src={avatar == return_avatar ? "/avatar1.png" : return_avatar}
				onClick={() => handleAvatarSelection(
					avatar == return_avatar ? "/avatar1.png" : return_avatar
				)}
				className="w-[32px] h-[32px] select-none rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]" alt={''} />
			<Image
				width={'32'} height={'32'}
				src="/avatar2.png"
				onClick={() => handleAvatarSelection("/avatar2.png")}
				className="w-[32px] select-none h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]" alt={''} />
			<Image
				width={'32'} height={'32'}
				src="/avatar3.png"
				onClick={() => handleAvatarSelection(
					"/avatar3.png"
				)}
				className="w-[32px] select-none h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]" alt={''} />
			<Image
				width={'32'} height={'32'}
				src="/avatar4.png"
				onClick={() => handleAvatarSelection(
					"/avatar4.png"
				)}
				className="w-[32px] select-none h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]" alt={''} />
			<Image
				width={'32'} height={'32'}
				src="/avatar5.png"
				onClick={() => handleAvatarSelection(
					"/avatar5.png"
				)}
				className="w-[32px] select-none h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]" alt={''} />
		</div>
	)
}
