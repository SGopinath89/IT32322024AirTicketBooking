import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../components/Notification";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cpassword: "",
  });
  const [notification, setNotification] = useState({
    message: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setFormData((curObj) => {
      return { ...curObj, [e.target.id]: e.target.value };
    });
  };

  const onSubmitHandler = async () => {
    setLoading(true);
    if (formData.email && formData.password && formData.cpassword) {
      if (formData.password == formData.cpassword) {
        let body = JSON.stringify(formData);
        try {
          let res = await fetch("/api1/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body,
          });

          if (res.ok) {
            let data = await res.json();
            setNotification({ message: data, status: "success" });

            navigate("/Login");
          } else {
            setNotification({
              message: "User creation failure",
              status: "failure",
            });
          }
        } catch (error) {
          console.log(error);
        }

        setLoading(false);
      } else {
        setNotification({
          message: "password and confirm password should match",
          status: "failure",
        });
        setLoading(false);
      }
    } else {
      setNotification({
        message: "All the fields are required!",
        status: "failure",
      });
      setLoading(false);
    }
  };
  return (
    <div>
      <Notification notification={notification} />
      <div className="w-full sm:max-w-xl mx-auto bg-slate-200 my-14 p-8 flex flex-col items-center">
        <h1 className="text-slate-800 font-bold text-3xl my-3">Signup</h1>
        <form className="flex flex-col w-4/5">
          <input
            type="email"
            id="email"
            placeholder="Email address"
            onChange={(e) => onChangeHandler(e)}
            className="rounded-md h-12 px-4 py-8 my-2"
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => onChangeHandler(e)}
            className="rounded-md h-12 px-4 py-8 my-2"
          />
          <input
            type="password"
            id="cpassword"
            placeholder="Confirm password"
            onChange={(e) => onChangeHandler(e)}
            className="rounded-md h-12 px-4 py-8 my-2"
          />
          <div>
            <input
              type="button"
              value="Signup"
              onClick={onSubmitHandler}
              className={`${
                loading ? "bg-teal-600" : "bg-teal-900"
              } px-8 py-4 my-3 text-slate-100 cursor-pointer `}
              disabled={loading}
            />
          </div>
          <Link to="/Login" className="text-blue-900">
            Already Have an Account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
