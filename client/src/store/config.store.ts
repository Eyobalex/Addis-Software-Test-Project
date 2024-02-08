import createSagaMiddleware from "@redux-saga/core"
import { configureStore } from "@reduxjs/toolkit"
import songReducer from '../features/song/store/song.slice';

// import { type ToolkitStore } from "@reduxjs/toolkit"
import songSaga from "../features/song/store/song.reducer";

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: {
        songs: songReducer
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: false,
        serializableCheck: false,
      }).concat(sagaMiddleware),
  })

  sagaMiddleware.run(songSaga);

  return store
}
export const store = makeStore()
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
