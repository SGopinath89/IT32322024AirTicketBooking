import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AvailableFlights from "./pages/AvailableFlights";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<AvailableFlights />} path="/AvailableFlights" />
        <Route element={<Home />} path="/" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
