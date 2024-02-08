import axios from 'axios';
import { Song } from '../../../models/song.model';

export const getAllSongs = (queryParam?: string) => axios.get(`${import.meta.env.VITE_BASE_API}/songs${queryParam ? '?' + queryParam : ''}`).then(response => response.data.data);
export const getStatistics = () => axios.get(`${import.meta.env.VITE_BASE_API}/songs/statistics`).then(response => response.data.data);
export const getStatisticsByArtist = () => axios.get(`${import.meta.env.VITE_BASE_API}/songs/statistics-by-artist`).then(response => response.data.data);
export const getStatisticsByAlbum = () => axios.get(`${import.meta.env.VITE_BASE_API}/songs/statistics-by-album`).then(response => response.data.data);
export const getStatisticsByGenre = () => axios.get(`${import.meta.env.VITE_BASE_API}/songs/statistics-by-genre`).then(response => response.data.data);
export const addSong = (song: Song) => axios.post(`${import.meta.env.VITE_BASE_API}/songs/create`, song);
export const updateSong = (id: string, song: Song) => axios.put(`${import.meta.env.VITE_BASE_API}/songs/update/${id}`, song);
export const deleteSong = (id: string) => axios.delete(`${import.meta.env.VITE_BASE_API}/songs/delete/${id}`);
// export const getStatistics = () => axios.get(`${import.meta.env.VITE_BASE_API}/songs/statistics`);
