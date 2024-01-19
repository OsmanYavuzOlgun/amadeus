import React from "react";

const FlightListComponent = ({ flights }) => {
  return (
    <div>
      {flights.map((flight) => (
        <div key={flight.id} className="flight-item">
          <div className="header-flight">
            <h3>
              {flight.airline} - Uçuş No: {flight.flightNumber}
            </h3>
          </div>
          <div>
            <p>Kalkış Havaalanı: {flight.departure}</p>
          </div>
          <div>
            <p>Varış Havaalanı: {flight.arrival}</p>{" "}
          </div>
          <div>
            <p>Kalkış Saati: {flight.departureTime}</p>
          </div>
          <div>
            <p>Varış Saati: {flight.arrivalTime}</p>{" "}
          </div>
          <div>
            <p>Uçuş Süresi: {flight.duration}</p>{" "}
          </div>
          <div>
            <p>Fiyat: {flight.price} TL</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightListComponent;
