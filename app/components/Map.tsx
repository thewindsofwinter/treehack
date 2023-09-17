"use client"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Map = () =>{
    return (
      <MapContainer id="Start" center={[34.1083,-117.2898]} zoom={5}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[34.1083,-117.2898]}>
          <Popup>
            Bad Canopy C
          </Popup>
        </Marker>
    </MapContainer>
    )
}


export default Map