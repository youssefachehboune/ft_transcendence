import Image from 'next/image'
import { Inter } from 'next/font/google'

import Logo from '../public/vercel.svg'

import Button from '@/components/button-lang';
const inter = Inter({ subsets: ['latin'] })
export default function Home() {

  return (

    <div id='container' className='h-[100vh] w-[100%] bg-my-bg'>
      <div className='bck'>
        <div className='cyl1'></div>
        <div className='cyl2'></div>
        <div className='cyl3'></div>
        <div className='cyl4'></div>
      </div>
      <footer>
        <div className="custom-shape-divider-bottom-1684173583">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
          </svg>
        </div>
          {/* <svg className="eclipse" width="142" height="193" viewBox="0 0 142 193" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_149_445)">
              <circle cx="0.5" cy="10.5" r="9.5" fill="#AFAFAF"/>
              <circle cx="0.5" cy="38.5" r="9.5" fill="#AFAFAF"/>
              <circle cx="0.5" cy="122.5" r="9.5" fill="#171926"/>
              <circle cx="0.5" cy="150.5" r="9.5" fill="#171926"/>
              <circle cx="0.5" cy="66.5" r="9.5" fill="#AFAFAF"/>
              <circle cx="0.5" cy="94.5" r="9.5" fill="#171926"/>
              <circle cx="142.5" cy="38.5" r="9.5" fill="#AFAFAF"/>
              <circle cx="142.5" cy="66.5" r="9.5" fill="#AFAFAF"/>
              <circle cx="142.5" cy="150.5" r="9.5" fill="#171926"/>
              <circle cx="142.5" cy="178.5" r="9.5" fill="#171926"/>
              <circle cx="142.5" cy="94.5" r="9.5" fill="#AFAFAF"/>
              <circle cx="142.5" cy="122.5" r="9.5" fill="#171926"/>
              <circle cx="29.5" cy="16.5" r="9.5" fill="#AFAFAF"/>
              <circle cx="29.5" cy="44.5" r="9.5" fill="#AFAFAF"/>
              <circle cx="29.5" cy="128.5" r="9.5" fill="#171926"/>
              <circle cx="29.5" cy="156.5" r="9.5" fill="#171926"/>
              <circle cx="29.5" cy="72.5" r="9.5" fill="#AFAFAF"/>
              <circle cx="29.5" cy="100.5" r="9.5" fill="#171926"/>
              <circle cx="58.5" cy="23.5" r="9.5" fill="#AFAFAF"/>
              <circle cx="58.5" cy="51.5" r="9.5" fill="#AFAFAF"/>
              <circle cx="58.5" cy="135.5" r="9.5" fill="#171926"/>
              <circle cx="58.5" cy="163.5" r="9.5" fill="#171926"/>
              <circle cx="58.5" cy="79.5" r="9.5" fill="#AFAFAF"/>
              <circle cx="58.5" cy="107.5" r="9.5" fill="#171926"/>
              <circle cx="87.5" cy="29.5" r="9.5" fill="#AFAFAF"/>
              <circle cx="87.5" cy="57.5" r="9.5" fill="#AFAFAF"/>
              <circle cx="87.5" cy="141.5" r="9.5" fill="#171926"/>
              <circle cx="87.5" cy="169.5" r="9.5" fill="#171926"/>
              <circle cx="87.5" cy="85.5" r="9.5" fill="#AFAFAF"/>
              <circle cx="87.5" cy="113.5" r="9.5" fill="#171926"/>
              <circle cx="116.5" cy="34.5" r="9.5" fill="#AFAFAF"/>
              <circle cx="116.5" cy="62.5" r="9.5" fill="#AFAFAF"/>
              <circle cx="116.5" cy="146.5" r="9.5" fill="#171926"/>
              <circle cx="116.5" cy="174.5" r="9.5" fill="#171926"/>
              <circle cx="116.5" cy="90.5" r="9.5" fill="#AFAFAF"/>
              <circle cx="116.5" cy="118.5" r="9.5" fill="#171926"/>
              </g>
              <defs>
              <clipPath id="clip0_149_445">
              <rect width="142" height="193" fill="white"/>
              </clipPath>
              </defs>
          </svg> */}
      </footer>

      {/* <header className="flex flex-wrap justify-between">
        <div className="flex items-center">
          <a href="##"><img src="pipo.png" alt="" className='w-[200px]'/></a>
          </div>
        <div>
        </div>
        <div>
          <Button />
        </div>
      </header> */}
    </div>
  )
}
