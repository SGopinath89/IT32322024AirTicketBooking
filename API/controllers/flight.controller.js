import Flight from "../models/flight.model.js";

const flights = [
  {
    flight_number: "JD100",
    departure_airport: "ATL",
    departure_time: "08:00",
    arrival_airport: "DXB",
    arrival_time: "23:30",
    fare: 700,
    available_seats: 150,
  },
  {
    flight_number: "JD101",
    departure_airport: "DXB",
    departure_time: "01:00",
    arrival_airport: "LHR",
    arrival_time: "06:30",
    fare: 550,
    available_seats: 130,
  },
  {
    flight_number: "JD102",
    departure_airport: "LHR",
    departure_time: "08:00",
    arrival_airport: "HKG",
    arrival_time: "23:30",
    fare: 800,
    available_seats: 120,
  },
  {
    flight_number: "JD103",
    departure_airport: "HKG",
    departure_time: "01:00",
    arrival_airport: "CMB",
    arrival_time: "06:30",
    fare: 450,
    available_seats: 100,
  },
  {
    flight_number: "JD104",
    departure_airport: "CMB",
    departure_time: "08:00",
    arrival_airport: "ATL",
    arrival_time: "23:30",
    fare: 900,
    available_seats: 140,
  },
  {
    flight_number: "JD105",
    departure_airport: "DXB",
    departure_time: "02:00",
    arrival_airport: "ATL",
    arrival_time: "19:30",
    fare: 750,
    available_seats: 160,
  },
  {
    flight_number: "JD106",
    departure_airport: "HKG",
    departure_time: "04:00",
    arrival_airport: "DXB",
    arrival_time: "08:30",
    fare: 600,
    available_seats: 110,
  },
  {
    flight_number: "JD107",
    departure_airport: "ATL",
    departure_time: "10:00",
    arrival_airport: "LHR",
    arrival_time: "15:30",
    fare: 680,
    available_seats: 140,
  },
  {
    flight_number: "JD108",
    departure_airport: "LHR",
    departure_time: "08:00",
    arrival_airport: "HKG",
    arrival_time: "23:30",
    fare: 820,
    available_seats: 130,
  },
  {
    flight_number: "JD109",
    departure_airport: "HKG",
    departure_time: "01:00",
    arrival_airport: "CMB",
    arrival_time: "06:30",
    fare: 470,
    available_seats: 90,
  },
  {
    flight_number: "JD110",
    departure_airport: "CMB",
    departure_time: "08:00",
    arrival_airport: "ATL",
    arrival_time: "23:30",
    fare: 910,
    available_seats: 150,
  },
  {
    flight_number: "JD111",
    departure_airport: "ATL",
    departure_time: "14:00",
    arrival_airport: "DXB",
    arrival_time: "05:30",
    fare: 720,
    available_seats: 160,
  },
  {
    flight_number: "JD112",
    departure_airport: "DXB",
    departure_time: "10:00",
    arrival_airport: "LHR",
    arrival_time: "14:30",
    fare: 580,
    available_seats: 140,
  },
  {
    flight_number: "JD113",
    departure_airport: "LHR",
    departure_time: "16:00",
    arrival_airport: "HKG",
    arrival_time: "07:30",
    fare: 850,
    available_seats: 110,
  },
  {
    flight_number: "JD114",
    departure_airport: "HKG",
    departure_time: "07:00",
    arrival_airport: "CMB",
    arrival_time: "12:30",
    fare: 490,
    available_seats: 100,
  },
  {
    flight_number: "JD115",
    departure_airport: "CMB",
    departure_time: "10:00",
    arrival_airport: "ATL",
    arrival_time: "01:30",
    fare: 920,
    available_seats: 130,
  },
  {
    flight_number: "JD116",
    departure_airport: "ATL",
    departure_time: "16:00",
    arrival_airport: "LHR",
    arrival_time: "21:30",
    fare: 700,
    available_seats: 150,
  },
  {
    flight_number: "JD117",
    departure_airport: "LHR",
    departure_time: "22:00",
    arrival_airport: "HKG",
    arrival_time: "13:30",
    fare: 830,
    available_seats: 120,
  },
  {
    flight_number: "JD118",
    departure_airport: "HKG",
    departure_time: "10:00",
    arrival_airport: "CMB",
    arrival_time: "15:30",
    fare: 480,
    available_seats: 90,
  },
  {
    flight_number: "JD119",
    departure_airport: "CMB",
    departure_time: "18:00",
    arrival_airport: "ATL",
    arrival_time: "09:30",
    fare: 930,
    available_seats: 140,
  },
  {
    flight_number: "JD120",
    departure_airport: "ATL",
    departure_time: "20:00",
    arrival_airport: "DXB",
    arrival_time: "09:30",
    fare: 740,
    available_seats: 160,
  },
];

export const getAllFlights = async (req, res) => {
  let flights = await Flight.find();
  return res.status(200).json(flights);
};

export const getFilteredFlights = async (req, res) => {
  const { from, to } = req.body;

  let filteredFlightsArr = await Flight.find({
    $and: [{ departure_airport: from }, { arrival_airport: to }],
  });

  return res.status(200).json(filteredFlightsArr);
};

export const getFilteredFlightById = async (req, res) => {
  const { id } = req.params;

  const flight = await Flight.findOne({ flight_number: id });

  return res.status(200).json(flight);
};

export const createFlight = async (req, res) => {
  const {
    flight_number,
    departure_airport,
    departure_time,
    arrival_airport,
    arrival_time,
    fare,
    available_seats,
  } = req.body;

  try {
    const newFlight = new Flight({
      flight_number,
      departure_airport,
      departure_time,
      arrival_airport,
      arrival_time,
      fare,
      available_seats,
    });

    await newFlight.save();

    return res.status(200).json(JSON.stringify({ message: "flight created" }));
  } catch (error) {
    console.log("the error is " + error);
  }
};
