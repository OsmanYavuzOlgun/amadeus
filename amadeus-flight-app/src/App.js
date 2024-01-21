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
    setTimeout(async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/searchFlights",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(searchParams),
          }
        );

        if (!response.ok) {
          throw new Error("Ağ hatası.");
        }
        const data = await response.json();
        if (data.length === 0) {
          setError("Uçuş bulunamadı.");
          setDepartureFlights([]);
          setReturnFlights([]);
        } else {
          if (!searchParams.isOneWay) {
            const departureData = data.filter( (flight) => flight.departure === searchParams.departure );
            const returnData = data.filter( (flight) => flight.departure === searchParams.arrival );
            setDepartureFlights(departureData);
            setReturnFlights(returnData);
          } else {
            setDepartureFlights(data);
            setReturnFlights([]);
          }
          console.log("data",data);
        }
      } catch (err) {
        setError("Uçuşlar yüklenirken bir hata oluştu.");
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };

  return (
   <div className="all-content">
      <Header />
      <SearchComponent onSearch={handleSearch} isLoading={isLoading} />
      {isLoading ? (
        <div className="loading-section">
          <span className="loading"></span>
        </div>
      ) : (
        <FlightListComponent
          departureFlights={departureFlights}
          returnFlights={returnFlights}
        />
      )}
      {error && <p className="flight-titles">{error}</p>}
    </div>
  );
};

export default App;
