import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickHandler = () => {
    dispatch(signOut());
    navigate("/login");
  };
  return (
    <div className="h-20 bg-teal-800 flex justify-between items-center text-white px-3">
      <p className="text-6xl font-thin mx-16">JD Airlines</p>
      <ul className="flex w-1/3 justify-around text-xl">
        <li className="list-none hover:bg-white hover:text-teal-800 p-3 cursor-pointer transition-colors">
          <Link to="/">Home</Link>
        </li>
        <li className="list-none hover:bg-white hover:text-teal-800 p-3 cursor-pointer transition-colors">
          Manage Booking
        </li>
        <li className="list-none hover:bg-white hover:text-teal-800 p-3 cursor-pointer transition-colors">
          About
        </li>
        <li
          className="list-none hover:bg-white hover:text-teal-800 p-3 cursor-pointer transition-colors"
          onClick={onClickHandler}
        >
          Signout
        </li>
      </ul>
    </div>
  );
};

export default Header;
