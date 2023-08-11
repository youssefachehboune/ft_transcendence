import { AiOutlineSafetyCertificate } from "react-icons/ai";
import Loading from "../success/Loading";
import { GetText } from '@/pages/api/lang';
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Success() {
    const router = useRouter();

	useEffect(() => {
		const timeout = setTimeout(() => {
		  router.push('/Dashboard');
		}, 2000); 
	
		return () => clearTimeout(timeout);
	}, [router]);
    return (
        <div className="success_auth">
            <AiOutlineSafetyCertificate className="icon_success" color="#5ACDA4"/>
            <h1 className="h_success">{GetText('AUTH_SUCCESS_HEADER')}<br/>{GetText('AUTH_SUCCESS_TEXT')}</h1>
                <h1 className="p_success">{GetText('REDIRECT')}<Loading/></h1>
        </div>
    );

}