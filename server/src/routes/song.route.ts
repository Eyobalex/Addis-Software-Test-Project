import { getAllSongs, getSongById, createSong, updateSong, deleteSong, getSongStatistics } from "../controllers/song.controller.js";
import express from "express";

export default (router: express.Router) => {
  router.get("/songs", getAllSongs);
  router.get("/songs/statistics", getSongStatistics);
  router.get("/songs/:songId", getSongById);
  router.post("/songs/create", createSong);
  router.put("/songs/update/:songId", updateSong);
  router.delete("/songs/delete/:songId", deleteSong);

};
