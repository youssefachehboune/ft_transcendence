import { AiOutlineSafetyCertificate } from "react-icons/ai";
import Loading from "../success/Loading";
import { getText } from '@/pages/api/lang';

export default function Success() {
    return (
        <div className="success_auth">
            <AiOutlineSafetyCertificate className="icon_success" color="#5ACDA4"/>
            <h1 className="h_success">{getText('AUTH_SUCCESS_HEADER')}<br/>{getText('AUTH_SUCCESS_TEXT')}</h1>
                <h1 className="p_success">{getText('REDIRECT')}<Loading/></h1>
        </div>
    );

}