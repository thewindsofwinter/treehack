import { NextResponse } from 'next/server'
import axios from 'axios'

interface Location {
    latitude: number,
    longitude: number,
    heading: number,
    street_score: number, 
    tree_score: number,
    dataurl: string,
    generateddata: string,
}

interface Coords {
    lat: number,
    lng: number,
}

export async function POST(req: Request) {
  const { latitudes, longitudes } = await req.json();
  
  const locations = Array<Location>();

  for(const index in latitudes) {
    const latitude = latitudes[index];
    const longitude = longitudes[index];
    
    let startTime = performance.now(); // Start timing for this request
    const location: Coords = await fetch(`https://maps.googleapis.com/maps/api/streetview/metadata?location=${latitude},${longitude}&radius=100&key=AIzaSyB5gMGVEdjmsBG9ssXrwHbZsoXWO7mc2A4`)
        .then((response) => response.json())
        .then((json) => {
            return json.location;
        });
    
    const locationTime = performance.now() - startTime;
    startTime = performance.now()

    const scoring = await axios.post("http://127.0.0.1:5000/api/location", {
        latitude: location.lat,
        longitude: location.lng,
    }).then((response) => {
        return { latitude: location.lat, longitude: location.lng, ...response.data };
    })
    // console.log(scoring)

    const alignScoreTime = performance.now() - startTime;
    startTime = performance.now()

    await axios.post("http://127.0.0.1:5000/api/edit-image", {
        datauri: scoring.dataurl
    }).then((response) => {
        // console.log(response.data)
        locations.push({ ...scoring, ...response.data });
    })
    const editImageTime = performance.now() - startTime;

    console.log(`Request ${index} of ${latitudes.length}. Location: ${locationTime.toFixed(2)}ms, Align and Score: ${alignScoreTime.toFixed(2)}ms, Edit Image: ${editImageTime.toFixed(2)}ms`);
  }

  // console.log(locations);

  locations.sort((a, b) => { return b['street_score'] + b['tree_score'] - a['street_score'] - a['tree_score']; })
  return NextResponse.json({ locations });
}