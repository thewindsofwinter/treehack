import bg from '../assets/splash.png'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = () =>{
    return (
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A sample marker with a popup.
        </Popup>
      </Marker>
    </MapContainer>
    )
}


export default Map