import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized - No token provided",
        success: false,
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({
        error: "Unauthorized - No token provided",
        success: false,
      });
    }

    const user = await db.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        image: true,
      }
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
        success: false,
      });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("Error authenticating user", error);
    return res.status(500).json({
      error: "Error authenticating user",
      success: false,
    });
  }
};