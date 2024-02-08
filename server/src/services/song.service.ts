
import { ISong } from 'types/song.type.js';
import {createSong, deleteSong, getSongById, getSongs, updateSong} from '../repositories/song.repository.js' 
export const getAll = async (query: any) => await getSongs(query);
export const getById = async( id: string) => await getSongById(id);
export const create =  async (song: ISong) => await createSong(song);
export const update = async (id: string, song: ISong) => await updateSong(id, song);
export const destroy = async (id: string) => await deleteSong(id);