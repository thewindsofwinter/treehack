import Image from 'next/image'
import Splash from './components/Splash'
import splashImage from './assets/splash.png'

export default function Home() {
  return (
    <>
      <Splash/>
      <h1>This comes after</h1>
    </>
  )
}
