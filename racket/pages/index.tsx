
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Racket from '@/Components/Racket'
const inter = Inter({ subsets: ['latin'] })




export default function Home() {

  return (
    <div className="h-[100vh] w-[100%] bg-back flex justify-center items-center">
      <div className='h-[700px] w-[700px] flex items-center justify-center '>
        <Racket/>
      </div>
    </div>
  )
}
