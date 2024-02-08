
import { Song } from "../models/Song.model.js";
import { ISong } from "../types/song.type.js";

export const getSongs = async (query: any) => {
  let songs;
  if (query.album && query.gener && query.artist) {
    if (query.search) {
      songs = await Song.find({
        title: { $regex: query.search, $options: "i" },
        album: query.album,
        gener: query.gener,
        artist: query.artist,
      });
    } else {
      songs = await Song.find({
        album: query.album,
        gener: query.gener,
        artist: query.artist,
      });
    }
  } else if (query.album && query.gener) {
    if (query.search) {
      songs = await Song.find({
        title: { $regex: query.search, $options: "i" },
        album: query.album,
        gener: query.gener,
      });
    } else {
      songs = await Song.find({
        album: query.album,
        gener: query.gener,
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
  } else if (query.gener && query.artist) {
    if (query.search) {
      songs = await Song.find({
        title: { $regex: query.search, $options: "i" },
        gener: query.gener,
        artist: query.artist,
      });
    } else {
      songs = await Song.find({
        gener: query.gener,
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
  } else if (query.gener) {
    if (query.search) {
      songs = await Song.find({
        title: { $regex: query.search, $options: "i" },
        gener: query.gener,
      });
    } else {
      songs = await Song.find({
        gener: query.gener,
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
export const getSongById = async (id: string) => await Song.findById(id);
export const createSong = async (song: ISong) => await Song.create(song);
export const updateSong = async (id: string, song: ISong) =>
  await Song.findByIdAndUpdate(id, song, { new: true });
export const deleteSong = async (id: string) =>
  await Song.findByIdAndDelete(id);
