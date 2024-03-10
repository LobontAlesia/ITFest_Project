// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import SignUp from './Components/LoginSignup/SignUp';
import MapPage from './pages/MapPage';
import MapPageAmbulance from './MapPageAmbulance';



const App =  () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/mapAmbulance" element={<MapPageAmbulance />} />
      </Routes>
    </Router>
  );
};

export default App;
