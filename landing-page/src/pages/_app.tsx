import '../styles/landing.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>PIPO , Ping Pong Game</title>
      </Head>
      <Component {...pageProps} />
    </div>
  )
}
