"use client"
import { MapContainer, TileLayer } from 'react-leaflet'
import Label from './../components/Label'

const apiKey = "AIzaSyCwEgxhHsfCIZz9rRDOHvwpHQmTnhv8osk" // move this later
const tempAPI = "be72f76237db";
// const tempAPI = "dXNiQDIFhT8b2Wfr"
const Map = () =>{
    return (
      <MapContainer id="Start" center={[34.1083,-117.2898]} zoom={5}>
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          // attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        />

        {/* Air Quality Data */}
        {/* <TileLayer
                url={`https://airquality.googleapis.com/v1/mapTypes/US_AQI/heatmapTiles/{z}/{x}/{y}?key=${apiKey}`}
                opacity = {0.5}
        /> */}

        {/* Temperature Data */}
        <TileLayer
                url={`https://maps-api.meteoblue.com/v1/map/raster/ICONAUTO/2023-09-17T05:37:16/` +
                "11~2%20m%20above%20gnd~hourly~none~contourSteps~" +
                "-5.0~rgba(52,140,237,1.0)~" + "-3.5~rgba(68,177,246,1.0)~" + "-2.0~rgba(81,203,250,1.0)~" + "-0.5~rgba(128,224,247,1.0)~" + "1.0~rgba(160,234,247,1.0)~" + "2.5~rgba(0,239,124,1.0)~" + "4.0~rgba(0,228,82,1.0)~" + "5.5~rgba(0,200,72,1.0)~" + "7.0~rgba(16,184,122,1.0)~" + "8.5~rgba(41,123,93,1.0)~" + "10.0~rgba(0,114,41,1.0)~" + "11.5~rgba(60,161,44,1.0)~" + "13.0~rgba(121,208,48,1.0)~" + "14.5~rgba(181,255,51,1.0)~" + "16.0~rgba(216,247,161,1.0)~" + "17.5~rgba(255,246,0,1.0)~" + "19.0~rgba(248,223,11,1.0)~" + "20.5~rgba(253,202,12,1.0)~" + "22.0~rgba(252,172,5,1.0)~" + "23.5~rgba(248,141,0,1.0)~" + "25.0~rgba(255,102,0,1.0)~" +
                "/{z}/{x}/{y}" +
                "?temperatureUnit=C" +
                `&apikey=${tempAPI}`}
                // attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                opacity = {0.6}
        />
        
        {/* Labels */}
        <TileLayer
          url="http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
          // attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        />
        <Label text={"Hello"} latlng={[34.1083,-117.2898]}/>

      </MapContainer>
    )
}


export default Map