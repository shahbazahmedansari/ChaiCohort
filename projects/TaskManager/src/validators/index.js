import { body } from "express-validator";

const userRegistrationValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Email is invalid"),
        body("username")
            .trim()
            .notEmpty().withMessage("Username is required")
            .isLength({ min: 3 }).withMessage("Username should be atleast 3 char")
            .isLength({ max: 13 }).withMessage("Username should be max 13 char"),
        body("fullname")
            .trim()
            .notEmpty().withMessage("Fullname cannot be empty")
            .isLength({ min: 3 }).withMessage("Fullname should be atleast 3 char")
            .isLength({ max: 20 }).withMessage("Fullname should be atleast 20 char"),
        body("password")
            .trim()
            .notEmpty().withMessage("Password cannot be empty")
    ];
};

const userLoginValidator = () => {
    return [
        body("email").trim().isEmail().withMessage("Email is invalid"),
        body("password").trim().notEmpty().withMessage("Password cannot be empty")
    ];
};

export { userRegistrationValidator, userLoginValidator };