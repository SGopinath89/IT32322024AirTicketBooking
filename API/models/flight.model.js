import mongoose from "mongoose";

//     flight_number: "JD100",
//     departure_airport: "ATL",
//     departure_time: "08:00",
//     arrival_airport: "DXB",
//     arrival_time: "23:30",
//     fare: 700,
//     available_seats: 150,

const flightSchema = new mongoose.Schema(
  {
    flight_number: {
      type: String,
      required: true,
      unique: true,
    },
    departure_airport: {
      type: String,
      required: true,
    },
    departure_time: {
      type: String,
      required: true,
    },
    arrival_airport: {
      type: String,
      required: true,
    },
    arrival_time: {
      type: String,
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    available_seats: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Flight = mongoose.model("Flight", flightSchema);

export default Flight;
