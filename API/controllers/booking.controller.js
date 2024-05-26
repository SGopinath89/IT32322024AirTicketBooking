import Booking from "../models/booking.model.js";
import Flight from "../models/flight.model.js";
import { ObjectId } from "mongodb";
import errorProvider from "../utils/errorProvider.js";

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

export const getBookingsByUser = async (req, res, next) => {
  let { id: userId } = req.user;

  try {
    userId = new ObjectId(userId);

    const bookings = await Booking.find({ user_id: userId });

    if (!bookings) {
      return next(errorProvider(404, "No Bookings found"));
    }

    const mapedArr = [];
    for (let i = 0; i < bookings.length; i++) {
      let flightId = new ObjectId(bookings[i].flight_id);
      const flightData = await Flight.findOne({ _id: flightId });
      if (!flightData) {
        return next(errorProvider(404, "No flight found for the booking"));
      }

      const reqData = {
        bookingId: bookings[i]._id,
        flightNo: flightData.flight_number,
        depAirport: flightData.departure_airport,
        depTime: flightData.departure_time,
        depDate: bookings[i].date,
        seatNo: bookings[i].seat_no,
      };

      mapedArr.push(reqData);
    }

    return res.status(200).json(mapedArr);
  } catch (error) {
    next(error);
  }
};

export const getBooking = async (req, res, next) => {
  const { id } = req.params;

  try {
    let bookingId = new ObjectId(id);

    const booking = await Booking.findOne({ _id: bookingId });

    if (!booking) {
      return next(errorProvider(404, "No Booking found"));
    }

    return res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();

    if (!bookings) {
      return next(errorProvider(404, "No Bookings found"));
    }

    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

export const deleteBooking = async (req, res, next) => {
  const { id } = req.params;

  try {
    const bookingId = new ObjectId(id);
    const deletedBooking = await Booking.deleteOne({ _id: bookingId });

    if (!deletedBooking) {
      return next(errorProvider(400, "Not deleted"));
    }

    res.status(200).json("booking deleted");
  } catch (error) {
    next(error);
  }
};
