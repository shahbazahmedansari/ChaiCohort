import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
// import user routes
import userRouter from "./routes/auth.routes.js";

dotenv.config();

const port = process.env.PORT || 4000;

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// User routes
app.use("/api/v1/users", userRouter);

app.listen(port, () => {
    console.log(`Backend started running on port ${port}`);
});