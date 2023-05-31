import { useRouter } from "next/router"
import { getText } from "../../../api/lang";

export default function Button_google()
{
	const router = useRouter();
	return (
		<button onClick={() => { router.push('http://localhost:3000/google') }} className="Google_button">
				<h1 className="Google_text">{getText('GOOGLE_AUTH')}</h1>
				<img src="g4.svg" className="Google_icone"/>
		</button>
	)
}