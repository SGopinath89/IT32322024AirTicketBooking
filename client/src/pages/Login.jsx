import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Notification from "../components/Notification";
const Login = () => {
  const [notification, setNotification] = useState({
    message: "",
    status: "",
  });
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div>
      <Notification notification={notification} />
      <div className="w-full sm:max-w-xl mx-auto bg-slate-200 my-14 p-8 flex flex-col items-center">
        <h1 className="text-slate-800 font-bold text-3xl my-3">Login</h1>
        <form className="flex flex-col w-4/5">
          <input
            type="email"
            placeholder="Email"
            className="rounded-md h-12 px-4 py-8 my-2"
          />

          <input
            type="password"
            placeholder="Password"
            className="rounded-md h-12 px-4 py-8 my-2"
          />
          <div>
            <input
              type="button"
              value="Login"
              className="bg-teal-900 px-8 py-4 my-3 text-slate-100 cursor-pointer"
            />
          </div>
          <Link to="/Signup" className="text-blue-900">
            Don't Have an Account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
