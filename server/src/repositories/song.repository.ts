import { Song } from "models/Song.model.js";

interface SongRequest {
    title: string;
    artist: string;
    album: string;
    gener: string;
}
export const getSongs = async() => await Song.find([]);

export const getSongById = async(id: string) => await Song.findById(id);

export const createSong =  async(song: SongRequest) => await Song.create(song);
export const updateSong = async(id: string, song: SongRequest) => await Song.findByIdAndUpdate(id, song);

export const deleteSong = async(id: string) => await Song.findByIdAndDelete(id);