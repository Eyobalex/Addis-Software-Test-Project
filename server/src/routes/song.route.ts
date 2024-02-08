import { Song } from "../models/Song.model.js";
import { getAllSongs, getSongById, createSong, updateSong, deleteSong, getSongStatistics, getSongStatisticsByArtist, getSongStatisticsByAlbum, getSongStatisticsByGenre, getDistinctArtists, getDistinctAlbums, getDistinctGenres } from "../controllers/song.controller.js";
import express from "express";

export default (router: express.Router) => {
  router.get("/songs", getAllSongs);
  router.get("/songs/statistics", getSongStatistics);

  router.get("/songs/statistics-by-artist", getSongStatisticsByArtist);
  router.get("/songs/statistics-by-album", getSongStatisticsByAlbum);
  router.get("/songs/statistics-by-genre", getSongStatisticsByGenre);

  router.get("/songs/artists", getDistinctArtists);
  router.get("/songs/albums", getDistinctAlbums);
  router.get("/songs/genres", getDistinctGenres);

  router.get("/songs/:songId", getSongById);
  router.post("/songs/create", createSong);
  router.put("/songs/update/:songId", updateSong);
  router.delete("/songs/delete/:songId", deleteSong);

  router.get('/test', async(req, res)=> {

    let a = await Song.aggregate([
      { $group: { _id: '$album' } },
      { $project: { _id: 0, album: '$_id' } },
    ]).exec()
    res.json(
     a.map(b => b.album)
      );
  })

};
