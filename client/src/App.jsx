import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AvailableFlights from "./pages/AvailableFlights";
import Schedule from "./pages/Schedule";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route element={<Home />} path="/" />
          <Route element={<AvailableFlights />} path="/AvailableFlights" />
          <Route element={<Schedule />} path="/Schedule" />
        </Route>

        <Route element={<Login />} path="/Login" />
        <Route element={<Signup />} path="/Signup" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
