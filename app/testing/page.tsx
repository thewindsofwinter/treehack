"use client";
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image'

interface Location {
  latitude: number,
  longitude: number,
  heading: number,
  street_score: number, 
  tree_score: number,
  dataurl: string,
  generateddata: string,
}

const IndexPage = () => {
  const [coordinates, setCoordinates] = useState('');
  const [streetViewImages, setStreetViewImages] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to send a POST request to /api/streetView
  async function sendStreetViewRequest() {
    setLoading(true);

    try {
      // Parse the input coordinates string into separate latitude and longitude lists
      const coordinatesArray = coordinates
        .trim() // Remove leading/trailing whitespace
        .split('\n') // Split into lines
        .map((line) => line.trim().split(',').map(Number)); // Split each line into number pairs

      const latitudes = coordinatesArray.map(([latitude, _]) => latitude);
      const longitudes = coordinatesArray.map(([_, longitude]) => longitude);

      console.log(latitudes);
      console.log(longitudes);

      // Make an Axios POST request to /api/streetView with the latitude and longitude lists
      setStreetViewImages(await axios.post('/api/streetView', {
        latitudes,
        longitudes,
      }).then((response) => { return response.data.locations; }));

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
                <Image src={image.generateddata} width={384} height={384} alt="generated visualization of canopy improvement" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;