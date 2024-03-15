import emotionStyled from "@emotion/styled"
import { debounce } from "lodash"
import { useEffect, useState } from "react"

interface FilterProp {
  artists: string[]
  albums: string[]
  genres: string[]

  selectedArtist?: string
  selectedAlbum?: string
  selectedGenre?: string
  searchQuery?: string

  setSelectedAlbum?: any
  setSelectedArtist?: any
  setSelectedGenre?: any
  setSearchQuery?: any

}

const FilterContainer = emotionStyled.div({
  display: "flex",
  justifyContent: "space-around",
  width: "65%",
  marginLeft: "23rem",
  
})

const Select = emotionStyled.select({ width: "15%", height: "2.5rem", borderRadius: "15rem", paddingLeft: "7px" })
const Input = emotionStyled.input({ width: "15%", height: "2.1rem", borderRadius: "15rem", paddingLeft: "7px" })

export const FilterComponent: React.FC<FilterProp> = ({
  artists,
  albums,
  genres,

  selectedArtist,
  selectedAlbum,
  selectedGenre,
  searchQuery,

  setSelectedAlbum,
  setSelectedArtist,
  setSelectedGenre,
  setSearchQuery
}) => {

  const [search, setSearch] = useState<string>('');

  useEffect(()=> {
    if(searchQuery){
      setSearch(searchQuery);
    }
  }, [searchQuery])
  return (
    <FilterContainer>
      <Select
        value={selectedArtist}
        onChange={e => setSelectedArtist(e.target.value)}
      >
        <option value="">Select Artist</option>

        {artists &&
          artists.length > 0 &&
          artists.map((artist: string, i: number) => (
            <option value={artist} key={i}>{artist}</option>
          ))}
      </Select>
      <Select
        value={selectedAlbum}
        onChange={e => setSelectedAlbum(e.target.value)}
      >
        <option value="" >Select Album</option>
        {albums &&
          albums.length > 0 &&
          albums.map((album: string, i:number) => <option value={album} key={i}>{album}</option>)}
      </Select>
      <Select
        value={selectedGenre}
        onChange={e => setSelectedGenre(e.target.value)}
      >
        <option value="">Select Genre</option>

        {genres &&
          genres.length > 0 &&
          genres.map((genre: string, i: number) => <option value={genre} key={i}>{genre}</option>)}
      </Select>

      <Input
        type="text"
        value={searchQuery}
        placeholder="Search ..."
        onChange={debounce(async (e) => {
           await setSearchQuery(e.target.value);
        }, 1000)}
        // onKeyDown={debounce(async e => {
        //   await setSearchQuery(e.currentTarget?.value)
        // }, 1000)}
      />
    </FilterContainer>
  )
}
