import { BsEmojiLaughing } from 'react-icons/bs'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getText } from "../../api/lang";
function Success_div()
{
	const router = useRouter();

	// useEffect(() => {
	// 	const timeout = setTimeout(() => {
	// 	  router.push('/2fa');
	// 	}, 6000); 
	
	// 	return () => clearTimeout(timeout);
	// }, []);

	return (
		<div className="success flex items-center">
			<div className='flex w-full h-[250px] phone:h-[180px] Large-phone:h-[200px] flex-col items-center'>
			<BsEmojiLaughing className='emoji_icone' color='#5ACDA4'/>
			<h1 className='success_title'>{getText('SUCCESS')}</h1>
			<h1 className='success_text test phone:before:right-[12%] laptop:before:right-[10%] Large-phone:before:right-[15%]'>{getText('REDIRECT')} <span className='text-[24px]'>...</span></h1>

			</div>
		</div>
	)
}

export default Success_div;