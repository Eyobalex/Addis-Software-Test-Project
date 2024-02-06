import { Song } from "../models/Song.model.js";
import { ISong } from "../types/song.type.js";


export const getSongs = async() => await Song.find({});
export const getSongById = async(id: string) => await Song.findById(id);
export const createSong =  async(song: ISong) => await Song.create(song);
export const updateSong = async(id: string, song: ISong) => await Song.findByIdAndUpdate(id, song,{new: true});
export const deleteSong = async(id: string) => await Song.findByIdAndDelete(id);