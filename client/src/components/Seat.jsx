import React from "react";

const Seat = ({ status, ind, onSeatClicked, choosedSeats }) => {
  return (
    <div
      key={ind}
      id={ind}
      className={`seat size-16 mx-1 my-1 inline-block relative rounded-md ${
        status === 0 ? "bg-white/70  cursor-pointer" : "bg-red-400"
      }`}
      onClick={onSeatClicked}
      style={{
        backgroundColor: choosedSeats.includes(ind) ? "rgba(17,94,89,0.5)" : "",
      }}
    >
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
        {ind + 1}
      </p>
    </div>
  );
};

export default Seat;
