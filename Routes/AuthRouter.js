import { Router } from "express";
import { signIn, signUp, verifyToken } from "../Controller/AuthController.js";
import isLoggedin from "../Middleware/isLoggedin.js";

const AuthRouter = Router();

AuthRouter.post("/signup", signUp);
AuthRouter.post("/signin", signIn);
AuthRouter.get("/verifytoken", verifyToken, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "You are authenticated",
    data: req.user,
  });
});

export default AuthRouter;
