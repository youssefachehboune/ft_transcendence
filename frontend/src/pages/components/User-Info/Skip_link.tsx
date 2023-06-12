import { getText } from '@/pages/api/lang'
import Link from 'next/link'
import React from 'react'

export default function Skip_link() {
  return (
	<Link
	href={"/2fa"}
	className="text-[#00DAEA] mb-[-10px] text-[14px] font-sora font-[600] phone:text-[10px] phone:mb-[5px] Large-phone:text-[10px] Large-phone:tracking-[0] desktop:mt-[5px]">
	{getText("SKIP")}
	</Link>
  )
}
