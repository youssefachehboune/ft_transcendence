import React from 'react'
 
import { DataState } from '@/Hooks/user_info_data';
import Image from "next/image";

interface img_profile {
	state: DataState;
	avatar: string;
	data: any;
}
export default function Img_profile({ state, avatar, data }: img_profile) {

	const test = "the image is too large: max size(5 mb)"
	return (
		<div className="w-full h-[250px] flex items-center flex-col phone:h-[145px] Large-phone:h-[160px] desktop:h-[230px] laptop:h-[190px]">
			<h1 className="mt-[15px] font-sora text-[24px] font-[600] phone:text-[12px] Large-phone:text-[15px] desktop:text-[20px] laptop:text-[18px] ">
				Hello{" "}
				<span className="text-[#00DAEA]">{data.firstName}</span>
			</h1>
			<h1 className="font-sora text-[26px] font-[700] phone:text-[17px] Large-phone:text-[18px] laptop:text-[24px]">
			Let&apos;s Finish Setting Up!
			</h1>
			<div className="w-[130px] h-[130px] phone:w-[70px] phone:h-[70px] Large-phone:w-[80px] Large-phone:h-[80px] desktop:w-[120px]  desktop:h-[120px] laptop:w-[90px] laptop:h-[90px]">
				<Image
					width={'130'} height={'130'}
					className="w-full h-full rounded-full border-[#00DAEA] border-[1.5px] mt-[10px] select-none"
					src={avatar} alt={''} />
			</div>
			{state.errorLargeimg && (
				<p className="text-red-500 text-[10px] mt-[15px] phone:mt-[9px] phone:text-[8px] Large-phone:mt-[9px] Large-phone:text-[8px]">
					{test}
				</p>
			)}
		</div>

	)
}
