import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Statistics } from "../../../models/statistics.model"
import styled from "@emotion/styled"

interface TotalStatsProp {
    stats: Statistics
}
export const TotalStats: React.FC<TotalStatsProp> = ({stats}) => {
    
    const UL = styled.ul({
        fontSize: "1.5rem",
    })
    const LI = styled.li({
        listStyle: "none",
    })
  return (
    <>
      <UL>
        <LI>Total Songs: {stats.totalSongs}</LI>
        <LI>Total Artists: {stats.totalArtists}</LI>
        <LI>Total Albums: {stats.totalAlbums}</LI>
        <LI>Total Genres: {stats.totalGenres}</LI>
      </UL>
    </>
  )
}
