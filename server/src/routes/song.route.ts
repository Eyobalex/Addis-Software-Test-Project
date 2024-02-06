import { getAllSongs, getSongById, createSong, updateSong, deleteSong } from "../controllers/song.controller.js";
import express from "express";

export default (router: express.Router) => {
  router.get("/songs", getAllSongs);
  router.get("/songs/:songId", getSongById);
  router.post("/songs/create", createSong);
  router.put("/songs/update/:songId", updateSong);
  router.delete("/songs/delete/:songId", deleteSong);
};
