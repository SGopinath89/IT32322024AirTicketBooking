import React from "react";

const BookingPiece = ({ ele, onEditClick, onDeleteClick }) => {
  return (
    <div
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
      <div
        className="flex w-20 flex-shrink-0 justify-center cursor-pointer bg-blue-900 p-2 text-white rounded-md mx-1"
        id={ele.flightId}
        onClick={(e) => onEditClick(e)}
      >
        Edit
      </div>
      <div
        className="flex w-20 flex-shrink-0 justify-center cursor-pointer bg-red-700 p-2 text-white rounded-md mx-1"
        onClick={(e) => onDeleteClick(e)}
      >
        Delete
      </div>
    </div>
  );
};

export default BookingPiece;
