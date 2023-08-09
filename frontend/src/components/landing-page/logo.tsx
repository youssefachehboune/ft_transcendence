import Link from "next/link";
import Image from "next/image";

export default function Logo()
{
    return(
            <div>
                <Link href="/">
                    <Image width={'110'} height={'29'} src="/pipo.png" className="logo select-none" alt={""}>
                    </Image>
                </Link>
            </div>
    )
}

//


//phone:top-[40px] phone:w-[100px] phone:left-[40px]
//