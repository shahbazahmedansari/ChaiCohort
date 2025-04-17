import express from "express";
import { getProfile, loginUser, registerUser } from "../controller/auth.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", isLoggedIn, getProfile);

export default router;