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
        id: 1,
        airline: "Airline A",
        flightNumber: "AA43123",
        departure: "Esenboğa Havalimanı",
        arrival: "Atatürk Havalimanı",
        departureTime: "2024-02-02T10:00:00",
        arrivalTime: "2024-02-02T11:15:00",
        duration: "1 saat 15 dakika",
        price: 2400,
      },
];

app.post("/api/searchFlights", (req, res) => {
  const { departure, arrival, departureDate, returnDate, isOneWay } = req.body;

  let filteredFlights = flights.filter((flight) => {
    const flightDepartureDate = flight.departureTime.split("T")[0];
    const flightArrivalDate = flight.arrivalTime.split("T")[0];

    return (
      flight.departure === departure &&
      flight.arrival === arrival &&
      flightDepartureDate === departureDate &&
      (isOneWay || flightArrivalDate === returnDate)
    );
  });

  res.json(filteredFlights);
});

app.listen(port, () => {
  console.log(`Listening on ${port}.`);
});
