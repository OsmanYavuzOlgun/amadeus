import React, { useState, useEffect } from "react";
import "../App.css";

const FlightListComponent = ({ departureFlights, returnFlights }) => {
  const [sortedDepartureFlights, setSortedDepartureFlights] = useState([]);
  const [sortedReturnFlights, setSortedReturnFlights] = useState([]);

  useEffect(() => {
    setSortedDepartureFlights(departureFlights);
    setSortedReturnFlights(returnFlights);
  }, [departureFlights, returnFlights]);

  const sortFlights = (flights, sortKey) => {
    // flights dizisinin kopyasını alarak orijinal diziyi değiştirmemek
    return [...flights].sort((a, b) => {
     
      if (sortKey === "price" || sortKey === "duration") {  // Eğer sıralama anahtarı 'price' veya 'duration' ise küçükten büyüğe sıralama
     
        return a[sortKey] - b[sortKey];
      } else { // tarih için olan taraf
     
        return new Date(a[sortKey]) - new Date(b[sortKey]);
      }
    });
  };
  

  const handleSortChange = (sortKey, type) => {
    if (type === "departure") {
      setSortedDepartureFlights(sortFlights(departureFlights, sortKey));
    } else if (type === "return") {
      setSortedReturnFlights(sortFlights(returnFlights, sortKey));
    }
  };

  return (
    <div>
      {sortedDepartureFlights.length > 0 && (
        <div className="all-flight-section">
          <div className="flight-titles">
            <h2>Gidiş Uçuşları</h2>
            <select
              onChange={(e) => handleSortChange(e.target.value, "departure")}
            >
              <option value="departureTime">Kalkış Saati</option>
              <option value="arrivalTime">Varış Saati</option>
              <option value="duration">Uçuş Süresi</option>
              <option value="price">Fiyat</option>
            </select>
          </div>

          {sortedDepartureFlights.map((flight) => (
            <div key={flight.id} className="flight-item">
              <div className="header-flight">
                <h3>
                  {flight.airline} - Uçuş No: {flight.flightNumber}
                </h3>
              </div>
              <div className="flight-details">
                <p>Kalkış Havaalanı: {flight.departure}</p>
                <p>Varış Havaalanı: {flight.arrival}</p>
              </div>
              <div className="flight-details">
                <p>Kalkış Saati: {flight.departureTime}</p>
                <p>Varış Saati: {flight.arrivalTime}</p>
              </div>
              <p>Uçuş Süresi: {flight.duration}</p>
              <p>Fiyat: {flight.price} TL</p>
            </div>
          ))}
        </div>
      )}

      {sortedReturnFlights.length > 0 && (
        <div className="all-flight-section">
          <div className="flight-titles">
            <h2>Dönüş Uçuşları</h2>
            <select
              onChange={(e) => handleSortChange(e.target.value, "return")}
            >
              <option value="departureTime">Kalkış Saati</option>
              <option value="arrivalTime">Varış Saati</option>
              <option value="duration">Uçuş Süresi</option>
              <option value="price">Fiyat</option>
            </select>
          </div>
          {sortedReturnFlights.map((flight) => (
            <div key={flight.id} className="flight-item">
              <div className="header-flight">
                <h3>
                  {flight.airline} - Uçuş No: {flight.flightNumber}
                </h3>
              </div>
              <p>Kalkış Havaalanı: {flight.departure}</p>
              <p>Varış Havaalanı: {flight.arrival}</p>
              <p>Kalkış Saati: {flight.departureTime}</p>
              <p>Varış Saati: {flight.arrivalTime}</p>
              <p>Uçuş Süresi: {flight.duration}</p>
              <p>Fiyat: {flight.price} TL</p>
            </div>
          ))}
        </div>
      )}

      {sortedDepartureFlights.length === 0 &&
        sortedReturnFlights.length === 0 && (
          <p className="flight-titles please-search-text">
            Lütfen arama yapınız.
          </p>
        )}
    </div>
  );
};

export default FlightListComponent;
