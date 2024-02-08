import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '../../../models/song.model';
import { Statistics } from '../../../models/statistics.model';
import { GenreStat } from '../../../models/genre-stat.model';
import { AlbumStat } from '../../../models/album-stat.model';
import { ArtistStat } from '../../../models/artist-stat.model';


interface SongsState {
    data: Song[];
    isLoading: boolean;
    statistics: Statistics;
    genreStat: GenreStat[];
    albumStat: AlbumStat[];
    artistStat: ArtistStat[];
    artists: string[];
    albums: string[];
    genres: string[];
}

const initialState: SongsState = {
    data: [],
    isLoading: false,
    statistics: {
        totalAlbums: 0,
        totalArtists: 0,
        totalGenres: 0,
        totalSongs: 0
    },
    genreStat: [{
        totalSongs: 0,
        genre: 'string'
    }],
    albumStat: [{
        totalSongs: 0,
        album: ""
    }],
    artistStat: [{
        artist: "",
        totalSongs: 0,
        totalAlbums: 0,
    }],
    artists: [],
    albums: [],
    genres: [],
};

const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        setSongs: (state, action: PayloadAction<Song[]>) => {
            state.data = action.payload;
        },
        setStatistics: (state, action: PayloadAction<Statistics>) => {
            state.statistics = action.payload;
        },
        setGenreStat: (state, action: PayloadAction<GenreStat[]>) => {
            state.genreStat = action.payload;
        },
        setArtistStat: (state, action: PayloadAction<ArtistStat[]>) => {
            state.artistStat = action.payload;
        },
        setAlbumStat: (state, action: PayloadAction<AlbumStat[]>) => {
            state.albumStat = action.payload;
        },
        setArtists: (state, action: PayloadAction<string[]>) => {
            state.artists = action.payload;
        },
        setAlbums: (state, action: PayloadAction<string[]>) => {
            state.albums = action.payload;
        },
        setGenres: (state, action: PayloadAction<string[]>) => {
            state.genres = action.payload;
        },
        createSong: (state, action: PayloadAction<Song>) => {
            state.data.unshift(action.payload);
        },
        updateExistingSong: (state, action: PayloadAction<Song>) => {
            // const index = state.data.findIndex(song => song._id === action.payload._id);
            // if (index !== -1) {
            //     state.data[index] = action.payload;
            // }

            state.data = state.data.map((song) => {
                if(song._id == action.payload._id){
                    return action.payload
                }else{
                    return song;
                }
            })
        },
        deleteExistingSong: (state, action: PayloadAction<string>) => {
            state.data = state.data.filter(song => song._id !== action.payload);
        },
    },
});

export const { setSongs, setStatistics, setAlbumStat, setArtistStat,setAlbums, setArtists, setGenres, setGenreStat, createSong, updateExistingSong, deleteExistingSong } = songsSlice.actions;
export default songsSlice.reducer;
