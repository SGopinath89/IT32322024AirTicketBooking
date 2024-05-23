import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <div>
        <div className="slider"></div>
      </div>
      <form>
        <select name="from" id="from" onChange={(eve) => onChangeHandler(eve)}>
          <option value="0">From</option>

          {airports.map((ele, ind) => (
            <option key={ind} value={ele}>
              {ele}
            </option>
          ))}
        </select>
        <select name="to" id="to" onChange={(eve) => onChangeHandler(eve)}>
          <option value="0">To</option>

          {airports.map((ele, ind) => (
            <option key={ind} value={ele}>
              {ele}
            </option>
          ))}
        </select>
        {/* <input
          type="date"
          name="date"
          id="date"
          onChange={(eve) => onChangeHandler(eve)}
        /> */}
        <button onClick={(eve) => onSearchClicked(eve)}>Search Flight</button>
      </form>
    </div>
  );
};

export default Home;
