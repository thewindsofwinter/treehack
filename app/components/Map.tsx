"use client"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

// const fetch = require('node-fetch'); // For Node.js environment
const apiKey = "AIzaSyCwEgxhHsfCIZz9rRDOHvwpHQmTnhv8osk" // move this later

const endpoint = `https://airquality.googleapis.com/v1/mapTypes/TYPE/heatmapTiles/2/0/1?key=${apiKey}`

const Map = () =>{
    return (
      <MapContainer id="Start" center={[51.505, -0.09]} zoom={13} style={{  height: '80vh',
                                                                 width: '70%',
                                                                 margin: '10vh',
                                                                 left: 'calc(15% - 10vh)',
                                                                 position: 'relative',
                                                                 borderRadius: '20px'
                                                                  }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A sample marker!!!!!
        </Popup>
      </Marker>
    </MapContainer>
    )
}


export default Map