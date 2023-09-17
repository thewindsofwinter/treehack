"use client"
import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet'
import Label from './../components/Label'
import californiaHeatData from './../data/cali.geojson'

// const fetch = require('node-fetch'); // For Node.js environment
const apiKey = "AIzaSyCwEgxhHsfCIZz9rRDOHvwpHQmTnhv8osk" // move this later

const Map = () =>{
  const style = (feature: any) => {
    const description = feature.properties.description
    const match = /<td>DegHourDay<\/td>\n\n<td>([\d\.]+)<\/td>/.exec(description)
    const degHourDay = match ? parseFloat(match[1]) : 0

    // Use degHourDay to determine fillColor
    let fillColor = '#b9c281'; // default for low values
    if (degHourDay > 100) fillColor = '#c54a53'
    else if (degHourDay > 60) fillColor = '#e3754f'
    else if (degHourDay > 30) fillColor = '#eeb06d'
    else if (degHourDay > 10) fillColor = '#eed790'

    return {
        fillColor: fillColor,
        fillOpacity: 0.6,
        weight: 0.1,
        color: 'white'
    }
}
  
    return (
      <MapContainer id="Start" center={[34.1083,-117.2898]} zoom={5}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* <TileLayer
                url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                maxZoom={20}
                subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
        /> */}
        {/* <TileLayer
                url={`https://airquality.googleapis.com/v1/mapTypes/US_AQI/heatmapTiles/{z}/{x}/{y}?key=${apiKey}`}
                opacity = {0.5}
        /> */}

        <GeoJSON data={californiaHeatData} style={style}/>
        <Label text={"Hello"} latlng={[34.1083,-117.2898]}/>
      </MapContainer>
    )
}


export default Map