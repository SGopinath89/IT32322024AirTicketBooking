import React, { useEffect, useState } from "react";

const Notification = ({ notification }) => {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(notification.message);
    setStatus(notification.status);

    const timer = setTimeout(() => {
      setMessage("");
      setStatus("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification]);
  return (
    <div
      className={`w-3/5 ${
        status == "success" ? "bg-green-500" : "bg-red-500"
      }  text-white ${
        message ? "p-3" : ""
      }  absolute left-1/2 -translate-x-1/2 top-0 text-center text-wrap rounded-lg text-xl`}
    >
      {message}
    </div>
  );
};

export default Notification;
