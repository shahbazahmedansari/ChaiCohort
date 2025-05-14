import express from "express";
import { check, loginUser, logoutUser, registerUser } from "../controller/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const authRouter = express.Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

authRouter.post("/logout", authMiddleware, logoutUser);

authRouter.get("/check", authMiddleware, check);

export default authRouter;