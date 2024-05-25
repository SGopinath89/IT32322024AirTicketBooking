import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../components/Notification";
import { signInSuccess } from "../redux/user/userSlice.js";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [notification, setNotification] = useState({
    message: "",
    status: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setFormData((curData) => {
      return { ...curData, [e.target.id]: e.target.value };
    });
  };

  const onClickHandler = async () => {
    const body = JSON.stringify(formData);

    const res = await fetch("/api1/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!res.ok) {
      setNotification({ message: "User not found!", status: "failure" });
      throw new Error("User not found!");
    }

    const data = await res.json();
    if (data.success == false) {
      return;
    }

    dispatch(signInSuccess(data));
    navigate("/");
    return;
  };

  return (
    <div>
      <Notification notification={notification} />
      <div className="w-full sm:max-w-xl mx-auto bg-slate-200 my-14 p-8 flex flex-col items-center">
        <h1 className="text-slate-800 font-bold text-3xl my-3">Login</h1>
        <form className="flex flex-col w-4/5">
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="rounded-md h-12 px-4 py-8 my-2"
            onChange={(e) => onChangeHandler(e)}
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            className="rounded-md h-12 px-4 py-8 my-2"
            onChange={(e) => onChangeHandler(e)}
          />
          <div>
            <input
              type="button"
              value="Login"
              className="bg-teal-900 px-8 py-4 my-3 text-slate-100 cursor-pointer"
              onClick={onClickHandler}
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
