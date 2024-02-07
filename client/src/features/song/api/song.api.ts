import axios from 'axios';
import { Song } from '../../../models/song.model';

export const getAllSongs = () => axios.get(`${import.meta.env.VITE_BASE_API}/songs`);
export const addSong = (song: Song) => axios.post(`${import.meta.env.VITE_BASE_API}/songs/create`, song);
export const updateSong = (id: string, song: Song) => axios.put(`${import.meta.env.VITE_BASE_API}/songs/update/${id}`, song);
export const deleteSong = (id: string) => axios.delete(`${import.meta.env.VITE_BASE_API}/songs/delete/${id}`);
export const getStatistics = () => axios.get(`${import.meta.env.VITE_BASE_API}/songs/statistics`);
