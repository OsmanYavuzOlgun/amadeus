import React, { useState } from "react";
import SearchComponent from "./components/SearchComponent";
import FlightListComponent from "./components/FlightListComponent";
import Header from "./components/Header";
import "./App.css";

const App = () => {
  const [departureFlights, setDepartureFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/searchFlights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchParams),
      });

      if (!response.ok) throw new Error("Ağ hatası.");

      const data = await response.json();

      if (data.length === 0) {
        setError("Uçuş bulunamadı.");
        setDepartureFlights([]);
        setReturnFlights([]);
      } else {
        if (!searchParams.isOneWay) {
          // Gidiş-dönüş uçuşları ayrıştır
          const departureData = data.filter(
            (flight) => flight.departure === searchParams.departure
          );
          const returnData = data.filter(
            (flight) => flight.departure === searchParams.arrival
          );
          setDepartureFlights(departureData);
          setReturnFlights(returnData);
        } else {
          setDepartureFlights(data);
          setReturnFlights([]);
        }
      }
    } catch (err) {
      setError("Uçuşlar yüklenirken bir hata oluştu.");
      console.error("Fetch error:", err);
    }

    setIsLoading(false);
  };



  return (
    <div>
      <Header />
      <SearchComponent
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {isLoading && <div className="loading">Yükleniyor...</div>}
      {error && <p>{error}</p>}
      <FlightListComponent
        departureFlights={departureFlights}
        returnFlights={returnFlights}
      />
    </div>
  );
};

export default App;
