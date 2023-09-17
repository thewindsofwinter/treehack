import { NextResponse } from 'next/server'
import axios from 'axios'

interface Location {
    latitude: number,
    longitude: number,
    heading: number,
    street_score: number, 
    tree_score: number,
    dataurl: string,
    generateddata?: string,
}

export async function POST(req: Request) {
  const { latitude, longitude } = await req.json();

    const location = await fetch(`https://maps.googleapis.com/maps/api/streetview/metadata?location=${latitude},${longitude}&radius=500&key=AIzaSyB5gMGVEdjmsBG9ssXrwHbZsoXWO7mc2A4`)
        .then((response) => response.json())
        .then((json) => {
            // console.log(json);
            return json.location;
        });
    
    const scoring = await axios.post("http://127.0.0.1:5000/api/location", {
        latitude: location.lat,
        longitude: location.lng,
    }).then((response) => {
        return { latitude: location.lat, longitude: location.lng, ...response.data };
    })
    // console.log(scoring)

  // console.log(locations);

  return NextResponse.json({ location: scoring });
}