import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '../../../models/song.model';


interface SongsState {
    list: Song[];
}

const initialState: SongsState = {
    list: [],
};

const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        setSongs: (state, action: PayloadAction<Song[]>) => {
            state.list = action.payload;
        },
        createSong: (state, action: PayloadAction<Song>) => {
            state.list.push(action.payload);
        },
        updateExistingSong: (state, action: PayloadAction<Song>) => {
            const index = state.list.findIndex(song => song.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
        deleteExistingSong: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(song => song.id !== action.payload);
        },
    },
});

export const { setSongs, createSong, updateExistingSong, deleteExistingSong } = songsSlice.actions;
export default songsSlice.reducer;
