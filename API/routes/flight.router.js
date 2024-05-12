import express from "express";
import {
  getAllFlights,
  getFilteredFlightById,
  getFilteredFlights,
  createFlight,
} from "./../controllers/flight.controller.js";

const router = express.Router();

router.get("/filteredFlights", getFilteredFlights);
router.get("/filteredFlightById", getFilteredFlightById);
router.post("/new", createFlight);
router.get("/", getAllFlights);

export default router;
