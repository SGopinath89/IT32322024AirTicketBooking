import React, { useEffect, useState } from "react";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";
import unauthorizedHandler from "../functions/unauthorizedHandler";
import { useDispatch } from "react-redux";
import BookingPiece from "../components/BookingPiece";

const ManageBookings = () => {
  const [myBookings, setMyBookings] = useState([]);
  const [notification, setNotification] = useState({ message: "", status: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllMyBookings = async () => {
      const res = await fetch("/api1/booking/user");

      unauthorizedHandler(res, dispatch, navigate);

      if (res.ok) {
        const data = await res.json();
        setMyBookings(data);
      }
    };

    fetchAllMyBookings();
  }, [notification]);

  const onDeleteClick = async (e) => {
    let bookingId = e.target.parentElement.id;

    try {
      const res = await fetch(`/api1/booking/${bookingId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const data = await res.json();
        return setNotification({
          message: "Booking deleted",
          status: "success",
        });
      }
      setNotification({
        message: "Booking Not deleted",
        status: "failure",
      });
    } catch (error) {
      console.log(error);
      setNotification({
        message: "Booking Not deleted",
        status: "failure",
      });
    }
  };

  const onEditClick = async (e) => {
    let bookingId = e.target.parentElement.id;
    let flightId = e.target.id;

    navigate("/Schedule", { state: { bookingId, flightId } });
  };

  return (
    <div className="bg-hero-pattern h-full bg-no-repeat bg-cover size-full">
      <Notification notification={notification} />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 p-6 bg-white/30 rounded-xl shadow-2xl flex flex-col items-center overflow-scroll"
        style={{ maxHeight: "80vh", scrollbarWidth: "none" }}
      >
        <h1 className="text-4xl text-white text-center font-extralight my-10">
          Manage Bookings
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
          <div className="flex w-40 flex-shrink-0 justify-center p-2 mx-1 text-xl font-bold">
            Actions
          </div>
        </div>
        {myBookings.map((ele) => (
          <BookingPiece
            ele={ele}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            key={ele.bookingId}
          />
        ))}
      </div>
    </div>
  );
};

export default ManageBookings;
