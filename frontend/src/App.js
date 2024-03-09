import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);

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

  // Definiți opțiunile hărții
  const mapOptions = {
    zoom: 15,
    center: { lat: 45.7494, lng: 21.2272 } // Poziția Timișoarei
  };

  return (
    <div>
      <h2>Hartă</h2>
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        zoom={mapOptions.zoom}
        center={mapOptions.center}
      >
        {/* Afișați markerul pentru fiecare coordonată din ruta obținută */}
        {routeCoordinates.map((coordinate, index) => (
          <Marker key={index} position={{ lat: coordinate[0], lng: coordinate[1] }} />
        ))}
      </GoogleMap>

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
