const bookings = [
  {
    flight_id: "vcvbgvvvhv",
    user_id: 2,
    date: "anydate",
    seat_no: 12,
  },
];

export const getBookedSeats = (req, res) => {
  let { date } = req.body;

  let bookedSeats = bookings.filter((booking) => booking.date == date);

  res.status(200).json(bookedSeats);
};

export const makeBooking = (req, res) => {
  let { userId, flightId, date, seatNoArr } = req.body;
  let isBooked = false;
  bookings.forEach((booking) => {
    seatNoArr.forEach((seatNo) => {
      if (booking.seat_no == seatNo) return (isBooked = true);
    });
  });

  if (!isBooked) {
    seatNoArr.forEach((seatNo) => {
      bookings.push({
        flight_number: flightNumber,
        user_id: userId,
        date: date,
        seat_no: seatNo,
      });
    });
  }
};
