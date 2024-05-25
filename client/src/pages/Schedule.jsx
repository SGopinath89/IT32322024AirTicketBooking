import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Schedule = () => {
  const [seatCount, setSeatCount] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [choosedSeats, setChoosedSeats] = useState([]);
  const [tomorrowsDate, setTomorrowsDate] = useState("");
  const [choosenDate, setChoosenDate] = useState("");
  const [lastInsertedId, setLastInsertedId] = useState("");

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
      const res = await fetch(`/api1/booking/`, {
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
      //console.log("final array also chnaged");
      //console.log(bookedSeats);
    };

    fetchBookedSeats();
  }, [flightId, seatCount, lastInsertedId, choosenDate]);

  const onSeatClicked = (e) => {
    if (e.target.classList.contains("bg-red-400")) {
      return;
    }

    const seatId = parseInt(e.target.id, 10);
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
    setChoosenDate(e.target.value);
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
        return alert("A seat already booked, choose different one");
      }

      const data = await res.json();

      setLastInsertedId(data.lastInsertedId);
      setChoosedSeats([]);
    } else {
      alert("Please choose atleast one seat");
    }
  };

  return (
    <div>
      <div>
        <input
          type="date"
          name=""
          id=""
          defaultValue={tomorrowsDate}
          onChange={(e) => onDateChange(e)}
        />
      </div>
      {bookedSeats.map((status, ind) => {
        //console.log("printed the array " + bookedSeats);
        return (
          <div
            key={ind}
            id={ind}
            className={`h-16 w-16 mx-1 my-1 inline-block ${
              status === 0 ? "bg-slate-400 cursor-pointer" : "bg-red-400"
            }`}
            onClick={onSeatClicked}
            style={{
              backgroundColor: choosedSeats.includes(ind) ? "green" : "",
            }}
          >
            {ind + 1}
          </div>
        );
      })}
      <div>
        <input
          type="button"
          value="Book"
          className="hover:cursor-pointer hover:bg-slate-500 my-3 mx-3 px-2 py-2 border border-black "
          onClick={onBookClicked}
        />
      </div>
    </div>
  );
};

export default Schedule;
