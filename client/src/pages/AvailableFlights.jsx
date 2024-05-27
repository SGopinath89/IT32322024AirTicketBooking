import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AvailableFlightPiece from "../components/AvailableFlightPiece";

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

  return (
    <div className="bg-hero-pattern h-full bg-no-repeat bg-cover size-full">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 p-6 bg-white/30 rounded-xl shadow-2xl flex flex-col items-center overflow-scroll"
        style={{ maxHeight: "80vh", scrollbarWidth: "none" }}
      >
        <h1 className="text-4xl text-white text-center font-extralight my-10">
          Available Flights
        </h1>

        {flightData.map((ele) => (
          <AvailableFlightPiece key={ele._id} ele={ele} />
        ))}
      </div>
    </div>
  );
};

export default AvailableFlights;
