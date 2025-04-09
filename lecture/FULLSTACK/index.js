import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./utils/db.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 4000;

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Cohort!");
});

app.get("/hitesh", (req, res) => {
    res.send("Hitesh!");
});

app.get("/piyush", (req, res) => {
    res.send("Piyush");
});

// Connect to DB
db();

// User Routes
app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
    console.log(`App started running on port ${port}`);
});
