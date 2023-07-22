import { FormControl, FormLabel } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function Update_avatar({data, avatar, setavatar}: any) {
  return (
    <div>
    <FormLabel>Update avatar</FormLabel>
    <div className='h-[150px] xl:h-[100px] flex justify-center items-center'>
        <div className='w-[140px] xl:w-[80px] xl:h-[80px] h-[140px] rounded-full'>
            <img src={avatar ? avatar : data.avatar} alt="" className='w-full rounded-full' />
        </div>
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

    </FormControl>
    </div>
  )
}
