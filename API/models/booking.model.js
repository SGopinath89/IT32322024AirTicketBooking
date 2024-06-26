import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    flight_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    seat_no: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
