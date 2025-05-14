import mongoose from "mongoose";

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MONGODB Database");
    } catch (error) {
        console.log("Not connected to MONGODB Database");
        process.exit(1);
    }
};

export default db;