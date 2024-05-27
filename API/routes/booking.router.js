import express from "express";
import {
  getBookedSeats,
  getBookingsByUser,
  makeBooking,
  getBooking,
  getAllBookings,
  deleteBooking,
  updateBooking,
} from "./../controllers/booking.controller.js";

import verifyUser from "../utils/verifyUser.js";
import verifyAdmin from "../utils/verifyAdmin.js";

const router = express.Router();

router.post("/new", verifyUser, makeBooking);
router.get("/user", verifyUser, getBookingsByUser);
router.post("/flight", getBookedSeats);
router.get("/:id", verifyUser, getBooking);
router.get("/", verifyAdmin, getAllBookings);
router.delete("/:id", verifyUser, deleteBooking);
router.put("/update", verifyUser, updateBooking);

export default router;
