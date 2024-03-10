import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import iconCurrentLocation from 'C:\\Users\\Alesia\\Desktop\\ITFest_Project\\frontend\\src\\Assets\\ambulanceicon.png';
import iconCar from 'C:\\Users\\Alesia\\Desktop\\ITFest_Project\\frontend\\src\\Assets\\car.png';
import iconPin from 'C:\\Users\\Alesia\\Desktop\\ITFest_Project\\frontend\\src\\Assets\\pin.png';

const MapComponent = ({ currentLocation }) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [directions, setDirections] = useState(null);
  const [response1, setResponse1] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
    } catch (err) {
      setLoading(false);
      setError(true);
      console.error(err);
    }
  }

  useEffect(() => {
    fetchPassword();
  }, []);

  useEffect(() => {
    console.log({ loading, error, response1 });
  }, [loading, error, response1]);

  // Funcție pentru tratarea răspunsului de la DirectionsService
  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK' && directions === null) {
        console.log('Directions request successful!');
        setDirections(response);
      } else {
        console.log('Directions request failed:', response.status);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>No data found</p>;

  return (
    <div>
      <h2>Hartă</h2>
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          zoom={15}
          center={currentLocation ? { lat: currentLocation.lat, lng: currentLocation.lng } : { lat: 0, lng: 0 }} // Verificare condițională pentru a evita eroarea
        >
          {currentLocation && <Marker
          icon = {iconCar}
           position={{ lat: currentLocation.lat, lng: currentLocation.lng }} />} {/* Verificare condițională pentru a afișa marker-ul doar dacă currentLocation este definit */}
{currentLocation && 
  <Marker
    icon={iconCar}
    label={null}
    position={{ lat: currentLocation.lat, lng: currentLocation.lng }}
  />
}
{routeCoordinates.length > 0 && (
  <>
    <Marker 
      icon={iconCurrentLocation}
      label={null}
      position={{ lat: routeCoordinates[0][0], lng: routeCoordinates[0][1] }} 
    />
    <Marker
      icon={iconPin}
      label={null}
      position={{ lat: routeCoordinates[routeCoordinates.length - 1][0], lng: routeCoordinates[routeCoordinates.length - 1][1] }} 
    />
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
          <li key={index + 1}>Latitudine: {coordinate[0]}, Longitudine: {coordinate[1]}</li>
        ))}
      </ul>
    </div>
  );
  
};

export default MapComponent;

