import Splash from './components/Splash'
import dynamic from 'next/dynamic'

export default function Home() {

  const Map = dynamic(() => import("./components/Map"), { ssr: false });

  return (
    <>
      <Splash />
      <h1 id="Start">This comes after!!!</h1>
      <Map />
    </>
  )
}
