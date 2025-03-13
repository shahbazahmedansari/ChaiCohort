import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Cohort!");
});

app.get("/hitesh", (req, res) => {
    res.send("Hitesh!");
});

app.get("/piyush", (req, res) => {
    res.send("Piyush!");
});

app.listen(port, () => {
    console.log("Express server started running on port", port);
});