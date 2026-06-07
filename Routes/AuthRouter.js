import { Router } from "express";
import { signIn, signUp, verifyToken } from "../Controller/AuthController.js";

const AuthRouter = Router();

AuthRouter.post("/signup", signUp);
AuthRouter.post("/signin", signIn);
AuthRouter.post("/verifytoken", verifyToken);

export default AuthRouter;
