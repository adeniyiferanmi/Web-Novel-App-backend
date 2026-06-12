import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import authModel from "../Model/AuthModel.js";

const isLoggedin = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized, no token provided",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(token);

    const user = await authModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized, user not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized, invalid token",
    });
    next(error);
  }
};

export default isLoggedin;
