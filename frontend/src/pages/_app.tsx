import '@/styles/globals.css'
import '@/styles/sign_in.css'
import '@/styles/page.css'
import '@/styles/success.css'
import '../styles/landing.css'
import '../styles/auth.css'
import '../styles/MainDashBoard.css';
import '../styles/Dashboard.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { AppWrapper } from './context'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
        <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
      </ChakraProvider>
  )
}