"use client"
import { MapContainer, TileLayer, useMapEvents, LayersControl} from 'react-leaflet'
import Label from './../components/Label'
import Streetview from './Streetview'
import Control from 'react-leaflet-custom-control'
import { useState } from 'react'

const Map = () =>{
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
  const tempAPI = "be72f76237db"
  // const tempAPI = "dXNiQDIFhT8b2Wfr"
  
  const { BaseLayer, Overlay } = LayersControl;

  const [toggled, setToggled] = useState(false)
  const [selected, setSelected] = useState([-1,-1])

  const updateSelected = (index : number, location : { name: string; lat: string; lng: string; }) => {
    setSelected([Number(location.lat), Number(location.lng)]);
    console.log(index);
    console.log(selected)
    const loc = document.getElementById(`location${index}`)
    if(loc) loc.style.border =  "2px solid black;"
  }

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

  const locations = [{"name": "San Bernardino",
                      "lat": "-117.15053157252503",
                      "lng": "34.22702681845975"},
                      {"name": "San Bernardino",
                      "lat": "-117.5734168686697",
                      "lng": "33.942718892219645"},
                      {"name": "San Bernardino",
                      "lat": "-117.2898",
                      "lng": "34.1083"},
                      {"name": "San Bernardino",
                      "lat": "-117.49946341029954",
                      "lng": "34.54379489662335"}]
  

    return (
      <section id="View" className='section-container'>
        <h1 className='section-title'>Choose Your City</h1>
        <div className='map-shell'>
          <MapContainer id='Start' center={[34.1083,-117.2898]} zoom={5}>
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
              <Label text={""} latlng={[Number(selected[0]),Number(selected[1])]}/>
              {/* Enables Map Events on the Container */}
              <MapEvents />
            </LayersControl>

          <Control prepend position='topright'>
            <div id="panel">
              {locations.map((location, index)=>(
                <div className="location" id={`location${index}`} onClick={()=>updateSelected(index, location)}>
                  <h1 className='POI'>{location.name}</h1>
                  <p id="latitude">Latitude: <span>{location.lat} °W</span></p>
                  <p id="longitude">Longitude: <span>{location.lng} °N</span></p>
                </div>
              ))}

              <button id="analyze-button">
                Select
              </button>
            </div>

            </Control>
            
          </MapContainer>
          {/* <Streetview></Streetview> */}
        </div>
      </section>
    )
}

export default Map