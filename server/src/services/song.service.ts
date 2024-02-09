
import { ISong } from 'types/song.type.js';
import * as SongRepository from '../repositories/song.repository.js';
export const getAll = async (query: any) => await SongRepository.getAll(query);
export const getStatistics = async () => await SongRepository.getSongStatistics();
export const getStatisticsByArtist = async () => await SongRepository.getSongStatisticsByArtist();
export const getStatisticsByAlbum = async () => await SongRepository.getSongStatisticsByAlbum();
export const getStatisticsByGenre = async () => await SongRepository.getSongStatisticsByGenre();
export const getArtists = async () => await SongRepository.getArtists();
export const getAlbums = async () => await SongRepository.getAlbums();
export const getGenres = async () => await SongRepository.getGenres();
export const getById = async( id: string) => await SongRepository.getById(id);
export const create =  async (song: ISong) => await SongRepository.create(song);
export const update = async (id: string, song: ISong) => await SongRepository.update(id, song);
export const destroy = async (id: string) => await SongRepository.destroy(id);