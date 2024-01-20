import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchComponent = ({ onSearch, onSort, isLoading }) => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [isOneWay, setIsOneWay] = useState(false);

  const airports = [
    "Atatürk Havalimanı",
    "Sabiha Gökçen Havalimanı",
    "Adnan Menderes Havalimanı",
    "Antalya Havalimanı",
    "Esenboğa Havalimanı",
  ];
  const [filteredDepartureAirports, setFilteredDepartureAirports] =
    useState(airports);
  const [filteredArrivalAirports, setFilteredArrivalAirports] =
    useState(airports);

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
    const formattedReturnDate = returnDate
      ? returnDate.toISOString().split("T")[0]
      : null;
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

      <label>
        <input
          type="checkbox"
          checked={isOneWay}
          onChange={(e) => setIsOneWay(e.target.checked)}
        />
        Tek Yönlü Uçuş
      </label>

   {/*    <div className="sort-options">
        <label htmlFor="sort">Sıralama: </label>
        <select id="sort" onChange={handleSortChange}>
          <option value="departureTime">Kalkış Saati</option>
          <option value="arrivalTime">Varış Saati</option>
          <option value="duration">Uçuş Süresi</option>
          <option value="price">Fiyat</option>
        </select>
      </div> */}

      {isLoading && <div className="loading">Yükleniyor...</div>}

      <button className="search-button" type="submit">
        Ara
      </button>
    </form>
  );
};

export default SearchComponent;
