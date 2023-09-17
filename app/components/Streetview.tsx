"use client"
import { MapContainer, TileLayer } from 'react-leaflet'
import Label from './../components/Label'


const Map = () =>{

    return (
      <MapContainer id="Start" center={[34.1083,-117.2898]} zoom={5}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Label text={"Hello"} latlng={[34.1083,-117.2898]}/>
    </MapContainer>
    )
}


export default Map