import jwt from "jsonwebtoken";
import asyncHanlder from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHanlder(async (req, res, next) => {
  const headers = req.headers.authorization;
  let token;

  if (headers && headers.startsWith("Bearer")) {
    try {
      //split will return array, where bearer is at index 0 and token at index 1
      token = headers.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized, token failed.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token found.");
  }
});

export { protect };
