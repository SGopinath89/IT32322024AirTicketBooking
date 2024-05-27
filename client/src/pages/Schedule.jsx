import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import unauthorizedHandler from "../functions/unauthorizedHandler";
import Seat from "../components/Seat";

const Schedule = () => {
  const [seatCount, setSeatCount] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [choosedSeats, setChoosedSeats] = useState([]);
  const [tomorrowsDate, setTomorrowsDate] = useState("");
  const [choosenDate, setChoosenDate] = useState("");
  const [lastInsertedId, setLastInsertedId] = useState("");
  const [notification, setNotification] = useState({ message: "", status: "" });
  const [btnType, setBtnType] = useState("Book");
  const [dateActive, setDateActive] = useState(true);

  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const { flightId } = location.state;
  const { bookingId } = location.state;

  useEffect(() => {
    if (bookingId) {
      setBtnType("Update");
    }
  }, [bookingId]);

  const getTomorrowsDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formattedDate = tomorrow.toISOString().split("T")[0];
    return formattedDate;
  };

  useEffect(() => {
    const fetchAllSeats = async () => {
      const res = await fetch(`/api1/flight/getFlightById/${flightId}`);
      unauthorizedHandler(res, dispatch, navigate);

      const data = await res.json();
      setSeatCount(data.available_seats);
    };

    fetchAllSeats();
  }, [flightId]);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      const res = await fetch(`/api1/booking/flight`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: choosenDate || getTomorrowsDate(),
          flightId,
        }),
      });

      unauthorizedHandler(res, dispatch, navigate);

      const data = await res.json();
      console.log(data);
      const bookedArr = data.map((ele) => ele.seat_no - 1);
      const finalArr = new Array(seatCount).fill(0);
      bookedArr.forEach((seatNo) => {
        if (seatNo >= 0 && seatNo < seatCount) {
          finalArr[seatNo] = 1;
        }
      });

      setBookedSeats(finalArr);
    };

    fetchBookedSeats();
  }, [flightId, seatCount, lastInsertedId, choosenDate, bookingId]);

  const onSeatClicked = (e) => {
    let target = e.target;
    while (target && !target.classList.contains("seat")) {
      target = target.parentElement;
    }

    if (target.classList.contains("bg-red-400")) {
      return;
    }

    const seatId = parseInt(target.id, 10);

    if (btnType == "Book") {
      const updatedSeats = [...choosedSeats];

      if (!updatedSeats.includes(seatId)) {
        updatedSeats.push(seatId);
      } else {
        const index = updatedSeats.indexOf(seatId);
        if (index !== -1) updatedSeats.splice(index, 1);
      }
      setChoosedSeats(updatedSeats);
    } else {
      setChoosedSeats([seatId]);
    }
  };

  useEffect(() => {
    if (choosedSeats.length) {
      setDateActive(false);
    } else {
      setDateActive(true);
    }
  }, [choosedSeats]);

  useEffect(() => {
    setTomorrowsDate(getTomorrowsDate());
    setChoosenDate(tomorrowsDate);
  }, []);

  const onDateChange = (e) => {
    const tomDate = new Date(getTomorrowsDate());
    const choDate = new Date(e.target.value);
    if (choDate < tomDate) {
      e.target.value = choosenDate;
      return setNotification({
        message: "Please choose a valid date (atleast a day before travel)",
        status: "failure",
      });
    }

    return setChoosenDate(e.target.value);
  };

  const onBookClicked = async () => {
    console.log(choosenDate);
    if (choosedSeats.length) {
      let res = "";
      if (btnType == "Book") {
        res = await fetch("/api1/booking/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: choosenDate || getTomorrowsDate(),
            userId: currentUser._id,
            flightId,
            seatNoArr: choosedSeats,
          }),
        });
      } else {
        res = await fetch(`/api1/booking/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingId,
            seatNo: choosedSeats[0],
            date: choosenDate || getTomorrowsDate(),
          }),
        });
      }

      unauthorizedHandler(res, dispatch, navigate);
      console.log(res);
      if (!res.ok) {
        return setNotification({
          message: "The seat already booked, choose different one",
          status: "failure",
        });
      }

      const data = await res.json();

      setLastInsertedId(data.lastInsertedId);
      setChoosedSeats([]);
      setNotification({
        message: "Booking Succesful",
        status: "success",
      });

      navigate("/ManageBookings");
    } else {
      return setNotification({
        message: "Choose a seat",
        status: "failure",
      });
    }
  };

  return (
    <div className="bg-hero-pattern h-full bg-no-repeat bg-cover size-full">
      <Notification notification={notification} />
      <div className="flex justify-center">
        <input
          type="date"
          disabled={!dateActive}
          defaultValue={tomorrowsDate}
          onChange={(e) => onDateChange(e)}
          className="bg-transparent text-white text-xl px-5 py-2 focus:outline-none cursor-pointer rounded-md border border-white disabled:opacity-35 disabled:cursor-not-allowed"
        />
      </div>
      <div className="my-6 px-4">
        {bookedSeats.map((status, ind) => (
          <Seat
            status={status}
            ind={ind}
            key={ind}
            onSeatClicked={onSeatClicked}
            choosedSeats={choosedSeats}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <input
          type="button"
          value={btnType}
          className="w-40 rounded-md px-3 py-2 text-xl focus:outline-none bg-teal-800 text-white hover:bg-teal-700 transition-colors cursor-pointer"
          onClick={onBookClicked}
        />
      </div>
    </div>
  );
};

export default Schedule;
