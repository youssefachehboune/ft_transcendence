import { BsEmojiLaughing } from 'react-icons/bs'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getText } from "../../api/lang";
function Success_div()
{
	const router = useRouter();

	useEffect(() => {
		const timeout = setTimeout(() => {
		  router.push('/2fa');
		}, 6000); 
	
		return () => clearTimeout(timeout);
	}, []);

	return (
		<div className="success">
			<BsEmojiLaughing className='emoji_icone' color='#5ACDA4'/>
			<h1 className='success_title'>{getText('SUCCESS')}</h1>
			<h1 className='success_text'>{getText('REDIRECT')} <span className='test text-[24px]'>...</span></h1>
		</div>
	)
}

export default Success_div;