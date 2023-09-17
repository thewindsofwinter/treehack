"use client"
// import { MapContainer, TileLayer } from 'react-leaflet'
// import Label from './../components/Label'
// import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

// const fetch = require('node-fetch'); // For Node.js environment
const apiKey = "AIzaSyCwEgxhHsfCIZz9rRDOHvwpHQmTnhv8osk" // move this later

const center = {
  lat: 34.1083,
  lng: -117.2898
};

const Map = () => {

  const handleMapLoad = (map) => {
    const airQualityOverlay = new window.google.maps.ImageMapType({
      getTileUrl: function(coord, zoom) {
        return `https://airquality.googleapis.com/v1/mapTypes/US_AQI/heatmapTiles/${zoom}/${coord.x}/${coord.y}?key=${apiKey}`
      },
      tileSize: new window.google.maps.Size(256, 256),
      name: "Air Quality",
      maxZoom: 11,
      minZoom: 5,
      opacity: 0.5
    })

    map.overlayMapTypes.push(airQualityOverlay)
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        id="map"
        center={center}
        zoom={5}
        onLoad={handleMapLoad}
        options={{
          mapTypeId: 'hybrid',
          streetViewControl: false,
          mapTypeControl: false,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'landscape.man_made',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        }}
      >
      </GoogleMap>
    </LoadScript>
  );
}

export default Map