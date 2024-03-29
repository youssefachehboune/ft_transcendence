import { useRouter } from "next/router";

import Image from "next/image";

export default function Button_intra()
{
	const router = useRouter();
	return (
		<button onClick={() => { router.push('http://localhost:3000/intra') }} className="Intra_button">
			<Image width={'20'} height={'20'} src="/g3.svg" className="Intra_icone" alt={""}/>
			<h1 className="Intra_text">Continue with Intra</h1>
		</button>
	)
}