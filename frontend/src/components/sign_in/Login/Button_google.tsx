import { useRouter } from "next/router"

import Image from "next/image";

export default function Button_google()
{
	const router = useRouter();
	return (
		<button onClick={() => { router.push('http://localhost:3000/google') }} className="Google_button">
				<Image width={'20'} height={'20'} src="/g4.svg" className="Google_icone" alt={""}/>
				<h1 className="Google_text">Continue with Google</h1>
		</button>
	)
}