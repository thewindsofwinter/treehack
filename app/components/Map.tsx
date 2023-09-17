"use client"
import { MapContainer, TileLayer, useMapEvents, LayersControl} from 'react-leaflet'
import Label from './../components/Label'
import Streetview from './Streetview'
import Control from 'react-leaflet-custom-control'
import { useState } from 'react'


const Map = () =>{
  const apiKey = "AIzaSyCwEgxhHsfCIZz9rRDOHvwpHQmTnhv8osk" // move this later
  const tempAPI = "be72f76237db";
  // const tempAPI = "dXNiQDIFhT8b2Wfr"
  
  const { BaseLayer, Overlay } = LayersControl;

  const [toggled, setToggled] = useState(false)

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        // setState your coords here
        // coords exist in "e.latlng.lat" and "e.latlng.lng"
        console.log(e.latlng.lat);
        console.log(e.latlng.lng);
        const panel = document.getElementById("panel")
        if(panel && toggled) panel.style.display = "none";
        else if(panel && !toggled) panel.style.display = "block";
        setToggled(false)
      }, popupopen(e) {
        const lng = e.popup._latlng.lng;
        const lat = e.popup._latlng.lat;
        console.log(lat, lng)
      }
    });
    return false;
  }

  const locations = [{"name": "San Bernardino"}]
  

    return (
      

      <div className='map-shell'>
        <MapContainer id="Start" center={[34.1083,-117.2898]} zoom={5}>
          <LayersControl position="bottomleft">
            {/* Main Map */}
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              // attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            />

            <Overlay name="Air Quality Overlay">
              {/* Air Quality Data */}
              <TileLayer
                      url={`https://airquality.googleapis.com/v1/mapTypes/US_AQI/heatmapTiles/{z}/{x}/{y}?key=${apiKey}`}
                      opacity = {0.3}
              />
            </Overlay>

            {/* Temperature Data */}
            <Overlay name="Temperature Overlay">
              <TileLayer  
                url={`https://maps-api.meteoblue.com/v1/map/raster/ICONAUTO/2023-09-17T05:37:16/` +
                "11~2%20m%20above%20gnd~hourly~none~contourSteps~" +
                "-5.0~rgba(52,140,237,1.0)~" + "-3.75~rgba(68,177,246,1.0)~" + "-2.5~rgba(81,203,250,1.0)~" + "-1.25~rgba(128,224,247,1.0)~" + "0.0~rgba(160,234,247,1.0)~" + "1.25~rgba(0,239,124,1.0)~" + "2.5~rgba(0,228,82,1.0)~" + "3.75~rgba(0,200,72,1.0)~" + "5.0~rgba(16,184,122,1.0)~" + "6.25~rgba(41,123,93,1.0)~" + "7.5~rgba(0,114,41,1.0)~" + "8.75~rgba(60,161,44,1.0)~" + "10.0~rgba(121,208,48,1.0)~" + "11.25~rgba(181,255,51,1.0)~" + "12.5~rgba(216,247,161,1.0)~" + "13.75~rgba(255,246,0,1.0)~" + "15.0~rgba(248,223,11,1.0)~" + "16.25~rgba(253,202,12,1.0)~" + "17.5~rgba(252,172,5,1.0)~" + "18.75~rgba(248,141,0,1.0)~" + "20.0~rgba(255,102,0,1.0)~" +
                "/{z}/{x}/{y}" +
                "?temperatureUnit=C" +
                `&apikey=${tempAPI}`}
                // attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
                opacity = {0.3}
              />
            </Overlay>
            
            {/* Labels */}
            <TileLayer
              url="http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"
              // attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            />

            {/* Popup */}
            <Label text={""} latlng={[34.1083,-117.2898]}/>
            {/* Enables Map Events on the Container */}
            <MapEvents />
          </LayersControl>

          <Control prepend position='topright'>
            <div id="panel">
              {/* {locations.map((location, index)=>(
                <p key={index}>{location}</p>
              ))} */}
              <div className="location">
                <h1 className='POI'>San Bernardino</h1>
                <p>Latitude: 12.231 °W</p>
                <p>Longitude: 12.231 °N</p>
              </div>
              <button id="analyze-button">
                Analyze
              </button>
            </div>

          </Control>
          
        </MapContainer>
        {/* <Streetview></Streetview> */}
      </div>
    )
}

export default Map