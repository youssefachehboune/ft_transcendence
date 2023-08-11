import Logo from '../components/landing-page/logo'
import Lang from '../components/landing-page/button-lang'
import Footer from '../components/landing-page/Footer'
import Main from '../components/landing-page/Main'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Cursor from '../components/landing-page/Cursor'
import Loader from '@/components/Loader'
export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }
    , [])
  const [changeColor, setChangeColor] = useState(false);
  return (
    <>
      {
      !loading ? <div>
          <Head>
            <title>PIPO , Pong Game</title>
          </Head>
          <div id='container' className=''>
            {/* <Cursor setColor={setChangeColor} color={changeColor} /> */}
            <Logo />
            {/* <Lang /> */}
            <Main />
            <Footer setColor={setChangeColor} color={changeColor} />
          </div>
        </div>
          : <Loader/>
      }
    </>
  )
}