"use client"
import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet'
import Label from './../components/Label'
import californiaHeatData from './../data/cali.geojson'

// const fetch = require('node-fetch'); // For Node.js environment
const apiKey = "AIzaSyCwEgxhHsfCIZz9rRDOHvwpHQmTnhv8osk" // move this later
// const newAPI = "2rQ40Mr8wbM8Vc3W6nU3"
const temperatureAPI = "c56df9e9652ad1470a103615de835bdf"
const tempAPI = "be72f76237db";
const timeURL = `https://maps-api.meteoblue.com/v1/time/hourly/ICONAUTO?lang=de&apikey=${tempAPI}`
const Map = () =>{
  
  const style = (feature: any) => {
    const description = feature.properties.description
    const match = /<td>DegHourDay<\/td>\n\n<td>([\d\.]+)<\/td>/.exec(description)
    const degHourDay = match ? parseFloat(match[1]) : 0

    // Use degHourDay to determine fillColor
    let fillColor = '#009c8c'; // default for low values
    if (degHourDay > 90) fillColor = '#cf0500'
    else if (degHourDay > 84) fillColor = '#e3754f'
    else if (degHourDay > 78) fillColor = '#df0000'
    else if (degHourDay > 72) fillColor = '#ed0000'
    else if (degHourDay > 66) fillColor = '#ff0000'
    else if (degHourDay > 60) fillColor = '#ff4d00'
    else if (degHourDay > 54) fillColor = '#ff7c00'
    else if (degHourDay > 48) fillColor = '#ffa500'
    else if (degHourDay > 42) fillColor = '#ffce00'
    else if (degHourDay > 36) fillColor = '#fff700'
    else if (degHourDay > 30) fillColor = '#dff600'
    else if (degHourDay > 24) fillColor = '#b7e900'
    else if (degHourDay > 18) fillColor = '#5bb500'
    else if (degHourDay > 12) fillColor = '#259c00'
    else if (degHourDay > 6) fillColor = '#008268'

    return {
        fillColor: fillColor,
        fillOpacity: 0.5,
        weight: 0.1,
        color: 'white'
    }
  }
  
  return (
    <MapContainer id="Start" center={[34.1083,-117.2898]} zoom={5}>
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        // attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      />

      {/* Air Quality Data */}
      <TileLayer
              url={`https://airquality.googleapis.com/v1/mapTypes/US_AQI/heatmapTiles/{z}/{x}/{y}?key=${apiKey}`}
              opacity = {0.0}
      />

      {/* Temperature Data */}
      <TileLayer
              url={`https://maps-api.meteoblue.com/v1/map/raster/ICONAUTO/2023-09-17T05:37:16/` +
              "11~2%20m%20above%20gnd~hourly~none~contourSteps~" +
              // "-10.0~rgba(52,140,237,1.0)~" + "-8.5~rgba(68,177,246,1.0)~" + "-7.0~rgba(81,203,250,1.0)~" + "-5.5~rgba(128,224,247,1.0)~" + "-4.0~rgba(160,234,247,1.0)~" + "-2.5~rgba(0,239,124,1.0)~" + "-1.0~rgba(0,228,82,1.0)~" + "0.5~rgba(0,200,72,1.0)~" + "2.0~rgba(16,184,122,1.0)~" + "3.5~rgba(41,123,93,1.0)~" + "5.0~rgba(0,114,41,1.0)~" + "6.5~rgba(60,161,44,1.0)~" + "8.0~rgba(121,208,48,1.0)~" + "9.5~rgba(181,255,51,1.0)~" + "11.0~rgba(216,247,161,1.0)~" + "12.5~rgba(255,246,0,1.0)~" + "14.0~rgba(248,223,11,1.0)~" + "15.5~rgba(253,202,12,1.0)~" + "17.0~rgba(252,172,5,1.0)~" + "18.5~rgba(248,141,0,1.0)~" + "20.0~rgba(255,102,0,1.0)~" +
              
              
              "-8.0~rgba(68,177,246,1.0)~" +
              "-6.0~rgba(81,203,250,1.0)~" +
              "-4.0~rgba(128,224,247,1.0)~" +
              "-2.0~rgba(160,234,247,1.0)~" +
              "0.0~rgba(0,239,124,1.0)~" +
              "2.0~rgba(0,228,82,1.0)~" +
              "4.0~rgba(0,200,72,1.0)~" +
              "6.0~rgba(16,184,122,1.0)~" +
              "8.0~rgba(41,123,93,1.0)~" +
              "10.0~rgba(0,114,41,1.0)~" +
              "12.0~rgba(60,161,44,1.0)~" +
              "14.0~rgba(121,208,48,1.0)~" +
              "16.0~rgba(181,255,51,1.0)~" +
              "18.0~rgba(216,247,161,1.0)~" +
              "20.0~rgba(255,246,0,1.0)~" +
              "22.0~rgba(248,223,11,1.0)~" +
              "24.0~rgba(253,202,12,1.0)~" +
              "26.0~rgba(252,172,5,1.0)~" +
              "28.0~rgba(248,141,0,1.0)~" +
              "30.0~rgba(255,102,0,1.0)~" +
              "/{z}/{x}/{y}" +
              "?temperatureUnit=C" +
              `&apikey=${tempAPI}`}
              // attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
              opacity = {0.6}
      />
      
      {/* Urban Heat Index (California) */}
      <GeoJSON data={californiaHeatData} style={style}/>
      
      {/* Labels */}
      <TileLayer
        url="http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
        // attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      />
      <Label text={"Hello"} latlng={[34.1083,-117.2898]}/>
      <Label text={"Hello"} latlng={[34.1083,-117.2898]}/>
    </MapContainer>
  )
}

export default Map