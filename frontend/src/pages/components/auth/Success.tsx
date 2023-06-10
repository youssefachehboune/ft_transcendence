import { AiOutlineSafetyCertificate } from "react-icons/ai";



export default function Success() {
    return (
        <div className="success">
            <AiOutlineSafetyCertificate className="icon_success" color="#5ACDA4"/>
            <h1 className="h_success">Two-Factor<br/>Authentication Verfied</h1>
            <p className="p_success">You are being redirected ...</p>
        </div>
    );

}