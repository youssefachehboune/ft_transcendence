import Logo from './components/landing-page/logo'
import Lang from './components/landing-page/button-lang'
import Footer from './components/landing-page/Footer'
import Main from './components/landing-page/Main'
import Head from 'next/head'
import { useState } from 'react'
import Cursor from './components/landing-page/Cursor'
export default function Home() {

  const [changeColor, setChangeColor] = useState(false);
  return (
    <div>
      <Head>
        <title>PIPO , Pong Game</title>
      </Head>
    <div id='container' className=''>
        <Cursor setColor={setChangeColor} color={changeColor}/>
        <Logo />
        <Lang />
        <Main />
        <Footer setColor={setChangeColor} color={changeColor}/>
    </div>
    </div>
  )
}
