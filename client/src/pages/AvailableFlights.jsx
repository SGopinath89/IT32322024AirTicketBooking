import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AvailableFlights = () => {
  const [flightData, setFlightData] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state;

  useEffect(() => {
    const fetchAvailableFlights = async () => {
      const res = await fetch("/api1/flight/filteredFlights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      setFlightData(data);
    };

    fetchAvailableFlights();
  }, []);

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
    <div className="size-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 p-6 bg-white/30 rounded-xl shadow-2xl flex flex-col items-center">
        <h1 className="text-4xl text-white text-center font-extralight my-10">
          Available Flights
        </h1>
        {flightData.map((ele, ind) => {
          return (
            <div
              key={ind}
              className="flight-box bg-white/75 text-xl text-slate-700 my-2 flex justify-between rounded-xl overflow-hidden h-32 items-center p-2 w-11/12 hover:scale-x-105 cursor-pointer"
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
        })}
      </div>
    </div>
  );
};

export default AvailableFlights;
