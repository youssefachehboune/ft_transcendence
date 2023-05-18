
import FrameHeader from '@/components/Frame-header'
import Logo from '@/components/logo'
import Lang from '@/components/button-lang'
import Racket from '@/components/Racket'
import LeftSide from '@/components/left-side'
import Footer from '@/components/Footer'

export default function Home() {

  return (


// Usage
    <div id='container' className='h-[100vh] w-[100%] bg-my-bg'>
        <Logo />
        <Lang />
        <div className='main'>
            <LeftSide />
            <Racket/>
        </div>
        <FrameHeader />
        <Footer />
      
    </div>
  )
}
