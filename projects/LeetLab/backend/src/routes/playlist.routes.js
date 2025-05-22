import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { addProblemToPlayList, createPlayList, deletePlayList, getAllListDetails, getPlayListDetails, removeProblemFromPlayList } from "../controller/playlist.controller.js";

const playlistRouter = express.Router();

playlistRouter.get("/", authMiddleware, getAllListDetails);

playlistRouter.get("/:playlistId", authMiddleware, getPlayListDetails);

playlistRouter.post("/create-playlist", authMiddleware, createPlayList);

playlistRouter.post("/:playlistId/add-problem", authMiddleware, addProblemToPlayList);

playlistRouter.delete("/:playlistId", authMiddleware, deletePlayList);

playlistRouter.delete("/:playlistId/remove-problem", authMiddleware, removeProblemFromPlayList);

export default playlistRouter;