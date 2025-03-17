import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

// export a function that connects to db

const db = () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Connected to mongodb");
        })
        .catch((err) => {
            console.log("Error connecting to mongodb", err);
        });
};

export default db;
