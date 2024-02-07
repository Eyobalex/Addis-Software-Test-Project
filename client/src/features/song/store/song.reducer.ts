import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getAllSongs, addSong as addSongAPI, updateSong as updateSongAPI, deleteSong as deleteSongAPI } from '../api/song.api';
import { setSongs, createSong, updateExistingSong, deleteExistingSong } from './song.slice';


function* fetchSongs(): Generator<any, void, any> {
    try {
        const response = yield call(getAllSongs);
    
        yield put(setSongs(response.data));
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
}

function* addSong(action: any): Generator<any, void, any> {
    try {
        const response = yield call(addSongAPI, action.payload);
        yield put(createSong(response.data));
    } catch (error) {
        console.error('Error adding song:', error);
    }
}

function* updateSong(action: any): Generator<any, void, any> {
    try {
        const response = yield call(updateSongAPI, action.payload.id, action.payload.song);
        yield put(updateExistingSong(response.data));
    } catch (error) {
        console.error('Error updating song:', error);
    }
}

function* deleteSong(action: any): Generator<any, void, any> {
    try {
        yield call(deleteSongAPI, action.payload);
        yield put(deleteExistingSong(action.payload));
    } catch (error) {
        console.error('Error deleting song:', error);
    }
}

function* songSaga(): Generator<any, void, any> {
    yield all([
        takeLatest('songs/fetchSongs', fetchSongs),
        takeLatest('songs/addSong', addSong),
        takeLatest('songs/updateSong', updateSong),
        takeLatest('songs/deleteSong', deleteSong),
    ]);
}

export default songSaga;