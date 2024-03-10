import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MapComponent from './MapComponent';

// MapPageAmbulance
const MapPageAmbulance = () => {
    const location = useLocation();
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [startLat, setStartLat] = useState('');
    const [startLng, setStartLng] = useState('');
    const [endLat, setEndLat] = useState('');
    const [endLng, setEndLng] = useState('');
    const [startCoordinates, setStartCoordinates] = useState(null);
    const [endCoordinates, setEndCoordinates] = useState(null);
  
    const handleSendCoordinates = async () => {
      const startCoordsArray = [parseFloat(startLat), parseFloat(startLng)];
      const endCoordsArray = [parseFloat(endLat), parseFloat(endLng)];


      const response = await fetch('http://localhost:3000/saveRoute?startLat=' + startCoordsArray[0] + '&startLong=' + startCoordsArray[1] + '&endLat=' + endCoordsArray[0] + '&endLong=' + endCoordsArray[1]);

      if (!isNaN(startCoordsArray[0]) && !isNaN(startCoordsArray[1]) &&
          !isNaN(endCoordsArray[0]) && !isNaN(endCoordsArray[1])) {
        setStartCoordinates({ lat: startCoordsArray[0], lng: startCoordsArray[1] });
        setEndCoordinates({ lat: endCoordsArray[0], lng: endCoordsArray[1] });
      } else {
        console.error('Invalid coordinates');
      }
    };
  
    useEffect(() => {
      // Obține coordonatele din query parameters
      const searchParams = new URLSearchParams(location.search);
      const startAddress = searchParams.get('start');
      const endAddress = searchParams.get('end');
  
      setRouteCoordinates([
        [45.76185634877112, 21.241412688127195],
        [45.74808722222696, 21.231583093876797],
      ]);
  
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }, [location.search]);
  
    return (
      <div>
        <h2>Hartă Ambulanță</h2>
        <div>
          <label htmlFor="startLat">Start Latitude:</label>
          <input
            type="text"
            id="startLat"
            value={startLat}
            onChange={(e) => setStartLat(e.target.value)}
          />
          <label htmlFor="startLng">Start Longitude:</label>
          <input
            type="text"
            id="startLng"
            value={startLng}
            onChange={(e) => setStartLng(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endLat">End Latitude:</label>
          <input
            type="text"
            id="endLat"
            value={endLat}
            onChange={(e) => setEndLat(e.target.value)}
          />
          <label htmlFor="endLng">End Longitude:</label>
          <input
            type="text"
            id="endLng"
            value={endLng}
            onChange={(e) => setEndLng(e.target.value)}
          />
        </div>
        <button onClick={handleSendCoordinates}>Trimite Coordonate</button>
        <MapComponent
          routeCoordinates={routeCoordinates}
          currentLocation={currentLocation}
          startCoordinates={startCoordinates}
          endCoordinates={endCoordinates}
        />
      </div>
    );
  };
  
  export default MapPageAmbulance;
  