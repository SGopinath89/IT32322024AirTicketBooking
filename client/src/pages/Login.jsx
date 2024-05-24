import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div>
      <form>
        <div>
          <label></label>
          <input type="text" />
        </div>
        <div>
          <label></label>
          <input type="text" />
        </div>
        <div>
          <input type="button" value="Login" />
        </div>
      </form>
    </div>
  );
};

export default Login;
