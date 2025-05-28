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
      console.log(decoded);
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
        // image: true,
      }
    });
    console.log(user);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
        success: false,
      });
    }

    req.user = user;
    console.log(req.user);
    next();

  } catch (error) {
    console.error("Error authenticating user", error);
    return res.status(500).json({
      error: "Error authenticating user",
      success: false,
    });
  }
};

export const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      }
    });

    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({
        error: "Access denied: Admins only",
        success: false,
      });
    }

    next();
  } catch (error) {
    console.error("Error checking admin role: ", error);
    return res.status(500).json({
      error: "Error checking admin role",
      success: false,
    });
  }
};