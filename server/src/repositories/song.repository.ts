
import { Song } from "../models/Song.model.js";
import { ISong } from "../types/song.type.js";
import { getCollectionQuery } from "../helpers/collection-query-builder.js";
export const getAll = async (query: any) => {

  let collectionQuery =  getCollectionQuery(query);
  const songs = await Song.find(collectionQuery);
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
export const getArtists = async () => {
    const response = await Song.aggregate([
        { $group: { _id: '$artist' } },
        { $project: { _id: 0, artist: '$_id' } },
      ]);

    return response.map(res => res.artist);
} 
export const getAlbums = async () => {
    const response = await Song.aggregate([
        { $group: { _id: '$album' } },
        { $project: { _id: 0, album: '$_id' } },
      ]);

    return response.map(res => res.album);
} 
export const getGenres = async () => {
    const response = await Song.aggregate([
        { $group: { _id: '$genre' } },
        { $project: { _id: 0, genres: '$_id' } },
      ]);

    return response.map(res => res.genres);
} 
export const getById = async (id: string) => await Song.findById(id);
export const create = async (song: ISong) => await Song.create(song);
export const update = async (id: string, song: ISong) =>
  await Song.findByIdAndUpdate(id, song, { new: true });
export const destroy = async (id: string) =>
  await Song.findByIdAndDelete(id);
