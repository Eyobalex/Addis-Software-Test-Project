import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Song } from "../../../models/song.model"

export function SongPage() {
  const dispatch = useDispatch()
  const songs = useSelector((state: any) => {
    console.log("🚀 ~ songs ~ state.song.list:", state.songs.list.data)
    return state.songs.list
  })
  useEffect(() => {
    // Fetch songs from the Redux store
    dispatch({ type: "songs/fetchSongs" })
  }, [dispatch])
  console.log("🚀 ~ SongPage ~ songs:", songs)

  return (
    <>
      <ul>
        {songs.data.map((song: Song) => (
            <li>
                <ul>
                    <li>{song.title}</li>
                    <li>{song.album}</li>
                    <li>{song.artist}</li>
                    <li>{song.gener}</li>
                </ul>
            </li>
        ))}
      </ul>
    </>
  )
}
