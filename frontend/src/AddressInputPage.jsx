import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddressInputPage = () => {
  const [startAddress, setStartAddress] = useState('');
  const [endAddress, setEndAddress] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Realizează căutarea pentru coordonatele adresei aici și salvează-le într-un context sau într-o stare globală
    // Aici poți face cererea API pentru a obține coordonatele pe baza adreselor

    // Apoi, navighează către pagina hărții
    navigate(`/map?start=${encodeURIComponent(startAddress)}&end=${encodeURIComponent(endAddress)}`);
  };

  return (
    <div>
      <h2>Introduceți adresele</h2>
      <label>
        Adresa de start:
        <input type="text" value={startAddress} onChange={(e) => setStartAddress(e.target.value)} />
      </label>
      <label>
        Adresa de destinație:
        <input type="text" value={endAddress} onChange={(e) => setEndAddress(e.target.value)} />
      </label>
      <button onClick={handleSearch}>Caută</button>
    </div>
  );
};

export default AddressInputPage;
