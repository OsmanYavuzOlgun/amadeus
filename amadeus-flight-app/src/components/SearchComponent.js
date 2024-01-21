import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

const SearchComponent = ({ onSearch }) => {
  const [departure, setDeparture] = useState(""); // kalkış havaalanı
  const [arrival, setArrival] = useState(""); // varış havaalanı
  const [departureDate, setDepartureDate] = useState(new Date()); //kalkış tarihi
  const [returnDate, setReturnDate] = useState(new Date()); // dönüş tarihi
  const [isOneWay, setIsOneWay] = useState(false); // tek yön uçuş olup olmadığı

  const airports = [
    "Atatürk Havalimanı",
    "Sabiha Gökçen Havalimanı",
    "Adnan Menderes Havalimanı",
    "Antalya Havalimanı",
    "Esenboğa Havalimanı",
  ]; // select için açılmış airport isimleri
  
  const [filteredDepartureAirports, setFilteredDepartureAirports] = useState(airports); // arama anında filtrelenecek ve datalistte onna göre çıkartacak kalkış havaalanlarını tutar
  const [filteredArrivalAirports, setFilteredArrivalAirports] = useState(airports); // arama anında filtrelenecek ve datalistte onna göre çıkartacak varış havaalanlarını tutar

  const handleAirportSearch = (value, setAirport, setFilteredAirports) => {
    setAirport(value);
    setFilteredAirports(
      airports.filter((airport) =>
        airport.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDepartureDate = departureDate.toISOString().split("T")[0];
    const formattedReturnDate = returnDate.toISOString().split("T")[0];
    onSearch({
      departure,
      arrival,
      departureDate: formattedDepartureDate,
      returnDate: formattedReturnDate,
      isOneWay,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="input-text">
        <p className="text">Kalkış Havalimanı</p>
        <input
          type="text"
          value={departure}
          onChange={(e) =>
            handleAirportSearch(
              e.target.value,
              setDeparture,
              setFilteredDepartureAirports
            )
          }
          placeholder="Kalkış Havalimanı"
          list="departure-airports"
          required
        />
        <datalist id="departure-airports">
          {filteredDepartureAirports.map((airport, index) => (
            <option key={index} value={airport} />
          ))}
        </datalist>
      </div>

      <div className="input-text">
        <p className="text">Varış Havalimanı</p>
        <input
          type="text"
          value={arrival}
          onChange={(e) =>
            handleAirportSearch(
              e.target.value,
              setArrival,
              setFilteredArrivalAirports
            )
          }
          placeholder="Varış Havalimanı"
          list="arrival-airports"
          required
        />
        <datalist id="arrival-airports">
          {filteredArrivalAirports.map((airport, index) => (
            <option key={index} value={airport} />
          ))}
        </datalist>
      </div>
      <div className="input-text">
        <p className="text">Ayrılış Tarihi</p>
        <DatePicker
          selected={departureDate}
          onChange={(date) => setDepartureDate(date)}
          dateFormat="yyyy/MM/dd"
        />
      </div>
      {!isOneWay && (
        <div className="input-text">
          <p className="text">Dönüş Tarihi</p>
          <DatePicker
            selected={returnDate}
            onChange={(date) => setReturnDate(date)}
            dateFormat="yyyy/MM/dd"
          />
        </div>
      )}
      <div className="input-text">
        <label className="text">
          <input
            type="checkbox"
            checked={isOneWay}
            onChange={(e) => setIsOneWay(e.target.checked)}
          />
          Tek Yönlü Uçuş
        </label>
        <button className="search-button" type="submit">
          Ara
        </button>
      </div>
    </form>
  );
};

export default SearchComponent;
