import FrameHeader from './components/landing-page/Frame-header'
import Logo from './components/landing-page/logo'
import Lang from './components/landing-page/button-lang'
import Footer from './components/landing-page/Footer'
import Main from './components/landing-page/Main'
import Head from 'next/head'
export default function Home() {

  return (
    <div>
      <Head>
        <title>PIPO , Ping Pong Game</title>
      </Head>
    <div id='container' className=''>
        <Logo />
        <Lang />
        <Main />
        <FrameHeader />
        <Footer />
    </div>
    </div>
  )
}
