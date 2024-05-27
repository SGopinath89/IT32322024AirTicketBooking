import { signOut } from "../redux/user/userSlice.js";

const unauthorizedHandler = (res, dispatch, navigate) => {
  if (res.status == 401 || res.status == 403) {
    dispatch(signOut());
    navigate("/Login");
  }
};

export default unauthorizedHandler;
