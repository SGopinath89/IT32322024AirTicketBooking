import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import flight2 from "../assets/imgs/flight2.jpg";

const Home = () => {
  const airports = ["ATL", "DXB", "LHR", "HKG", "CMB"];
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setFormData((curData) => {
      return { ...curData, [e.target.id]: e.target.value };
    });

    console.log(formData);
  };

  const onSearchClicked = async (e) => {
    e.preventDefault();

    if (
      !formData.from ||
      formData.from == "0" ||
      !formData.to ||
      formData.to == "0"
    ) {
      return alert("Please choose both airports");
    }
    navigate("/AvailableFlights", { state: { formData } });
  };
  return (
    <div className="bg-hero-pattern h-full bg-no-repeat bg-cover size-full">
      <div className="inline-block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 p-6 bg-white/30 rounded-xl shadow-2xl">
        <form className=" flex justify-around">
          <select
            name="from"
            id="from"
            className="w-40 rounded-md px-3 py-2 text-xl focus:outline-none"
            onChange={(eve) => onChangeHandler(eve)}
          >
            <option value="0">From</option>

            {airports.map((ele, ind) => (
              <option key={ind} value={ele}>
                {ele}
              </option>
            ))}
          </select>
          <select
            name="to"
            id="to"
            onChange={(eve) => onChangeHandler(eve)}
            className="w-40 rounded-md px-3 py-2 text-xl focus:outline-none"
          >
            <option value="0">To</option>

            {airports.map((ele, ind) => (
              <option key={ind} value={ele}>
                {ele}
              </option>
            ))}
          </select>
          <button
            onClick={(eve) => onSearchClicked(eve)}
            className="w-40 rounded-md px-3 py-2 text-xl focus:outline-none bg-teal-800 text-white hover:bg-teal-700 border border-teal-800 transition-colors"
          >
            Search Flight
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
