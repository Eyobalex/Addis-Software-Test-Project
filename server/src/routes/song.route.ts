import { Song } from "../models/Song.model.js";
import express from "express";
import * as SongController from '../controllers/song.controller.js' 
export default (router: express.Router) => {
  router.get("/songs", SongController.getAllSongs);
  router.get("/songs/statistics", SongController.getSongStatistics);

  router.get("/songs/statistics-by-artist", SongController.getSongStatisticsByArtist);
  router.get("/songs/statistics-by-album", SongController.getSongStatisticsByAlbum);
  router.get("/songs/statistics-by-genre", SongController.getSongStatisticsByGenre);

  router.get("/songs/artists", SongController.getDistinctArtists);
  router.get("/songs/albums", SongController.getDistinctAlbums);
  router.get("/songs/genres", SongController.getDistinctGenres);

  router.get("/songs/:songId", SongController.getSongById);
  router.post("/songs/create", SongController.createSong);
  router.put("/songs/update/:songId", SongController.updateSong);
  router.delete("/songs/delete/:songId", SongController.deleteSong);

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
