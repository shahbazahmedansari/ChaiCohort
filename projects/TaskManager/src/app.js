import express from "express";
// import routes
import healthCheckRouter from "./routes/healthcheck.routes.js";

const app = express();

app.use("/api/v1/healthcheck", healthCheckRouter);

export default app;