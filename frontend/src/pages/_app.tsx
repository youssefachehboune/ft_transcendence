import '@/styles/globals.css'
import '@/styles/sign_in.css'
import '@/styles/page.css'
import '../styles/landing.css'
import '../styles/auth.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  )
}
