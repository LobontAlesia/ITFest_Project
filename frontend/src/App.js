// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Modificarea importului

import AddressInputPage from './AddressInputPage';
import MapPage from './MapPage';

const App = () => {
  return (
    <Router>
      <Routes> {/* Înlocuirea componente Switch */}
        <Route path="/" element={<AddressInputPage />} /> {/* Înlocuirea atributului 'component' cu 'element' */}
        <Route path="/map" element={<MapPage />} /> {/* Înlocuirea atributului 'component' cu 'element' */}
      </Routes>
    </Router>
  );
};

export default App;
