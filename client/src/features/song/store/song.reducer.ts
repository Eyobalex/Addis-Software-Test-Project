import { all, call, put, takeLatest } from "redux-saga/effects"
import {
  getAllSongs,
  addSong as addSongAPI,
  updateSong as updateSongAPI,
  deleteSong as deleteSongAPI,
  getStatistics,
  getStatisticsByArtist,
  getStatisticsByAlbum,
  getStatisticsByGenre,
  getAlbums,
  getGenres,
  getArtists,
} from "../api/song.api"
import {
  setSongs,
  createSong,
  updateExistingSong,
  deleteExistingSong,
  setStatistics,
  setArtistStat,
  setAlbumStat,
  setGenreStat,
  setGenres,
  setAlbums,
  setArtists,
  loadingStarted,
  loadingStopped,
} from "./song.slice"
import { toast } from "react-toastify"

function* fetchSongs(action: any): Generator<any, void, any> {
  try {
    yield put(loadingStarted())
    const response = yield call(getAllSongs, action.payload)

    yield put(setSongs(response))
    yield put(loadingStopped())
  } catch (error) {
    yield put(loadingStopped())

    toast.error("Somthing went wrong. Please Try again", {
      position: "top-right",
      autoClose: 1500,
    })
  }
}
function* fetchStatistics(): Generator<any, void, any> {
  try {
    yield put(loadingStarted())

    const response = yield call(getStatistics)
    yield put(setStatistics(response))
    yield put(loadingStopped())
  } catch (error) {
    yield put(loadingStopped())
    toast.error("Somthing went wrong. Please Try again", {
      position: "top-right",
      autoClose: 1500,
    })
  }
}
function* fetchArtistStatistics(): Generator<any, void, any> {
  try {
    yield put(loadingStarted())

    const response = yield call(getStatisticsByArtist)
    yield put(setArtistStat(response))
    yield put(loadingStopped())
  } catch (error) {
    yield put(loadingStopped())
    toast.error("Somthing went wrong. Please Try again", {
      position: "top-right",
      autoClose: 1500,
    })
  }
}
function* fetchAlbumStatistics(): Generator<any, void, any> {
  try {
    yield put(loadingStarted())

    const response = yield call(getStatisticsByAlbum)
    yield put(setAlbumStat(response))
    yield put(loadingStopped())
  } catch (error) {
    yield put(loadingStopped())
    toast.error("Somthing went wrong. Please Try again", {
        position: 'top-right',
        autoClose: 1500
    })
  }
}
function* fetchGenreStatistics(): Generator<any, void, any> {
  try {
    yield put(loadingStarted())

    const response = yield call(getStatisticsByGenre)
    yield put(setGenreStat(response))
    yield put(loadingStopped())
  } catch (error) {
    yield put(loadingStopped())
    toast.error("Somthing went wrong. Please Try again", {
        position: 'top-right',
        autoClose: 1500
    })
  }
}
function* fetchGenres(): Generator<any, void, any> {
  try {
    yield put(loadingStarted())

    const response = yield call(getGenres)
    yield put(setGenres(response))
    yield put(loadingStopped())
  } catch (error) {
    yield put(loadingStopped())
    toast.error("Somthing went wrong. Please Try again", {
        position: 'top-right',
        autoClose: 1500
    })
  }
}
function* fetchAlbums(): Generator<any, void, any> {
  try {
    yield put(loadingStarted())

    const response = yield call(getAlbums)
    yield put(setAlbums(response))
    yield put(loadingStopped())
  } catch (error) {
    yield put(loadingStopped())
    toast.error("Somthing went wrong. Please Try again", {
        position: 'top-right',
        autoClose: 1500
    })
  }
}
function* fetchArtists(): Generator<any, void, any> {
  try {
    yield put(loadingStarted())

    const response = yield call(getArtists)
    yield put(setArtists(response))
    yield put(loadingStopped())
  } catch (error) {
    yield put(loadingStopped())
    toast.error("Somthing went wrong. Please Try again", {
        position: 'top-right',
        autoClose: 1500
    })
  }
}

function* addSong(action: any): Generator<any, void, any> {
  try {
    yield put(loadingStarted())

    const response = yield call(addSongAPI, action.payload)
    yield put(createSong(response.data.data))
    yield put(loadingStopped())
    toast.success("Song created successfully!", {
      position: "top-right",
      autoClose: 1500,
    })
  } catch (error) {
    yield put(loadingStopped())
    toast.error("Somthing went wrong. Please Try again", {
        position: 'top-right',
        autoClose: 1500
    })
  }
}

function* updateSong(action: any): Generator<any, void, any> {
  try {
    yield put(loadingStarted())

    const response = yield call(
      updateSongAPI,
      action.payload.id,
      action.payload.song,
    )
    yield put(updateExistingSong(response.data.data))
    yield put(loadingStopped())

    toast.success("Song updated successfully!", {
      position: "top-right",
      autoClose: 1500,
    })
  } catch (error) {
    yield put(loadingStopped())
    toast.error("Somthing went wrong. Please Try again", {
        position: 'top-right',
        autoClose: 1500
    })
  }
}

function* deleteSong(action: any): Generator<any, void, any> {
  try {
    yield put(loadingStarted())

    yield call(deleteSongAPI, action.payload)
    yield put(deleteExistingSong(action.payload))
    yield put(loadingStopped())
    toast.success("Song deleted successfully", {
      position: 'top-right',
      autoClose: 1500
  })
  } catch (error) {
    yield put(loadingStopped())
    toast.error("Somthing went wrong. Please Try again", {
        position: 'top-right',
        autoClose: 1500
    })
  }
}

function* songSaga(): Generator<any, void, any> {
  yield all([
    takeLatest("songs/fetchSongs", fetchSongs),
    takeLatest("songs/fetchStatistics", fetchStatistics),

    takeLatest("songs/fetchArtistStatistics", fetchArtistStatistics),
    takeLatest("songs/fetchAlbumStatistics", fetchAlbumStatistics),
    takeLatest("songs/fetchGenreStatistics", fetchGenreStatistics),

    takeLatest("songs/fetchArtists", fetchArtists),
    takeLatest("songs/fetchAlbums", fetchAlbums),
    takeLatest("songs/fetchGenres", fetchGenres),

    takeLatest("songs/addSong", addSong),
    takeLatest("songs/updateSong", updateSong),
    takeLatest("songs/deleteSong", deleteSong),
  ])
}

export default songSaga
