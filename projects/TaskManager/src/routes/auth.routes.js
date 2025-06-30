import { Router } from "express";
import { validate } from "../middlewares/validator.middleware.js";
import { userRegistrationValidator, userLoginValidator } from "../validators/index.js";
import { registerUser, loginUser } from "../controllers/auth.controllers";

const router = Router();

// Factory Pattern: forcfully executing the userRegistrationValidator() which returns an array which is then passed to validate function to check for the errors
router.route("/register").post(userRegistrationValidator(), validate, registerUser);

router.route("/login").post(userLoginValidator(), validate, loginUser);

export default router;