import React, { useState, useEffect } from 'react';
import { GoogleMap, Polyline } from '@react-google-maps/api';

const MapComponent = () => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    async function fetchRoute() {
      try {
        const response = await fetch('http://localhost:3000/get-route');
        const data = await response.json();
        setRouteCoordinates(data);
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    }

    fetchRoute();
  }, []);

  // Convertă coordonatele rutei în formatul necesar pentru Polyline
  const path = routeCoordinates.map(coordinate => ({ lat: coordinate[0], lng: coordinate[1] }));

  return (
    <div>
      <h2>Hartă</h2>
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          zoom={15}
          center={routeCoordinates.length > 0 ? { lat: routeCoordinates[0][0], lng: routeCoordinates[0][1] } : { lat: 45.7494, lng: 21.2272 }}
        >
          {routeCoordinates.length > 0 && (
            <>
              <Polyline
                path={path}
                options={{
                  strokeColor: '#FF0000',
                  strokeOpacity: 1,
                  strokeWeig,
                }}
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
