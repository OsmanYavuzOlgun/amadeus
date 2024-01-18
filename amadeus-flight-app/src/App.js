import React, { useState } from 'react';
import SearchComponent from './components/SearchComponent';
import FlightListComponent from './components/FlightListComponent';

const App = () => {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/searchFlights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchParams),
      });
      

      if (!response.ok) throw new Error('Ağ hatası.');

      const data = await response.json();
      console.log("data",data);

      if (data.length === 0) {
        setError('Uçuş bulunamadı.');
        setFlights([]);
      } else {
        setFlights(data);
      }
    } catch (err) {
      setError('Uçuşlar yüklenirken bir hata oluştu.');
      console.error('Fetch error:', err);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <SearchComponent onSearch={handleSearch} />
      {isLoading && <p>Yükleniyor...</p>}
      {error && <p>{error}</p>}
      <FlightListComponent flights={flights} />
    </div>
  );
};

export default App;
