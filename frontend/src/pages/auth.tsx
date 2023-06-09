import Svg_image from "./components/sign_in/svg/Svg_image";
import Logo from "./components/landing-page/logo";
import Lang from './components/landing-page/button-lang'
import { useState } from 'react'
import Cursor from './components/landing-page/Cursor'
import Generate from "./components/auth/Generate";
export default function auth() {
    const [changeColor, setChangeColor] = useState(false);
    return (
        <div className="h-[100vh] w-[100%] relative overflow-hidden overscroll-none bg-my-bg">
            <Cursor setColor={setChangeColor} color={changeColor}/>
            <Svg_image setColor={setChangeColor} color={changeColor}/>
            <Logo/>
            <Lang />
            <Generate />

        </div>
    );
}