export const SONG_ENDPOINTS ={
    list: `${import.meta.env.VITE_BASE_API}/songs`,
    statistics: `${import.meta.env.VITE_BASE_API}/songs/statistics`,
    statisticsByArtist: `${import.meta.env.VITE_BASE_API}/songs/statistics-by-artist`,
    statisticsByAlbum: `${import.meta.env.VITE_BASE_API}/songs/statistics-by-album`,
    statisticsByGenre: `${import.meta.env.VITE_BASE_API}/songs/statistics-by-genre`,
    albums: `${import.meta.env.VITE_BASE_API}/songs/albums`,
    artists: `${import.meta.env.VITE_BASE_API}/songs/artists`,
    genres: `${import.meta.env.VITE_BASE_API}/songs/genres`,
    addSong: `${import.meta.env.VITE_BASE_API}/songs/create`,
    updateSong: `${import.meta.env.VITE_BASE_API}/songs/update`,
    deleteSong: `${import.meta.env.VITE_BASE_API}/songs/delete`,
}