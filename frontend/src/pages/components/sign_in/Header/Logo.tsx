import Link from "next/link";

export default function Logo()
{
	return(
			<div>
				<Link href="/">
					<img src="pipo.png" className="Logo-sign"></img>
				</Link>

			</div>
	)
}