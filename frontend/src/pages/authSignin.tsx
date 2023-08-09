import Svg_image from "../components/sign_in/svg/Svg_image";
import Logo from "../components/landing-page/logo";
import Lang from '../components/landing-page/button-lang'
import { useState } from 'react'
import Cursor from '../components/landing-page/Cursor'
import Rectangle from "../components/sign_in/Header/Rectangle";
import Text from "../components/auth/Text";
import Success from "../components/auth/Success";
import AuthLogin from "../components/auth/auth_login";
export default function authSignin() {
    const [changeColor, setChangeColor] = useState(false);
    const [show, setShow] = useState(true);
    
    return (
        <div className="h-[100vh] w-[100%] relative overflow-hidden flex justify-center items-center overscroll-none bg-my-bg">
            <Cursor setColor={setChangeColor} color={changeColor}/>
            <Svg_image setColor={setChangeColor} color={changeColor}/>
            <Logo/>
            <Lang />
            {
                show ? <AuthLogin setVal={setShow} val={show}/> : <Success/>
            }
            <Text />
            <Rectangle setColor={setChangeColor} color={changeColor}/>
        </div>
    );
}