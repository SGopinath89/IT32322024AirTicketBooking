import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import Header from "./Header";

export default function AdminRoute() {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser?.admin ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/Login" />
  );
}
