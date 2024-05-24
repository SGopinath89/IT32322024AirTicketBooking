import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AvailableFlights from "./pages/AvailableFlights";
import Schedule from "./pages/Schedule";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<AvailableFlights />} path="/AvailableFlights" />
        <Route element={<Schedule />} path="/Schedule" />
        <Route element={<Login />} path="/Login" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
