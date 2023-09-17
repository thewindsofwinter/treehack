"use client"
// import { MapContainer, TileLayer } from 'react-leaflet'
// import Label from './../components/Label'
// import React from 'react'
import { GoogleMap, LoadScript, OverlayView } from '@react-google-maps/api';

// const fetch = require('node-fetch'); // For Node.js environment
const apiKey = "AIzaSyCwEgxhHsfCIZz9rRDOHvwpHQmTnhv8osk" // move this later

// const Map = () =>{
//     return (

//       <MapContainer id="Start" center={[34.1083,-117.2898]} zoom={5}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <TileLayer
//                 url={`https://airquality.googleapis.com/v1/mapTypes/US_AQI/heatmapTiles/{z}/{x}/{y}?key=${apiKey}`}
//                 opacity = {0.5}
//         />
// <Label text={"Hello"} latlng={[34.1083,-117.2898]}/>

//       </MapContainer>
//     )
// }

const center = {
  lat: 34.1083,
  lng: -117.2898
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        id="map"
        center={center}
        zoom={5}
        options={{
          // mapTypeId: 'hybrid',
          streetViewControl: false,
          // mapTypeControl: false
        }}
      >
      {/* <OverlayView
          position={center}
          mapPaneName={OverlayView.OVERLAY_LAYER}
      >
          <img 
            src={`https://airquality.googleapis.com/v1/mapTypes/US_AQI/heatmapTiles/5/5/5?key=${apiKey}`} 
            alt="Air Quality" 
            style={{ opacity: 0.5 }} 
          />
        </OverlayView> */}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map