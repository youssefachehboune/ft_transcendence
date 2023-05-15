import Link from "next/link";

export default function Logo()
{
	return(
			<div>
				<Link href="/">
					<h2 className="z-1000 text-white text-5xl absolute top-[60px] left-[60px]
						for:text-2xl for:top-[35px]
						five:top-[35px] five:text-[2rem]
						one:top-[35px]
						one:text-[2rem]">
						PIP
						<span className='text-orange'>O</span>
					</h2>
				</Link>

			</div>
	)
}