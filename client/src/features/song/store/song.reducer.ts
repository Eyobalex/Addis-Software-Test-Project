import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getAllSongs, addSong as addSongAPI, updateSong as updateSongAPI, deleteSong as deleteSongAPI, getStatistics } from '../api/song.api';
import { setSongs, createSong, updateExistingSong, deleteExistingSong, setStatistics } from './song.slice';


function* fetchSongs(action: any): Generator<any, void, any> {
    try {

        
        console.log("🚀 ~ function*fetchSongs ~ response:")
        const response = yield call(getAllSongs, action.payload);
        console.log("🚀 ~ function*fetchSongs ~ response:", response)
    
        yield put(setSongs(response));
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
}
function* fetchStatistics(): Generator<any, void, any> {
    try {

        
        console.log("🚀 ~ function*fetchSongs ~ response:")
        const response = yield call(getStatistics);
        console.log("🚀 ~ function*fetchSongs ~ response:", response)
    
        yield put(setStatistics(response));
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
}

function* addSong(action: any): Generator<any, void, any> {
    try {
        const response = yield call(addSongAPI, action.payload);
        console.log("🚀 ~ function*addSong ~ response.data:", response.data)
        yield put(createSong(response.data.data));
    } catch (error) {
        console.error('Error adding song:', error);
    }
}

function* updateSong(action: any): Generator<any, void, any> {
    try {
        const response = yield call(updateSongAPI, action.payload.id, action.payload.song);
        yield put(updateExistingSong(response.data.data));
    } catch (error) {
        console.error('Error updating song:', error);
    }
}

function* deleteSong(action: any): Generator<any, void, any> {
    console.log("🚀 ~ function*deleteSong ~ action:", action)
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
        takeLatest('songs/fetchStatistics', fetchStatistics),
        takeLatest('songs/addSong', addSong),
        takeLatest('songs/updateSong', updateSong),
        takeLatest('songs/deleteSong', deleteSong),
    ]);
}

export default songSaga;