import React from 'react';

const FlightListComponent = ({ flights }) => {
  return (
    <div>
      {flights.map(flight => (
        <div key={flight.id} className="flight-item">
        <h3>{flight.airline} - Uçuş No: {flight.flightNumber}</h3>
        <p>Kalkış Havaalanı: {flight.departure}</p>
        <p>Varış Havaalanı: {flight.arrival}</p>
        <p>Kalkış Saati: {flight.departureTime}</p>
        <p>Varış Saati: {flight.arrivalTime}</p>
        <p>Uçuş Süresi: {flight.duration}</p>
        <p>Fiyat: {flight.price} TL</p>
      </div>
      ))}
    </div>
  );
};

export default FlightListComponent;
