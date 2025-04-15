import express from "express";
import { registerUser } from "../controller/auth.controller";

const router = express.Router();

router.post("/register", registerUser);

export default router;