import Splash from './components/Splash'
import Map from "./components/Map"
import dynamic from 'next/dynamic'

export default function Home() {

  //const Map = dynamic(() => import("./components/Map"), { ssr: false });

  return (
    <>
      <Splash />
      <Map />
    </>
  )
}
