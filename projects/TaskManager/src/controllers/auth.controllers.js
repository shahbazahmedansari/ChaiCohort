import { asyncHandler } from "../utils/async-handler.js";
import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";

const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password, role } = req.body;

    // validation
    try {
        const existingUser = await User.findOne({
            where: {
                email,
            }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            username,
            role,
        });

        if (!newUser) {
            return res.status(400).json({
                message: "User not created",
                success: false,
            });
        }

        return res.status(201).json({
            message: "User created successfully",
            success: true,
            user: {
                email,
                username,
                role,
            }
        });
    } catch (error) {
        console.log("Error in creating the user", error);
        return res.status(500).json({
            message: "Error in creating the user",
            success: false,
            error,
        });
    }

});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {

    } catch (error) {
        console.log("Error in logging in the user", error);
        return res.status(500).json({
            message: "Error in logging in the user",
            status: false,
            error,
        });
    }
});

export { registerUser, loginUser };