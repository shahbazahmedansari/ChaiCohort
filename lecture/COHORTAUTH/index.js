import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./utils/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to database
db();

app.listen(PORT, () => {
    console.log(`Server app is running on port ${PORT}`);
});

