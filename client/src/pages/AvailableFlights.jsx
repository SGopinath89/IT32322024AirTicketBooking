import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AvailableFlights = () => {
  const [flightData, setFlightData] = useState([]);

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
    console.log(flightData);
  }, []);

  const onFlightClick = async (e) => {};

  return (
    <div>
      <h1>AvailableFlightsssssssssss</h1>
      {flightData.map((ele, ind) => {
        return (
          <h2 key={ind} id={ele._id} onClick={(e) => onFlightClick(e)}>
            <img src={ele.photo} />
            {ele.flight_number}
          </h2>
        );
      })}
    </div>
  );
};

export default AvailableFlights;
