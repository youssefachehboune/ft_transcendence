import Link from "next/link";

export default function Logo()
{
    return(
            <div>
                <Link href="/">
                    <img src="pipo.png" className="z-1000 w-[160px] absolute top-[55px] left-[60px] duration-1000
                        phone:top-[40px] phone:w-[100px] phone:left-[40px]
                        Large-phone:top-[35px] Large-phone:w-[100px]
                        laptop:top-[45px] laptop:w-[110px]">
                    </img>
                </Link>

            </div>
    )
}