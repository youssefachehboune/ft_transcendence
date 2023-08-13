import { FormControl, FormLabel } from '@chakra-ui/react'
import React, { ChangeEvent, useState } from 'react'
import { HiOutlineUpload } from 'react-icons/hi'
import Image from "next/image";

export default function Update_avatar({ data, avatar, setavatar, setlargeimg, largeimg }: any) {
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
          <Image width={'140'} height={'140'} src={avatar} alt="" className='w-full rounded-full' />
        </div>
        {largeimg && <p className="text-[red] text-[12px] font-sora">{largeimg}</p>}
      </div>
      <FormControl mt={4} className='flex items-center justify-around h-[70px]'>
        <Image
          width={'32'} height={'32'}
          onClick={() => { setavatar("/avatar1.png"); }}
          src={"/avatar1.png"}
          className="w-[32px] h-[32px] select-none rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]" alt={''} />
        <Image
          width={'32'} height={'32'}
          onClick={() => { setavatar("/avatar2.png"); }}
          src="/avatar2.png"
          className="w-[32px] select-none h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]" alt={''} />
        <Image
          width={'32'} height={'32'}
          onClick={() => { setavatar("/avatar3.png"); }}
          src="/avatar3.png"
          className="w-[32px] select-none h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]" alt={''} />
        <Image
          width={'32'} height={'32'}
          onClick={() => { setavatar("/avatar4.png"); }}
          src="/avatar4.png"
          className="w-[32px] select-none h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]" alt={''} />
        <Image
          width={'32'} height={'32'}
          onClick={() => { setavatar("/avatar5.png"); }}
          src="/avatar5.png"
          className="w-[32px] select-none h-[32px] rounded-full border-[#00DAEA] border-[1.5px] cursor-pointer phone:w-[25px] phone:h-[25px] Large-phone:w-[25px] Large-phone:h-[25px] laptop:w-[27px] laptop:h-[27px]" alt={''} />
        <label htmlFor="file-input"><HiOutlineUpload className='w-[25px] mt-[5px] h-[25px] phone:w-[15px] phone:h-[15px] Large-phone:w-[20px] Large-phone:h-[20px] laptop:w-[20px] laptop:h-[20px]' /></label>
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
