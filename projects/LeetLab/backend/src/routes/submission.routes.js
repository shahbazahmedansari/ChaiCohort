import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getAllSubmission, getAllTheSubmissionsForProblem, getSubmissionsForProblem } from "../controller/submission.controller.js";

const submissionRouter = express.Router();

submissionRouter.get("/get-all-submissions", authMiddleware, getAllSubmission);

submissionRouter.get("get-submission/:problemId", authMiddleware, getSubmissionsForProblem);

submissionRouter.get("/get-submissions-count/:problemId", authMiddleware, getAllTheSubmissionsForProblem);

export default submissionRouter;