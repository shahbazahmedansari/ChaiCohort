import User from "../models/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please provide proper inputs",
        });
    }

    try {
        const existingUser = await User.findOne({
            email,
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        console.log(user);

        if (!user) {
            return res.status(400).json({
                message: "User not registered",
            });
        }

        const token = crypto.randomBytes(32).toString("hex");
        console.log(token);
        user.verificationToken = token;

        await user.save();

        // send email
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.MAILTRAP_SENDEREMAIL, // sender address
            to: user.email, // list of receivers
            subject: "Verify your email", // Subject line
            text: `Please click on the following link:
            ${process.env.BASE_URL}/api/v1/users/verify/${token}`, // plain text body
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({
            message: "User registered successfully",
            success: true,
        });
    } catch (error) {
        return res.status(400).json({
            message: "User not registered",
            error,
            success: false,
        });
    }
};

const verifyUser = async (req, res) => {
    const { token } = req.params;
    console.log(token);

    if (!token) {
        return res.status(400).json({
            message: "Invalid token",
        });
    }

    const user = await User.findOne({
        verificationToken: token,
    });

    if (!user) {
        return res.status(400).json({
            message: "Invalid token",
        });
    }

    user.isVerified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({
        message: "User verified successfully",
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Invalid email or password",
        });
    }

    try {
        const user = await User.findOne({
            email,
        });

        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        console.log(isMatch);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h",
            }
        );

        console.log(token);

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        };

        res.cookie("token", token, cookieOptions);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        return res.status(400).json({
            message: "User not logged in",
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        console.log(user);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return res.status(400).json({
            message: "User not found",
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        res.cookie("token", "", {});
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        return res.status(400).json({
            message: "User not logged out",
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        // get email
        const { email } = req.body;

        // find user based on email

        const user = await User.findOne({ email });

        console.log(user);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            });
        }

        // create a token

        const token = crypto.randomBytes(32).toString("hex");
        console.log(token);

        const expiryDate = Date.now() + (10 * 60 * 1000);
        console.log(expiryDate);

        user.resetPasswordToken = token;
        user.resetPasswordExpires = expiryDate;

        await user.save();

        // send email
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.MAILTRAP_SENDEREMAIL, // sender address
            to: user.email, // list of receivers
            subject: "Verify your email", // Subject line
            text: `Please click on the following link:
            ${process.env.BASE_URL}/api/v1/users/verify/${token}`, // plain text body
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            message: "Forgot password email sent",
            success: true,
        });
    } catch (error) {

    }
};

const resetPassword = async (req, res) => {
    try {
        // collect token from params
        const { token } = req.params;

        // get password from user
        const { password } = req.body;

        try {
            const user = await User.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() }
            });

            // set password in user
            user.password = password;

            // resetToken, resetExpiry => reset
            resetPasswordToken = "";
            resetPasswordExpires = undefined;

            await user.save();

        } catch (error) {

        }
    } catch (error) {
        return res.status(400).json({
            message: "Password not reset",
        });
    }
};

export { registerUser, verifyUser, login, getProfile, logoutUser, forgotPassword, resetPassword };
