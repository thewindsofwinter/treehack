"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image'

interface Location {
  latitude: number,
  longitude: number,
  heading: number,
  street_score: number, 
  tree_score: number,
  dataurl: string,
  generateddata: string | null,
}

const IndexPage = () => {
  const [coordinates, setCoordinates] = useState('');
  const [streetViewImages, setStreetViewImages] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [runAxios, setRunAxios] = useState(false);

  useEffect(() => {
    if (runAxios && streetViewImages.length > 0) {
        for (let i = 0; i < streetViewImages.length; i++) {
            console.log(streetViewImages[i].dataurl);
            setTimeout(() => { editImage(i, streetViewImages[i].dataurl) }, 200);
        }
        setRunAxios(false);
    }
  }, [runAxios, streetViewImages])

    async function editImage(i: number, datauri: string) {
        const url = await axios.post('/api/getImage', {
            id: i,
            imageDataURI: datauri
        }).then((response) => response.data.image_dataurl);

        setStreetViewImages((streetViewImages) => {
            const newData = [...streetViewImages];
            console.log(url);
            
            newData[i].generateddata = url;
            return newData;
        })
    }

  // Function to send a POST request to /api/streetView
  async function sendStreetViewRequest() {
    setStreetViewImages([]);
    setLoading(true);

    try {
      // Parse the input coordinates string into separate latitude and longitude lists
      const firstCoord = coordinates
        .trim() // Remove leading/trailing whitespace
        .split('\n') // Split into lines
        .map((line) => line.trim().split(',').map(Number))[0]; // Split each line into number pairs
    
        const coordinatesArray: CanopyObject[] = await axios.post('/api/getLocations', { latitude: firstCoord[1] , longitude: firstCoord[0] }).then((response) => { return response.data.locations });

      const latitudesAll = coordinatesArray.map((obj) => { return obj.x; });
      const longitudesAll = coordinatesArray.map((obj) => { return obj.y; });

      // Make an Axios POST request to /api/streetView with the latitude and longitude lists
      setStreetViewImages(await axios.post('/api/streetView', {
        latitudes: [ latitudesAll[0], latitudesAll[1], latitudesAll[2] ],
        longitudes: [ longitudesAll[0], longitudesAll[1], longitudesAll[2] ]
      }).then((response) => { 
        return response.data.locations; 
        }));
    
        setRunAxios(true);

      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      return Promise.reject('Error occurred while processing the request.');
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl mb-4">Street View Images</h1>
      <div className="mb-4">
        <textarea
            placeholder="Enter coordinates (latitude,longitude)"
            className="w-full text-black px-3 py-2 border rounded w-3/4"
            value={coordinates}
            onChange={(e) => { setCoordinates(e.target.value); }}
        ></textarea>
        <button className="my-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={sendStreetViewRequest}>Fetch Images</button>
      </div>
      {loading ? 
        <div className="pulse rounded-lg center w-full h-96"></div> 
      : null}
      <div>
        {streetViewImages.map((image, index) => (
          <div key={index} className="my-4 bg-blue-500 p-4 rounded-md">
            <p className="mb-2">Latitude: {image.latitude}</p>
            <p className="mb-2">Longitude: {image.longitude}</p>
            <p className="mb-2">Heading: {image.heading}</p>
            <p className="mb-2">Street score: {image.street_score}</p>
            <p className="mb-2">Tree score: {image.tree_score}</p>
            <div className="flex">
              <div className="mr-8">
                <p>Original Image</p>
                <Image src={image.dataurl} width={384} height={384} alt="original unshaded street"/>
              </div>
              <div>
                <p>Generated Image</p>
                
                { image.generateddata ? 
                    <Image src={image.generateddata} width={384} height={384} alt="generated visualization of canopy improvement" />
                : <div className="pulse rounded-lg center w-96 h-96"></div> }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;