import '@/styles/globals.css'
import '@/styles/sign_in.css'
import '@/styles/page.css'
import '@/styles/success.css'
import '../styles/landing.css'
import '../styles/auth.css'
import '../styles/MainDashBoard.css';
import '../styles/Dashboard.css'
import type { AppProps } from 'next/app'
import { motion, AnimatePresence } from 'framer-motion'
import { ChakraProvider } from '@chakra-ui/react'
import { StrictMode } from 'react'
export default function App({ Component, pageProps }: AppProps) {
  return (
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
  )
}
