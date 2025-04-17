import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isLoggedIn = async (req, res, next) => {
    try {
        console.log(req.cookies);
        let token = req.cookies?.token;

        console.log("Token found: ", token ? "YES" : "NO");

        if (!token) {
            console.log("NO token");
            return res.status(400).json({
                message: "Token not found in authentication",
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

        req.user = decoded;

        next();
    } catch (error) {
        console.log("Authentication failed");
        return res.status(400).json({
            message: "User not authenticated",
            success: false,
        });
    }
};