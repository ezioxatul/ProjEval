import "@/styles/globals.css";
import {NextUIProvider} from '@nextui-org/react'
import {useRouter} from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

