
import { ISong } from 'types/song.type.js';
import {createSong, deleteSong, getSongById, getSongStatistics, getSongStatisticsByAlbum, getSongStatisticsByArtist, getSongStatisticsByGenre, getSongs, updateSong} from '../repositories/song.repository.js' 
import { IStatisticsResponse } from 'types/statistics-response.type.js';
export const getAll = async (query: any) => await getSongs(query);
export const getStatistics = async () => await getSongStatistics();
export const getStatisticsByArtist = async () => await getSongStatisticsByArtist();
export const getStatisticsByAlbum = async () => await getSongStatisticsByAlbum();
export const getStatisticsByGenre = async () => await getSongStatisticsByGenre();
export const getById = async( id: string) => await getSongById(id);
export const create =  async (song: ISong) => await createSong(song);
export const update = async (id: string, song: ISong) => await updateSong(id, song);
export const destroy = async (id: string) => await deleteSong(id);