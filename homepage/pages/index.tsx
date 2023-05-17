import Image from 'next/image'
import { Inter } from 'next/font/google'
import { AiOutlineArrowRight } from "react-icons/ai";
import Logo from '@/components/logo'
import Lang from '@/components/button-lang'
import Racket from '@/components/Racket'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  const data = {
    'english' : {
        'h1' : 'Welcome to my website',
        'p' : [
            'This is my first website',
            'I am learning React',
            'I am learning TypeScript',
            'I am learning how to use GitHub',
            'I am learning how to use Netlify',
            'I am learning how to use Vercel',
            'I am learning how to use Heroku',
            'I am learning how to use Firebase'
        ],
        'button' : 'Play now!'
    },
    'french' : {
        'h1' : 'Bienvenue sur mon site web',
        'p' : [
            'Ping Pong',
            'Ceci est mon premier site web',
            'J\'apprends React',
            'J\'apprends TypeScript',
            'J\'apprends comment utiliser GitHub',
            'J\'apprends comment utiliser Netlify',
            'J\'apprends comment utiliser Vercel',
            'J\'apprends comment utiliser Heroku',
            'J\'apprends comment utiliser Firebase'
        ],
        'button' : 'Jouons'
    }
  }
  return (

    <div id='container' className='h-[100vh] w-[100%] bg-my-bg'>
        <Logo />
        <Lang />
        <div className='main'>
          <div className='doc1'>
            <div className='textHead'>
              <h1>Lorem Ipsum</h1>
              <div className='circleHead'></div>
            </div>
            <div className='textBody'>
              <p><span>Lorem Ipsum</span> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            </div>
            <div className='lastbutton'>
            </div>
          </div>
          <div className='doc2'>
            <Racket/>
          </div>
        </div>
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
        <svg className='eclipse1' width="142" height="193" viewBox="0 0 142 193" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </svg>
        <svg className='eclipse2' width="142" height="193" viewBox="0 0 142 193" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </svg>
      </footer>
    </div>
  )
}
