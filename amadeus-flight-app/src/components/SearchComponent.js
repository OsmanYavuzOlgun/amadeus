import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const SearchComponent = ({ onSearch }) => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [isOneWay, setIsOneWay] = useState(false);

  // Örnek havaalanı listesi
  const airports = ["İstanbul", "Ankara", "İzmir", "Antalya"];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ departure, arrival, departureDate, returnDate, isOneWay });
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <input
        type="text"
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
        placeholder="Kalkış Havaalanı"
        list="airports"
        required
      />
      <datalist id="airports">
        {airports.map((airport, index) => (
          <option key={index} value={airport} />
        ))}
      </datalist>

      <input
        type="text"
        value={arrival}
        onChange={(e) => setArrival(e.target.value)}
        placeholder="Varış Havaalanı"
        list="airports"
        required
      />

      <DatePicker
        selected={departureDate}
        onChange={(date) => setDepartureDate(date)}
        dateFormat="yyyy/MM/dd"
      />

      {!isOneWay && (
        <DatePicker
          selected={returnDate}
          onChange={(date) => setReturnDate(date)}
          dateFormat="yyyy/MM/dd"
        />
      )}

      <label>
        <input
          type="checkbox"
          checked={isOneWay}
          onChange={(e) => {
            setIsOneWay(e.target.checked);
            if (e.target.checked) {
              setReturnDate(null);
            }
          }}
        />
        Tek Yönlü Uçuş
      </label>

      <button type="submit">Ara</button>
    </form>
  );
};

export default SearchComponent;
