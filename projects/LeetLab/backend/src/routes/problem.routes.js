import express from "express";
import { authMiddleware, checkAdmin } from "../middleware/auth.middleware.js";
import { createProblem, deleteProblem, getAllProblems, getAllProblemsSolvedByUser, getProblemById, updateProblem } from "../controller/problem.controller.js";

const problemRouter = express.Router();

problemRouter.post("/create-problem", authMiddleware, checkAdmin, createProblem);

problemRouter.get("/get-all-problems", authMiddleware, getAllProblems);

problemRouter.get("/get-problem/:id", authMiddleware, getProblemById);

problemRouter.post("/update-problem/:id", authMiddleware, checkAdmin, updateProblem);

problemRouter.post("/delete-problem/:id", authMiddleware, checkAdmin, deleteProblem);

problemRouter.get("/get-solved-problems", authMiddleware, getAllProblemsSolvedByUser);

export default problemRouter;