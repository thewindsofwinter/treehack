import Splash from './components/Splash'
import dynamic from 'next/dynamic'

export default function Home() {

  const Map = dynamic(() => import("./components/Map"), { ssr: false });

  return (
    <>
      <Splash />
      <Map />
    </>
  )
}
