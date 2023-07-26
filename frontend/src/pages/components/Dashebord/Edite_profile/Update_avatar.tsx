import { FormControl, FormLabel } from '@chakra-ui/react'
import React, { ChangeEvent, useState } from 'react'
import { HiOutlineUpload } from 'react-icons/hi'

export default function Update_avatar({data, avatar, setavatar, setlargeimg, largeimg}: any) {
    const MAX_IMAGE_SIZE = 5242880;

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        setlargeimg('')
        setavatar("")
        const file = event.target.files?.[0];
        const reader = new FileReader();
      
        reader.onload = () => {
            setavatar(reader.result as string)
        };
        if (file) {
          if (file.size > MAX_IMAGE_SIZE) {
            setavatar("")
            setlargeimg("the image is too large: max size(5mb)")
          event.target.value = "";
          }
          reader.readAsDataURL(file);
        }
        };

  return (
    <div>
    <FormLabel>Update avatar</FormLabel>
    <div className='h-[150px] xl:h-[100px] flex flex-col justify-center items-center'>
        <div className='w-[140px] xl:w-[80px] xl:h-[80px] h-[140px] rounded-full'>
            <img src={avatar ? avatar : data.avatar} alt="" className='w-full rounded-full' />
        </div>
        {largeimg && <p className="text-[red] text-[12px] font-sora">{largeimg}</p>}
    </div>
    <FormControl mt={4} className='flex items-center justify-around h-[70px]'>
        <img
            onClick={() => {setavatar("https://api.dicebear.com/6.x/bottts/svg?eyes=bulging,dizzy,eva")}}
            src={"https://api.dicebear.com/6.x/bottts/svg?eyes=bulging,dizzy,eva"}
            className="w-[32px] h-[32px] select-none rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]"
        />
        <img
            onClick={() => {setavatar("https://api.dicebear.com/6.x/bottts/svg?baseColor=00acc1,1e88e5,5e35b1")}}
            src="https://api.dicebear.com/6.x/bottts/svg?baseColor=00acc1,1e88e5,5e35b1"
            className="w-[32px] select-none h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]"
        />
        <img
            onClick={() => {setavatar("https://api.dicebear.com/6.x/bottts/svg?backgroundType=gradientLinear,solid")}}
            src="https://api.dicebear.com/6.x/bottts/svg?backgroundType=gradientLinear,solid"
            className="w-[32px] select-none h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]"
        />
        <img
            onClick={() => {setavatar("https://api.dicebear.com/6.x/bottts/svg?seed=Aneka")}}
            src="https://api.dicebear.com/6.x/bottts/svg?seed=Aneka"
            className="w-[32px] select-none h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]"
        />
        <img
            onClick={() => {setavatar("https://api.dicebear.com/6.x/bottts/svg?seed=Felix")}}
            src="https://api.dicebear.com/6.x/bottts/svg?seed=Felix"
            className="w-[32px] select-none h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]"
        />
        <label htmlFor="file-input"><HiOutlineUpload  className='w-[25px] mt-[5px] h-[25px] phone:w-[15px] phone:h-[15px] Large-phone:w-[20px] Large-phone:h-[20px] laptop:w-[20px] laptop:h-[20px]'/></label>
        <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
        />
    </FormControl>
    </div>
  )
}
