import axios from 'axios';
import { Song } from '../../../models/song.model';
import { SONG_ENDPOINTS } from '../song.endpoints';

export const getAllSongs = (queryParam?: string) => axios.get(`${SONG_ENDPOINTS.list}${queryParam ? '?' + queryParam : ''}`).then(response => response.data.data);
export const getStatistics = () => axios.get(SONG_ENDPOINTS.statistics).then(response => response.data.data);
export const getStatisticsByArtist = () => axios.get(SONG_ENDPOINTS.statisticsByArtist).then(response => response.data.data);
export const getStatisticsByAlbum = () => axios.get(SONG_ENDPOINTS.statisticsByAlbum).then(response => response.data.data);
export const getStatisticsByGenre = () => axios.get(SONG_ENDPOINTS.statisticsByGenre).then(response => response.data.data);
export const getAlbums = () => axios.get(SONG_ENDPOINTS.albums).then(response => response.data.data);
export const getArtists = () => axios.get(SONG_ENDPOINTS.artists).then(response => response.data.data);
export const getGenres = () => axios.get(SONG_ENDPOINTS.genres).then(response => response.data.data);
export const addSong = (song: Song) => axios.post(SONG_ENDPOINTS.addSong, song);
export const updateSong = (id: string, song: Song) => axios.put(`${SONG_ENDPOINTS.updateSong}/${id}`, song);
export const deleteSong = (id: string) => axios.delete(`${SONG_ENDPOINTS.deleteSong}/${id}`);
// export const getStatistics = () => axios.get(`${import.meta.env.VITE_BASE_API}/songs/statistics`);
