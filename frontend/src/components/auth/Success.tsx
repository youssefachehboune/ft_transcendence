import { AiOutlineSafetyCertificate } from "react-icons/ai";
import Loading from "../success/Loading";

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
            <h1 className="h_success">Two-Factor<br/>Authentication Verified</h1>
                <h1 className="p_success">You are being redirected<Loading/></h1>
        </div>
    );

}