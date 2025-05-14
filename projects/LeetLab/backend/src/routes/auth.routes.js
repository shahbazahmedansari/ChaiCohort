import express from "express";
import { check, loginUser, logoutUser, registerUser } from "../controller/auth.controller";

const authRouter = express.Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

authRouter.post("/logout", logoutUser);

authRouter.get("/check", check);

export default authRouter;