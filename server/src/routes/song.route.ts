import { Song } from "../models/Song.model.js";
import { getAllSongs, getSongById, createSong, updateSong, deleteSong, getSongStatistics, getSongStatisticsByArtist, getSongStatisticsByAlbum, getSongStatisticsByGenre } from "../controllers/song.controller.js";
import express from "express";

export default (router: express.Router) => {
  router.get("/songs", getAllSongs);
  router.get("/songs/statistics", getSongStatistics);
  router.get("/songs/statistics-by-artist", getSongStatisticsByArtist);
  router.get("/songs/statistics-by-album", getSongStatisticsByAlbum);
  router.get("/songs/statistics-by-genre", getSongStatisticsByGenre);
  router.get("/songs/:songId", getSongById);
  router.post("/songs/create", createSong);
  router.put("/songs/update/:songId", updateSong);
  router.delete("/songs/delete/:songId", deleteSong);

  router.get('/test', async(req, res)=> {
    res.json(Song.find().distinct('artist').select('artist -_id').exec());
  })

};
