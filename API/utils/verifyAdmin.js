import jwt from "jsonwebtoken";
import errorProvider from "./errorProvider.js";

const verifyAdmin = (req, res, next) => {
  const token = req.cookies["access-token"];

  //check is there any token exists
  if (!token) return next(errorProvider(401, "Unauthorized"));

  //verify the token and return raw data(_id)
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err || !user.admin) {
      return next(errorProvider(403, "Forbidden"));
    }

    req.user = user;
    next();
  });
};

export default verifyAdmin;
