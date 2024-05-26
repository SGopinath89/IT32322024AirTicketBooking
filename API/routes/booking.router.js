import express from "express";
import {
  getBookedSeats,
  getBookingsByUser,
  makeBooking,
  getBooking,
  getAllBookings,
  deleteBooking,
} from "./../controllers/booking.controller.js";

import verifyUser from "../utils/verifyUser.js";

const router = express.Router();

router.post("/new", verifyUser, makeBooking);
router.get("/user", verifyUser, getBookingsByUser);
router.post("/flight", getBookedSeats);
router.get("/:id", verifyUser, getBooking);
router.get("/", getAllBookings);
router.delete("/:id", verifyUser, deleteBooking);

export default router;
