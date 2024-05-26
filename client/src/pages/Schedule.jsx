import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Notification from "../components/Notification";

const Schedule = () => {
  const [seatCount, setSeatCount] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [choosedSeats, setChoosedSeats] = useState([]);
  const [tomorrowsDate, setTomorrowsDate] = useState("");
  const [choosenDate, setChoosenDate] = useState("");
  const [lastInsertedId, setLastInsertedId] = useState("");
  const [notification, setNotification] = useState({ message: "", status: "" });

  const { currentUser } = useSelector((state) => state.user);

  const location = useLocation();
  const { flightId } = location.state;

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
      const data = await res.json();

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
  }, [flightId, seatCount, lastInsertedId, choosenDate]);

  const onSeatClicked = (e) => {
    if (e.target.classList.contains("bg-red-400")) {
      return;
    }

    let target = e.target;
    while (target && !target.classList.contains("seat")) {
      target = target.parentElement;
    }

    const seatId = parseInt(target.id, 10);
    const updatedSeats = [...choosedSeats];

    if (!updatedSeats.includes(seatId)) {
      updatedSeats.push(seatId);
    } else {
      const index = updatedSeats.indexOf(seatId);
      if (index !== -1) updatedSeats.splice(index, 1);
    }

    setChoosedSeats(updatedSeats);
  };

  useEffect(() => {
    setTomorrowsDate(getTomorrowsDate());
    setChoosenDate(tomorrowsDate);
  }, [choosedSeats]);

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
    if (choosedSeats.length) {
      const res = await fetch("/api1/booking/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: choosenDate,
          userId: currentUser._id,
          flightId,
          seatNoArr: choosedSeats,
        }),
      });

      if (!res.ok) {
        return setNotification({
          message: "A seat already booked, choose different one",
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
    } else {
      setNotification({
        message: "Please choose atleast one seat",
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
          defaultValue={tomorrowsDate}
          onChange={(e) => onDateChange(e)}
          className="bg-transparent text-white text-xl px-5 py-2 focus:outline-none cursor-pointer rounded-md border border-white "
        />
      </div>
      <div className="my-6 px-4">
        {bookedSeats.map((status, ind) => {
          return (
            <div
              key={ind}
              id={ind}
              className={`seat size-16 mx-1 my-1 inline-block relative rounded-md ${
                status === 0 ? "bg-white/70  cursor-pointer" : "bg-red-400"
              }`}
              onClick={onSeatClicked}
              style={{
                backgroundColor: choosedSeats.includes(ind)
                  ? "rgba(17,94,89,0.5)"
                  : "",
              }}
            >
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
                {ind + 1}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <input
          type="button"
          value="Book"
          className="w-40 rounded-md px-3 py-2 text-xl focus:outline-none bg-teal-800 text-white hover:bg-teal-700 transition-colors cursor-pointer"
          onClick={onBookClicked}
        />
      </div>
    </div>
  );
};

export default Schedule;
