import Flight from "../models/flight.model.js";

import { ObjectId } from "mongodb";

export const getAllFlights = async (req, res, next) => {
  let flights = await Flight.find();
  return res.status(200).json(flights);
};

export const getFilteredFlights = async (req, res, next) => {
  const { from, to } = req.body;

  try {
    let filteredFlightsArr = await Flight.find({
      $and: [{ departure_airport: from }, { arrival_airport: to }],
    });

    return res.status(200).json(filteredFlightsArr);
  } catch (err) {
    console.log("The Error is : " + error);
    next(error);
  }
};

export const getFlightById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const objId = new ObjectId(id);

    const flight = await Flight.findOne({ _id: objId });

    return res.status(200).json(flight);
  } catch (error) {
    next(error);
  }
};

export const createFlight = async (req, res, next) => {
  const {
    flight_number,
    departure_airport,
    departure_time,
    arrival_airport,
    arrival_time,
    fare,
    available_seats,
    photo,
  } = req.body;

  console.log(photo);

  try {
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

    return res.status(200).json(JSON.stringify({ message: "flight created" }));
  } catch (error) {
    console.log("the error is " + error);
    next(error);
  }
};

export const createFlightBulk = async (req, res, next) => {
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
      next(error);
    }
  }
};
