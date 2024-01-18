const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;


app.use(cors()); // CORS middleware'ini ekleyin
app.use(express.json());

const flights = [
    {
      id: 1,
      airline: "Airline A",
      flightNumber: "AA123",
      departure: "İstanbul",
      arrival: "Ankara",
      departureTime: "2023-04-01T10:00:00",
      arrivalTime: "2023-04-01T11:15:00",
      duration: "1 saat 15 dakika",
      price: 100
    },
  ];
  

  app.post('/api/searchFlights', (req, res) => {
    const { departure, arrival, departureDate, returnDate, isOneWay } = req.body;
  
    let filteredFlights = flights.filter(flight =>
      flight.departure === departure &&
      flight.arrival === arrival &&
      // Tarih formatınızı ve karşılaştırma mantığınızı buraya uyarlayın
      new Date(flight.departureTime).toDateString() === new Date(departureDate).toDateString()
    );
  
    if (!isOneWay) {
      filteredFlights = filteredFlights.filter(flight =>
        new Date(flight.returnTime).toDateString() === new Date(returnDate).toDateString()
      );
    }
  
    res.json(filteredFlights);
  });

app.listen(port, () => {
    console.log(`Listening on ${port}.`);
  });