import jwt from "jsonwebtoken";
import { ErrorHandler } from "./extendError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(new ErrorHandler("Unauthorized",401));
  // then verify token with
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(new ErrorHandler("Forbidden", 403));

    // send user to the next function
    req.user = user;
    // after verify the token execute the next function
    next();
  });
};

