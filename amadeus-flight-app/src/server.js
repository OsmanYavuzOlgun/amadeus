const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json());


const flights = [
    {
        id: 1,
        airline: "Airline A",
        flightNumber: "AA43123",
        departure: "Atatürk Havalimanı",
        arrival: "Esenboğa Havalimanı",
        departureTime: "2024-01-01T10:00:00",
        arrivalTime: "2024-01-01T11:15:00",
        duration: "1 saat 15 dakika",
        price: 2400,
      },
      {
        id: 2,
        airline: "Airline B",
        flightNumber: "AA23123",
        departure: "Sabiha Gökçen Havalimanı",
        arrival: "Antalya Havalimanı",
        departureTime: "2024-02-02T12:00:00",
        arrivalTime: "2024-02-02T13:15:00",
        duration: "1 saat 15 dakika",
        price: 2100,
      },
      {
        id: 3,
        airline: "Airline P",
        flightNumber: "AA12323",
        departure: "Adnan Menderes Havalimanı",
        arrival: "Esenboğa Havalimanı",
        departureTime: "2024-03-03T20:00:00",
        arrivalTime: "2024-03-03T21:00:00",
        duration: "1 saat",
        price: 1500,
      },
      {
        id: 4,
        airline: "Airline THY",
        flightNumber: "AA12344",
        departure: "Atatürk Havalimanı",
        arrival: "Adnan Menderes Havalimanı",
        departureTime: "2024-04-04T02:00:00",
        arrivalTime: "2024-04-04T05:05:00",
        duration: "3 saat 5 dakika",
        price: 1200,
      },

      {
        id: 5,
        airline: "Airline A",
        flightNumber: "AA43123",
        departure: "Esenboğa Havalimanı",
        arrival: "Atatürk Havalimanı",
        departureTime: "2024-02-02T10:00:00",
        arrivalTime: "2024-02-02T11:15:00",
        duration: "1 saat 15 dakika",
        price: 2400,
      },
      {
        id: 6,
        airline: "Airline A",
        flightNumber: "AA43123",
        departure: "Atatürk Havalimanı",
        arrival: "Esenboğa Havalimanı",
        departureTime: "2024-01-01T10:00:00",
        arrivalTime: "2024-01-01T11:15:00",
        duration: "1 saat 15 dakika",
        price: 2420022,
      },
      {
        id: 7,
        airline: "Airline A",
        flightNumber: "AA43123",
        departure: "Atatürk Havalimanı",
        arrival: "Esenboğa Havalimanı",
        departureTime: "2024-01-01T10:00:00",
        arrivalTime: "2024-01-01T11:15:00",
        duration: "1 saat 15 dakika",
        price: 242220,
      },
];

const returnFlights = [
  {
    id: 8,
    airline: "Airline A",
    flightNumber: "AA43124",
    departure: "Esenboğa Havalimanı",
    arrival: "Atatürk Havalimanı",
    departureTime: "2024-01-02T12:00:00",
    arrivalTime: "2024-01-02T13:15:00",
    duration: "1 saat 15 dakika",
    price: 2500,
  },
];


app.post('/api/searchFlights', (req, res) => {
  const { departure, arrival, departureDate, returnDate, isOneWay } = req.body;

  let filteredFlights = flights.filter(flight =>
    flight.departure === departure &&
    flight.arrival === arrival &&
    new Date(flight.departureTime).toDateString() === new Date(departureDate).toDateString()
  );

  if (!isOneWay) {
    const filteredReturnFlights = returnFlights.filter(flight =>
      flight.departure === arrival &&
      flight.arrival === departure &&
      new Date(flight.departureTime).toDateString() === new Date(returnDate).toDateString()
    );

    filteredFlights = filteredFlights.concat(filteredReturnFlights);
  }

  res.json(filteredFlights);
});



app.listen(port, () => {
  console.log(`Listening on ${port}.`);
});
