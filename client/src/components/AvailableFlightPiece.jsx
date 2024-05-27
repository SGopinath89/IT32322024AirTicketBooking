import React from "react";
import { useNavigate } from "react-router-dom";

const AvailableFlightPiece = ({ ele }) => {
  const navigate = useNavigate();

  const onFlightClick = (e) => {
    // Traverse up the DOM to find the nearest parent div with an ID
    let target = e.target;
    while (target && !target.classList.contains("flight-box")) {
      target = target.parentElement;
    }

    if (target && target.id) {
      const flightId = target.id;
      navigate("/Schedule", { state: { flightId } });
    }
  };

  return (
    <div
      className="flight-box bg-white/75 text-xl text-slate-700 my-2 flex flex-shrink-0 justify-between rounded-xl overflow-hidden h-32 items-center p-2 w-11/12 cursor-pointer"
      id={ele._id}
      onClick={(e) => onFlightClick(e)}
    >
      <img src={ele.photo} className="size-28 rounded-full" />

      <div className="w-3/4 flex flex-col justify-between">
        <div className="text-center text-2xl font-bold">
          {ele.flight_number}
        </div>
        <div className="flex my-1">
          <div className="flex-grow flex-shrink-0">
            <p className="font-bold">Departure</p>
            <p>Airport: {ele.departure_airport}</p>
            <p>Time: {ele.departure_time}</p>
          </div>
          <div className="flex-grow flex-shrink-0">
            <p className="font-bold">Arrival</p>
            <p>Airport: {ele.arrival_airport}</p>
            <p>Time: {ele.arrival_time}</p>
          </div>
          <div className="flex-grow flex-shrink-0">
            <p>Fare: {ele.fare}</p>
            <p>Seat Count: {ele.available_seats}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableFlightPiece;
