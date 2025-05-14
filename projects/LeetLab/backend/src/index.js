import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to LeetLab🔥");
});

app.listen(PORT, () => {
  console.log(`Server started running on port ${PORT}`);
});
