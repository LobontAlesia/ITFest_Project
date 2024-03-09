import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';

const App = () => {
  const [loadMap, setLoadMap] = useState(false);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch('http://localhost:3000/get-route');
        const data = await response.json();
        setCoordinates(data);
        setLoadMap(true);
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    fetchCoordinates();
  }, []);

  return (
    <div className="App">
      <h4>Desenează o linie între două puncte pe Google Maps în React</h4>
      {!loadMap ? <div>Încărcare...</div> : <MapComponent coordinates={coordinates} />}
      <br />
      <small><b>Notă:</b> Pentru a face acest lucru să funcționeze, trebuie să setați cheia API Google Maps în fișierul App.js.</small>
    </div>
  );
}

export default App;
