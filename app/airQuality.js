// const fetch = require('node-fetch'); // For Node.js environment
const apiKey = "AIzaSyCwEgxhHsfCIZz9rRDOHvwpHQmTnhv8osk" // move this later

const endpoint = `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${apiKey}`

/*
const getLocationAirQuality = async (location) => {
    const response = await fetch(endpoint)

    const data = await response.json()
    return data
};

getLocationAirQuality(location)
  .then((airQualityData) => {
    console.log('Air Quality Data:', airQualityData);
  })
  */
function getLocationAirQuality(lat, long) {
    fetch(endpoint, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            location: {
                latitude: lat,
                longitude: long
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}

getLocationAirQuality(34, -118) // pasadena

