import Flight from "../models/flight.model.js";

export const getAllFlights = async (req, res) => {
  let flights = await Flight.find();
  return res.status(200).json(flights);
};

export const getFilteredFlights = async (req, res) => {
  const { from, to } = req.body;

  try {
    let filteredFlightsArr = await Flight.find({
      $and: [{ departure_airport: from }, { arrival_airport: to }],
    });

    return res.status(200).json(filteredFlightsArr);
  } catch (err) {
    console.log("The Error is : " + error);
  }
};

export const getFlightById = async (req, res) => {
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

export const createFlightBulk = async (req, res) => {
  const flightsArray = req.body;

  if (Array.isArray(flightsArray)) {
    try {
      for (let i = 0; i < flightsArray.length; i++) {
        const {
          flight_number,
          departure_airport,
          departure_time,
          arrival_airport,
          arrival_time,
          fare,
          available_seats,
          photo,
        } = flightsArray[i];

        const newFlight = new Flight({
          flight_number,
          departure_airport,
          departure_time,
          arrival_airport,
          arrival_time,
          fare,
          available_seats,
          photo,
        });

        await newFlight.save();
      }
      return res
        .status(200)
        .json(JSON.stringify({ message: "flight created" }));
    } catch (error) {
      console.log("the error is " + error);
    }
  }
};
