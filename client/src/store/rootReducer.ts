import { type Action, combineReducers } from '@reduxjs/toolkit';
import songReducer from '../features/song/store/song.slice';
const appReducer = combineReducers({
    songs: songReducer,
});

const rootReducer = (
    state: any,
    action: Action,
): ReturnType<typeof appReducer> => {
    return appReducer(state, action);
};

export default rootReducer;