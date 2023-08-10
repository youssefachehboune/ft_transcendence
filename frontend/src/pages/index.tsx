import Logo from '../components/landing-page/logo'
import Lang from '../components/landing-page/button-lang'
import Footer from '../components/landing-page/Footer'
import Main from '../components/landing-page/Main'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Cursor from '../components/landing-page/Cursor'
import { Triangle } from "react-loader-spinner";
export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500);
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
            <Cursor setColor={setChangeColor} color={changeColor} />
            <Logo />
            <Lang />
            <Main />
            <Footer setColor={setChangeColor} color={changeColor} />
          </div>
        </div>
          : <Triangle
            height="150"
            width="180"
            color="#fff"
            ariaLabel="line-wave"
            wrapperStyle={{}}
            wrapperClass="loader"
            visible={true}
          />
      }
    </>
  )
}