import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import flightRouter from "./routes/flight.router.js";
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";
import bookingRouter from "./routes/booking.router.js";
dotenv.config();

const port = 8080;

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Conected to Mongo");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api1/flight", flightRouter);
app.use("/api1/auth", authRouter);
app.use("/api1/user", userRouter);
app.use("/api1/booking", bookingRouter);

app.use((err, req, res, next) => {
  const statuscode = err.statuscode;
  const message = err.message;
  return res.status(statuscode).json({
    success: false,
    message,
    statuscode,
  });
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
