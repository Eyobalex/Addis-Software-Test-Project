import { Song } from "models/Song.model.js";

interface SongRequest {
    title: string;
    artist: string;
    album: string;
    gener: string;
}
export const getSongs = () => Song.find([]);

export const getSongById = (id: string) => Song.findById(id);

export const createSong =  (song: SongRequest) => Song.create(song);
export const updateSong = (id: string, song: SongRequest) => Song.findByIdAndUpdate(id, song);

export const deleteSong = (id: string) => Song.findByIdAndDelete(id);