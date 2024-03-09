import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const test = () => {
    const response1 = fetch('http:/localhost:8080/?mode=getPassword&username=alex');
    //console.log(response1);
    return response1;

}

const MapComponent = () => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [directions, setDirections] = useState(null);

  const [response1, setResponse1] = useState(null); // [1
  const [loading, setLoading] = useState(false); // [2
  const [error, setError] = useState(false);


  //const response1 = await fetch('http:/localhost:8080/?mode=getPassword&username=alex');
  //console.log(response1);

  useEffect(() => {
    async function fetchRoute() {
      try {
        const response = await fetch('http://localhost:3000/get-route');
        const data = await response.json();
        console.log('Route coordinates:', data);
        setRouteCoordinates(data);
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    }

    fetchRoute();
  }, []);

  async function fetchPassword() {
    try {
        setLoading(true);
        setError(false);
        const res = await fetch('http://localhost:3000/getPassword');
        const data = await res.text();
        console.log(data);
        setResponse1(data);
        setLoading(false);
        setError(false);
    } catch(err) {
        setLoading(false);
        setError(true);
        console.error(err);
    }

  }

  useEffect( ()=>{
    fetchPassword();
  },[]);

  useEffect(() => {console.log({loading, error, response1});}, [loading, error, response1])

  // Funcție pentru tratarea răspunsului de la DirectionsService
  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK' && directions === null) {
        console.log('Directions request successful!',);        
        setDirections(response);
      } else {
        console.log('Directions request failed:', response.status);
      }
    }
  };

  if(loading) return <p>Loading...</p>; // [3

  if(error) return <p>No data found</p>; // [4

  return (
    <div>
      <h2>Hartă</h2>
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          zoom={15}
        center={{ lat: 45.7494, lng: 21.2272 }}
        >
          {routeCoordinates.length > 0 && (
            <>
              <Marker position={{ lat: routeCoordinates[0][0], lng: routeCoordinates[0][1] }} />
              <Marker position={{ lat: routeCoordinates[routeCoordinates.length - 1][0], lng: routeCoordinates[routeCoordinates.length - 1][1] }} />
              {directions && <DirectionsRenderer directions={directions} />}
              <DirectionsService
                options={{
                  origin: { lat: routeCoordinates[0][0], lng: routeCoordinates[0][1] },
                  destination: { lat: routeCoordinates[routeCoordinates.length - 1][0], lng: routeCoordinates[routeCoordinates.length - 1][1] },
                  travelMode: 'DRIVING',
                }}
                callback={directionsCallback}
              />
            </>
          )}
        </GoogleMap>
      </div>

      <h2>Coordonatele rutei:</h2>
      <ul>
        <li key={1}>{response1}</li> 
        {routeCoordinates.map((coordinate, index) => (
          <li key={index+1}>Latitudine: {coordinate[0]}, Longitudine: {coordinate[1]}</li>
        ))}
      </ul>
    </div>
  );
};

export default MapComponent;
