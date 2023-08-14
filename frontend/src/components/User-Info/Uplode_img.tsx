import React, { ChangeEvent, useRef } from 'react'
 
import { AiOutlineUpload } from 'react-icons/ai';

interface uplode_img
{
	handleImageUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}
export default function Uplode_img({handleImageUpload} : uplode_img) {
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
	<div className="flex justify-center h-[30px] desktop:h-[20px] laptop:h-[20px] Large-phone:h-[20px] phone:h-[15px]">
		<label
			htmlFor="file-input"
			className="text-[12px] mr-[7px] font-sora font-[500] cursor-pointer phone:text-[10px] laptop:text-[13px]  Large-phone:ml-[-10px] laptop:ml-[-15px]"
		>
			Upload an Avatar
		</label>
		<input
			id="file-input"
			ref={fileInputRef}
			type="file"
			accept="image/*"
			onChange={handleImageUpload}
			style={{ display: "none" }}
		/>
	<AiOutlineUpload className="mr-[-5px] phone:mr-0 Large-phone:mr-0 laptop:mr-0" />
	</div>
  )
}
