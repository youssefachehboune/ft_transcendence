import { useRouter } from "next/router"
import { getText } from "../../../api/lang";
import Image from "next/image";

export default function Button_google()
{
	const router = useRouter();
	return (
		<button onClick={() => { router.push('http://localhost:3000/google') }} className="Google_button">
				<Image width={'20'} height={'20'} src="/g4.svg" className="Google_icone" alt={""}/>
				<h1 className="Google_text">{getText('GOOGLE_AUTH')}</h1>
		</button>
	)
}