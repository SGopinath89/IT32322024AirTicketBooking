import React, { useEffect, useState } from "react";
import Notification from "../../components/Notification";
import { useNavigate } from "react-router-dom";
import unauthorizedHandler from "../../functions/unauthorizedHandler";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [notification, setNotification] = useState({ message: "", status: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllBookings = async () => {
      const res = await fetch("/api1/booking/");

      unauthorizedHandler(res, dispatch, navigate);

      if (res.ok) {
        const data = await res.json();
        allBookings(data);
      }
    };

    fetchAllBookings();
  }, [notification]);

  return (
    <div className="bg-hero-pattern h-full bg-no-repeat bg-cover size-full">
      <Notification notification={notification} />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 p-6 bg-white/30 rounded-xl shadow-2xl flex flex-col items-center overflow-scroll"
        style={{ maxHeight: "80vh", scrollbarWidth: "none" }}
      >
        <h1 className="text-4xl text-white text-center font-extralight my-10">
          All Bookings
        </h1>
        <div className="flex flex-shrink-0 justify-between rounded-xl overflow-hidden h-16 items-center p-2 w-11/12">
          <div className="flex flex-1 flex-shrink-0 justify-center text-xl font-bold">
            Flight No
          </div>
          <div className="flex flex-1 flex-shrink-0 justify-center text-xl font-bold">
            Airport
          </div>
          <div className="flex flex-1 flex-shrink-0 justify-center text-xl font-bold">
            Date
          </div>
          <div className="flex flex-1 flex-shrink-0 justify-center text-xl font-bold">
            Time
          </div>
          <div className="flex flex-1 flex-shrink-0 justify-center text-xl font-bold">
            Seat No
          </div>
        </div>
        {allBookings.map((ele) => {
          return (
            <div
              key={ele.bookingId}
              className="flight-box bg-white/75 text-xl text-slate-700 my-2 flex flex-shrink-0 justify-between rounded-xl overflow-hidden h-16 items-center p-2 w-11/12"
              id={ele.bookingId}
            >
              <div className="flex flex-1 flex-shrink-0 justify-center">
                {ele.flightNo}
              </div>
              <div className="flex flex-1 flex-shrink-0 justify-center">
                {ele.depAirport}
              </div>
              <div className="flex flex-1 flex-shrink-0 justify-center">
                {ele.depDate}
              </div>
              <div className="flex flex-1 flex-shrink-0 justify-center">
                {ele.depTime}
              </div>
              <div className="flex flex-1 flex-shrink-0 justify-center">
                {ele.seatNo}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
