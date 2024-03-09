// MapPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MapComponent from './MapComponent'; // Asigură-te că ai definit corect această componentă


const MapPage = () => {
  const location = useLocation();
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    // Obține coordonatele din query parameters
    const searchParams = new URLSearchParams(location.search);
    const startAddress = searchParams.get('start');
    const endAddress = searchParams.get('end');

    // Realizează cererea API pentru a obține coordonatele rutei pe baza adreselor
    // Setează coordonatele în starea componentei
    // setRouteCoordinates(coordonateObținute);

    // Simulează coordonatele pentru a afișa harta (înlocuiește cu date reale)
    setRouteCoordinates([
      [45.76185634877112, 21.241412688127195],
      [45.74808722222696, 21.231583093876797],
    ]);
  }, [location.search]);

  return (
    <div>
      <h2>Hartă</h2>
      <MapComponent routeCoordinates={routeCoordinates} />
    </div>
  );
};

export default MapPage;
