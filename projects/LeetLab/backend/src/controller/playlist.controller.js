import { db } from "../libs/db.js";

export const createPlayList = async (req, res) => {
  try {
    const { name, description } = req.body;

    const userId = req.user.id;

    const playlist = await db.playlist.create({
      data: {
        name,
        description,
        userId,
      }
    });

    res.status(200).json({
      success: true,
      message: "Playlist created successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error creating playlist: ", error);
    res.status(500).json({
      success: false,
      error: "Failed to create playlist",
    });
  }
};

export const addProblemToPlayList = async (req, res) => {
  try {
    const { playlistId } = req.params;

    const { problemIds } = req.body;

    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({
        error: "Invalid or missing problemsId",
      });
    }

    // Create records for each problem in the playlist

    const problemsInPlaylist = await db.problemInPlaylist.createMany({
      data: problemIds.map((problemId) => ({
        playlistId,
        problemId,
      }))
    });

    res.status(201).json({
      success: true,
      message: "Problem in playlist created successfully",
      problemsInPlaylist,
    });
  } catch (error) {
    console.error("Error in creating the problems in playlist: ", error);
    res.status(500).json({
      success: false,
      error: "Failed to create the problems in playlist",
    });
  }
};

export const getAllListDetails = async (req, res) => {
  try {
    const playlists = await db.playlist.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      message: "Fetched playlists successfully",
      playlists,
    });

  } catch (error) {
    console.error("Error in fetching playlists: ", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch playlists",
    });
  }
};

export const getPlayListDetails = async (req, res) => {
  try {
    const { playlistId } = req.params;

    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          }
        }
      }
    });

    if (!playlist) {
      return res.status(404).json({
        error: "Playlist not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Playlist fetched successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error in fetching playlist details: ", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch playlist details",
    });
  }
};

export const deletePlayList = async (req, res) => {
  try {
    const { playlistId } = req.params;

    const deletedPlaylists = await db.playlist.delete({
      where: {
        id: playlistId,
      }
    });

    res.status(200).json({
      success: true,
      message: "Playlist deleted successfully",
      deletedPlaylists,
    });
  } catch (error) {
    console.error("Failed to delete playlists: ", error);
    res.status(500).json({
      success: false,
      error: "Error in deleting playlists",
    });
  }
};

export const removeProblemFromPlayList = async (req, res) => {
  try {
    const { playlistId } = req.params;

    const { problemIds } = req.body;

    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid or missing problemIds",
      });
    }

    const deletedProblem = await db.problemInPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
        }
      }
    });

    res.status(200).json({
      success: true,
      message: "Problem in playlist deleted successfully",
      deletedProblem,
    });
  } catch (error) {
    console.error("Error in removing the problem from playlist: ", error);
    res.status(500).json({
      success: false,
      error: "Failed to remove problem from the playlist",
    });
  }
};

