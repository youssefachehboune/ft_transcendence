import { BsEmojiLaughing } from 'react-icons/bs'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GetText } from "../../pages/api/lang";
import Loading from './Loading';
function Success_div()
{
	const router = useRouter();

	useEffect(() => {
		const timeout = setTimeout(() => {
		  router.push('/auth');
		}, 2000); 
	
		return () => clearTimeout(timeout);
	}, [router]);

	return (
		<div className="success flex items-center">
			<div className='flex w-full h-[250px] phone:h-[180px] Large-phone:h-[200px] flex-col items-center'>
				<BsEmojiLaughing className='emoji_icone' color='#5ACDA4'/>
				<h1 className='success_title'>{GetText('SUCCESS')}</h1>
				<h1 className='success_text'>{GetText('REDIRECT')}<Loading/></h1>
			</div>
		</div>
	)
}

export default Success_div;