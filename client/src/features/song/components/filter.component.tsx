import emotionStyled from "@emotion/styled"
import { debounce } from "lodash"

interface FilterProp {
    artists: string[],
    albums: string[],
    genres: string[],

    selectedArtist?: string,
    selectedAlbum?: string,
    selectedGenre?: string,
    searchQuery?: string,

    setSelectedAlbum?: any,
    setSelectedArtist?: any,
    setSelectedGenre?: any,
    setSearchQuery?: any

}
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
    

  const FilterContainer = emotionStyled.div({
    display: "flex",
    justifyContent: "space-between",
    width: "80%",
    marginLeft: "10rem",
  })

  const Select = emotionStyled.select({ width: "15%", height: "2.5rem" })
  const Input = emotionStyled.input({ width: "15%", height: ".5rem" })
   
  return (
    <FilterContainer>
    <Select
      value={selectedArtist}
      onChange={e => setSelectedArtist(e.target.value)}
    >
      <option value="">Select Artist</option>

      {artists &&
        artists.length > 0 &&
        artists.map((artist: string) => (
          <option value={artist}>{artist}</option>
        ))}
    </Select>
    <Select
      value={selectedAlbum}
      onChange={e => setSelectedAlbum(e.target.value)}
    >
      <option value="">Select Album</option>
      {albums &&
        albums.length > 0 &&
        albums.map((album: string) => (
          <option value={album}>{album}</option>
        ))}
    </Select>
    <Select
      value={selectedGenre}
      onChange={e => setSelectedGenre(e.target.value)}
    >
      <option value="">Select Genre</option>

      {genres &&
        genres.length > 0 &&
        genres.map((genre: string) => (
          <option value={genre}>{genre}</option>
        ))}
    </Select>

    <Input
      type="text"
      value={searchQuery}

      onChange={debounce(async e => {                
        await setSearchQuery(e.target.value)
      }, 5000)}
      onKeyDown={debounce(async e => {
        await setSearchQuery(e.currentTarget.value)
      }, 5000)}
    />
  </FilterContainer>
  )
}
