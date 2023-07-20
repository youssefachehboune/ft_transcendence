import { FormControl, FormLabel } from '@chakra-ui/react'
import React from 'react'

export default function Update_avatar() {
  return (
    <div>
    <FormLabel>Update avatar</FormLabel>
    <FormControl mt={4} className='flex items-center justify-around h-[70px]'>
        <img
            src={"https://api.dicebear.com/6.x/bottts/svg?eyes=bulging,dizzy,eva"}
            className="w-[32px] h-[32px] select-none rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]"
        />
        <img
            src="https://api.dicebear.com/6.x/bottts/svg?baseColor=00acc1,1e88e5,5e35b1"
            className="w-[32px] select-none h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]"
        />
        <img
            src="https://api.dicebear.com/6.x/bottts/svg?backgroundType=gradientLinear,solid"
            className="w-[32px] select-none h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]"
        />
        <img
            src="https://api.dicebear.com/6.x/bottts/svg?seed=Aneka"
            className="w-[32px] select-none h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]"
        />
        <img
            src="https://api.dicebear.com/6.x/bottts/svg?seed=Felix"
            className="w-[32px] select-none h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]"
        />

    </FormControl>
    </div>
  )
}
