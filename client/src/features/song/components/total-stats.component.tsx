import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Statistics } from "../../../models/statistics.model"

interface TotalStatsProp {
    stats: Statistics
}
export const TotalStats: React.FC<TotalStatsProp> = ({stats}) => {
  const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch({ type: "songs/fetchStatistics" })
//   }, [dispatch])
  return (
    <>
      <ul>
        <li>Total Songs: {stats.totalSongs}</li>
        <li>Total Artists: {stats.totalArtists}</li>
        <li>Total Albums: {stats.totalAlbums}</li>
        <li>Total Genres: {stats.totalGenres}</li>
      </ul>
    </>
  )
}
