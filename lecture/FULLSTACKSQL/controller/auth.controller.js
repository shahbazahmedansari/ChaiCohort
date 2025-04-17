import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {

    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        console.log("Data is missing");
        return res.status(400).json({
            message: "All fields are required",
            success: false,
        });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone
            }
        });

        if (!user) {
            return res.status(400).json({
                message: "User not registered",
                success: false,
            });
        }

        res.status(200).json({
            message: "User registered successfully",
            success: true,
        });
    } catch (error) {
        return res.status(400).json({
            message: "User not registered",
            success: false,
            error,
        });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Invalid email or password",
            success: false,
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false,
            });
        }

        const token = jwt.sign({
            id: user.id,
            role: user.role,
        }, process.env.JWT_SECRET, {
            expiresIn: "24h"
        });

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        };

        res.cookie("token", token, cookieOptions);

        res.status(200).json({
            message: "User logged in successfully",
            success: true,
            token,
            user: {
                id: user.id,
                role: user.role,
                email: user.email,
            }
        });
    } catch (error) {
        return res.status(400).json({
            message: "User not logged in",
            success: false,
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const { email } = req.user.email;
        const user = await prisma.user.findUnique({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            });
        }

        res.status(200).json({
            message: "User found successfully",
            success: true,

        });
    } catch (error) {
        return res.status(400).json({
            message: "User not found",
            success: false,
        });
    }
};