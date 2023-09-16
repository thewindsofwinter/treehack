import Image from 'next/image'
import Splash from './components/Splash'
import splashImage from './assets/splash.png'
import Map from './components/Map'
export default function Home() {
  return (
    <>
      <Splash/>
      <h1 id="Start">This comes after</h1>
      <Map></Map>
    </>
  )
}
