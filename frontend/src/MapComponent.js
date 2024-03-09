import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const MapComponent = () => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [directions, setDirections] = useState(null);

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
        {routeCoordinates.map((coordinate, index) => (
          <li key={index}>Latitudine: {coordinate[0]}, Longitudine: {coordinate[1]}</li>
        ))}
      </ul>
    </div>
  );
};

export default MapComponent;
