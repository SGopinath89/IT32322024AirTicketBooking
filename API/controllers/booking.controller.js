import Booking from "../models/booking.model.js";
import { ObjectId } from "mongodb";

export const getBookedSeats = async (req, res, next) => {
  let { date, flightId } = req.body;

  try {
    flightId = new ObjectId(flightId);
    let bookedSeats = await Booking.find(
      { flight_id: flightId, date },
      { seat_no: 1 }
    );
    res.status(200).json(bookedSeats);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const makeBooking = async (req, res, next) => {
  let { userId, flightId, date, seatNoArr } = req.body;
  let isBooked = false;
  try {
    flightId = new ObjectId(flightId);

    for (let i = 0; i < seatNoArr.length; i++) {
      const thatAlreadyBookedSeat = await Booking.findOne({
        flight_id: flightId,
        date,
        seat_no: seatNoArr[i] + 1,
      });

      console.log(thatAlreadyBookedSeat);

      if (thatAlreadyBookedSeat) {
        isBooked = true;
        console.log("try block");
        res
          .status(403)
          .json(JSON.stringify({ message: "already booked seat" }));
        break;
      }
    }
  } catch (error) {
    isBooked = true;
    console.log("catch block");
    console.log("error on 'thatAlreadyBookedSeat' checking :" + error);
    next(error);
  }

  if (!isBooked) {
    try {
      flightId = new ObjectId(flightId);
      userId = new ObjectId(userId);

      let lastInsertedId = "";
      for (let i = 0; i < seatNoArr.length; i++) {
        const newBooking = new Booking({
          flight_id: flightId,
          user_id: userId,
          date: date,
          seat_no: seatNoArr[i] + 1,
        });

        lastInsertedId = (await newBooking.save())._id;
      }

      res.status(201).json({ lastInsertedId });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
