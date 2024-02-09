
import { Song } from "../models/Song.model.js";
import { ISong } from "../types/song.type.js";

export const getSongs = async (query: any) => {
  let songs;
  if (query.album && query.genre && query.artist) {
    if (query.search) {
      songs = await Song.find({
        title: { $regex: query.search, $options: "i" },
        album: query.album,
        genre: query.genre,
        artist: query.artist,
      });
    } else {
      songs = await Song.find({
        album: query.album,
        genre: query.genre,
        artist: query.artist,
      });
    }
  } else if (query.album && query.genre) {
    if (query.search) {
      songs = await Song.find({
        title: { $regex: query.search, $options: "i" },
        album: query.album,
        genre: query.genre,
      });
    } else {
      songs = await Song.find({
        album: query.album,
        genre: query.genre,
      });
    }
  } else if (query.album && query.artist) {
    if (query.search) {
      songs = await Song.find({
        title: { $regex: query.search, $options: "i" },
        album: query.album,
        artist: query.artist,
      });
    } else {
      songs = await Song.find({
        album: query.album,
        artist: query.artist,
      });
    }
  } else if (query.genre && query.artist) {
    if (query.search) {
      songs = await Song.find({
        title: { $regex: query.search, $options: "i" },
        genre: query.genre,
        artist: query.artist,
      });
    } else {
      songs = await Song.find({
        genre: query.genre,
        artist: query.artist,
      });
    }
  } else if (query.album) {
    if (query.search) {
      songs = await Song.find({
        title: { $regex: query.search, $options: "i" },
        album: query.album,
      });
    } else {
      songs = await Song.find({
        album: query.album,
      });
    }
  } else if (query.genre) {
    if (query.search) {
      songs = await Song.find({
        title: { $regex: query.search, $options: "i" },
        genre: query.genre,
      });
    } else {
      songs = await Song.find({
        genre: query.genre,
      });
    }
  } else if (query.artist) {
    if (query.search) {
      songs = await Song.find({
        title: { $regex: query.search, $options: "i" },
        artist: query.artist,
      });
    } else {
      songs = await Song.find({
        artist: query.artist,
      });
    }
  } else {
    if (query.search) {
      songs = await Song.find({
        title: { $regex: query.search, $options: "i" },
      });
    } else {
      songs = await Song.find({});
    }
  }
  //   const songs = await Song.find(filter, select, options);

  return songs;
};

export const getSongStatistics = async () => {
    const totalSongs = await Song.countDocuments();
    const totalArtists = (await Song.distinct('artist')).length;
    const totalAlbums = (await Song.distinct('album')).length;
    const totalGenres = (await Song.distinct('genre')).length;

    return {totalSongs, totalArtists, totalAlbums, totalGenres};
} 
export const getSongStatisticsByArtist = async () => {
    const response = await Song.aggregate([
        { $group: { _id: '$artist', totalSongs: { $sum: 1 }, totalAlbums: { $addToSet: '$album' } } },
        { $project: { artist: '$_id', totalSongs: 1, totalAlbums: { $size: '$totalAlbums' }, _id: 0 } },
      ]);

    return response;
} 
export const getSongStatisticsByAlbum = async () => {
    const response = await Song.aggregate([
        { $group: { _id: '$album', totalSongs: { $sum: 1 }} },
        { $project: { album: '$_id',  totalSongs: 1, _id: 0 } },
      ]);

    return response;
} 
export const getSongStatisticsByGenre = async () => {
    const response = await Song.aggregate([
        { $group: { _id: '$genre', totalSongs: { $sum: 1 } } },
        { $project: { genre: '$_id', totalSongs: 1, _id: 0 } },
      ]);

    return response;
} 
export const getDistinctArtists = async () => {
    const response = await Song.aggregate([
        { $group: { _id: '$artist' } },
        { $project: { _id: 0, artist: '$_id' } },
      ]);

    return response.map(res => res.artist);
} 
export const getDistinctAlbums = async () => {
    const response = await Song.aggregate([
        { $group: { _id: '$album' } },
        { $project: { _id: 0, album: '$_id' } },
      ]);

    return response.map(res => res.album);
} 
export const getDistinctGenres = async () => {
    const response = await Song.aggregate([
        { $group: { _id: '$genre' } },
        { $project: { _id: 0, genres: '$_id' } },
      ]);

    return response.map(res => res.genres);
} 
export const getSongById = async (id: string) => await Song.findById(id);
export const createSong = async (song: ISong) => await Song.create(song);
export const updateSong = async (id: string, song: ISong) =>
  await Song.findByIdAndUpdate(id, song, { new: true });
export const deleteSong = async (id: string) =>
  await Song.findByIdAndDelete(id);
