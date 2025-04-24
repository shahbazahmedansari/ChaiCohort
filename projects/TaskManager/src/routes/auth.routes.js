import { Router } from "express";
import { validate } from "../middlewares/validator.middleware.js";
import { userRegistrationValidator } from "../validators/index.js";
import { registerUser } from "../controllers/auth.controllers";

const router = Router();

// Factory Pattern: forcfully executing the userRegistrationValidator() which returns an array which is then passed to validate function to check for the errors
router.route("/register").post(userRegistrationValidator(), validate, registerUser);

export default router;