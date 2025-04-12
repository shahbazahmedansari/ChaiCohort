import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isLoggedIn = async (req, res, next) => {
    try {
        console.log(req.cookies);
        let token = req.cookies?.token;

        console.log('Token found: ', token ? "YES" : "NO");

        if (!token) {
            console.log("No token");
            return res.status(401).json({
                success: false,
                message: "Authentication failed",
            });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        console.log("decoded data: ", decoded);

        req.user = decoded;

        next();

    } catch (error) {
        console.log("Auth middleware failure");
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }

};