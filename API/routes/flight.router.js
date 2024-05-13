import express from "express";
import {
  getAllFlights,
  getFlightById,
  getFilteredFlights,
  createFlight,
  createFlightBulk,
} from "./../controllers/flight.controller.js";

const router = express.Router();

router.get("/filteredFlights", getFilteredFlights);
router.get("/getFlightById/:id", getFlightById);
router.post("/new", createFlight);
router.post("/newbulk", createFlightBulk);
router.get("/", getAllFlights);

export default router;
