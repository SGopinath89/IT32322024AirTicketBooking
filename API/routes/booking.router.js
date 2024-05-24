import express from "express";
import {
  getBookedSeats,
  makeBooking,
} from "./../controllers/booking.controller.js";

const router = express.Router();

router.post("/new", makeBooking);
router.post("/", getBookedSeats);

export default router;
