import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song } from '../../../models/song.model';


interface SongsState {
    data: Song[];
}

const initialState: SongsState = {
    data: [],
};

const songsSlice = createSlice({
    name: 'songs',
    initialState,
    reducers: {
        setSongs: (state, action: PayloadAction<Song[]>) => {
            state.data = action.payload;
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

export const { setSongs, createSong, updateExistingSong, deleteExistingSong } = songsSlice.actions;
export default songsSlice.reducer;