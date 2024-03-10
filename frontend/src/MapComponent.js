import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import iconCurrentLocation from 'C:\\Users\\Alesia\\Desktop\\ITFest_Project\\frontend\\src\\Assets\\ambulanceicon.png';
import iconCar from 'C:\\Users\\Alesia\\Desktop\\ITFest_Project\\frontend\\src\\Assets\\car.png';
import iconPin from 'C:\\Users\\Alesia\\Desktop\\ITFest_Project\\frontend\\src\\Assets\\pin.png';

const MapComponent = ({ currentLocation, startCoordinates, endCoordinates }) => {
  const [directions, setDirections] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [response1, setResponse1] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Trimite coordonatele către backend și primește răspunsul
        const response = await fetch(`http://localhost:3000/get-route?startLat=${startCoordinates.lat}&startLong=${startCoordinates.lng}&endLat=${endCoordinates.lat}&endLong=${endCoordinates.lng}`);
        const data = await response.json();
        console.log('Route coordinates:', data);
        setRouteCoordinates(data);
        setResponse1(data); // Setează răspunsul pentru afișare
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    }

    if (startCoordinates && endCoordinates) {
      fetchData(); // Trimite coordonatele către backend doar dacă sunt disponibile
    }
  }, [startCoordinates, endCoordinates]);

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        console.log('Directions request successful!');
        if (!directions) {
          setDirections(response);
        }
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
          center={currentLocation ? { lat: currentLocation.lat, lng: currentLocation.lng } : { lat: 0, lng: 0 }}
        >
          {currentLocation && <Marker icon={iconCar} position={{ lat: currentLocation.lat, lng: currentLocation.lng }} />}

          {startCoordinates && endCoordinates && (
            <>
              <Marker icon={iconCurrentLocation} position={{ lat: startCoordinates.lat, lng: startCoordinates.lng }} />
              <Marker icon={iconPin} position={{ lat: endCoordinates.lat, lng: endCoordinates.lng }} />
              <DirectionsService
                options={{
                  origin: { lat: startCoordinates.lat, lng: startCoordinates.lng },
                  destination: { lat: endCoordinates.lat, lng: endCoordinates.lng },
                  travelMode: 'DRIVING',
                }}
                callback={directionsCallback}
              />
              {directions && <DirectionsRenderer directions={directions} />}
            </>
          )}
        </GoogleMap>
      </div>
  
      <h2>Coordonatele rutei:</h2>
      <ul>
        {/* Afișează coordonatele primite de la backend */}
        {routeCoordinates.map((coordinate, index) => (
          <li key={index + 1}>Latitudine: {coordinate[0]}, Longitudine: {coordinate[1]}</li>
        ))}
      </ul>
    </div>
  );
};

export default MapComponent;
