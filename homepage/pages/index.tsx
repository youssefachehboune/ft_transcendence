import FrameHeader from '@/components/Frame-header'
import Logo from '@/components/logo'
import Lang from '@/components/button-lang'
import Footer from '@/components/Footer'
import Main from '@/components/Main'
export default function Home() {

  return (


// Usage
    <div id='container' className='h-[100vh] w-[100%] bg-my-bg'>
        <Logo />
        <Lang />
        <Main />
        <FrameHeader />
        <Footer />
    </div>
  )
}
