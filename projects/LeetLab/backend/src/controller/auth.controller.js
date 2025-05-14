import { UserRole } from "../generated/prisma/index.js";
import { db } from "../libs/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(401).json({
        error: "User already exists",
        success: false,
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        name,
        password: hashedpassword,
        role: UserRole.USER,
      },
    });

    const token = jwt.sign(
      {
        id: newUser.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSide: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    });

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        image: newUser.image,
      }
    });
  } catch (error) {
    console.error("Error creating user", error);
    return res.status(500).json({
      error: "Error creating user",
      success: false,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      }
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid credentials",
        success: false,
      });
    }

    const token = jwt.sign({
      id: user.id,
    }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSide: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    });

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.email,
        role: user.role,
        image: user.image,
      }
    });
  } catch (error) {
    console.error("Error logging in user", error);
    return res.status(500).json({
      error: "Error logging in user",
      success: false,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSide: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    return res.status(200).json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in logging out user", error);
    return res.status(500).json({
      error: "Error in logging out user",
      success: false,
    });
  }
};

export const check = async (req, res) => {
  try {
    return res.status(200).json({
      message: "User found successfully",
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error("Error in checking the user", error);
    return res.status(404).json({
      error: "Error in checking the user",
      success: false,
    });
  }
};
