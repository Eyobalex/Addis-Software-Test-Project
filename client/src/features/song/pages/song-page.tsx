import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Song } from "../../../models/song.model"
import { IconEdit, IconPlaylistAdd, IconTrash } from "@tabler/icons-react"
import Modal from "../../../shared/components/modal/modal-component"
import SongForm from "../components/song-form.component"
import { confirmAlert } from "react-confirm-alert"
import { toast } from "react-toastify"
import { TotalStats } from "../components/total-stats.component"
import { ArtistStat } from "../../../models/artist-stat.model"
import { AlbumStat } from "../../../models/album-stat.model"
import { GenreStat } from "../../../models/genre-stat.model"
import { debounce } from "lodash"
import emotionStyled from "@emotion/styled"
import { FilterComponent } from "../components/filter.component"
export function SongPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedSong, setSelectedSong] = useState<Song | undefined>(undefined)
  const [formTitle, setFormTitle] = useState<string>("Add New Song")

  const [selectedArtist, setSelectedArtist] = useState<string | undefined>(
    undefined,
  )
  const [selectedAlbum, setSelectedAlbum] = useState<string | undefined>(
    undefined,
  )
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(
    undefined,
  )

  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)

  const dispatch = useDispatch()
  const songs = useSelector((state: any) => state.songs)
  console.log("🚀 ~ SongPage ~ songs:", songs)

  useEffect(() => {
    let queryParam = ""

    if (selectedAlbum && selectedArtist && selectedGenre) {
      queryParam = `album=${selectedAlbum}&artist=${selectedArtist}&genre=${selectedGenre}`
    } else if (selectedAlbum && selectedArtist) {
      queryParam = `album=${selectedAlbum}&artist=${selectedArtist}`
    } else if (selectedAlbum && selectedGenre) {
      queryParam = `album=${selectedAlbum}&genre=${selectedGenre}`
    } else if (selectedArtist && selectedGenre) {
      queryParam = `artist=${selectedArtist}&genre=${selectedGenre}`
    } else if (selectedGenre) {
      queryParam = `genre=${selectedGenre}`
    } else if (selectedAlbum) {
      queryParam = `album=${selectedAlbum}`
    } else if (selectedArtist) {
      queryParam = `artist=${selectedArtist}`
    }

    if (searchQuery) {
      queryParam += `&search=${searchQuery}`
    }

    dispatch({ type: "songs/fetchSongs", payload: queryParam })
  }, [selectedAlbum, selectedArtist, selectedGenre, searchQuery])

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)
  const openEditModal = (song: Song) => {
    setFormTitle(`Edit ${song.title}`)
    setSelectedSong(song)
    setModalIsOpen(true)
  }

  const deleteCall = (song: Song) => {
    // console.log("🚀 ~ deleteCall ~ song:", {...song, id: song._id})

    confirmAlert({
      title: `Delete ${song.title}`,
      message: "You are about to delete a song. This is a permanent action.",
      buttons: [
        {
          label: "Delete",
          onClick: () => {
            dispatch({ type: "songs/deleteSong", payload: song._id })

            closeModal()
            toast.success("Song deleted successfully!", {
              position: "top-center",
              autoClose: 15000,
            })
          },
        },
        {
          label: "Cancel",
          onClick: () => closeModal(),
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      onKeypressEscape: () => {},
      overlayClassName: "overlay-custom-class-name",
    })
  }

  const resetFilters = () => {
    setSelectedArtist(undefined)
    setSelectedAlbum(undefined)
    setSelectedGenre(undefined)
    setSearchQuery(undefined)
  }
  useEffect(() => {
    dispatch({ type: "songs/fetchSongs" })
    dispatch({ type: "songs/fetchArtistStatistics" })
    dispatch({ type: "songs/fetchAlbumStatistics" })
    dispatch({ type: "songs/fetchGenreStatistics" })

    dispatch({ type: "songs/fetchArtists" })
    dispatch({ type: "songs/fetchAlbums" })
    dispatch({ type: "songs/fetchGenres" })

    dispatch({ type: "songs/fetchStatistics" })
  }, [dispatch])
  console.log("🚀 ~ SongPage ~ songssssssssss:", songs)

  const FilterContainer = emotionStyled.div({
    display: "flex",
    justifyContent: "space-between",
    width: "80%",
    marginLeft: "10rem",
  })

  const Select = emotionStyled.select({ width: "15%", height: "2.5rem" })
  const Input = emotionStyled.input({ width: "15%", height: ".5rem" })
  return (
    <>
      {songs.isLoading ? (
        "Loading..."
      ) : (
        <>
          <TotalStats stats={songs.statistics} />

          <h1>
            Addis Songs
            <button onClick={openModal} style={{ marginLeft: "50rem" }}>
              {" "}
              <IconPlaylistAdd /> Add
            </button>
          </h1>

          {/* <FilterContainer>
            <Select
              value={selectedArtist}
              onChange={e => setSelectedArtist(e.target.value)}
            >
              <option value="">Select Artist</option>

              {songs.artists &&
                songs.artists.length > 0 &&
                songs.artists.map((artist: string) => (
                  <option value={artist}>{artist}</option>
                ))}
            </Select>
            <Select
              value={selectedAlbum}
              onChange={e => setSelectedAlbum(e.target.value)}
            >
              <option value="">Select Album</option>
              {songs.albums &&
                songs.albums.length > 0 &&
                songs.albums.map((album: string) => (
                  <option value={album}>{album}</option>
                ))}
            </Select>
            <Select
              value={selectedGenre}
              onChange={e => setSelectedGenre(e.target.value)}
            >
              <option value="">Select Genre</option>

              {songs.genres &&
                songs.genres.length > 0 &&
                songs.genres.map((genre: string) => (
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
          </FilterContainer> */}

          <FilterComponent
            albums={songs.albums}
            artists={songs.artists}
            genres={songs.genres}
            selectedAlbum={selectedAlbum}
            selectedArtist={selectedArtist}
            selectedGenre={selectedGenre}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedAlbum={setSelectedAlbum}
            setSelectedArtist={setSelectedArtist}
            setSelectedGenre={setSelectedGenre}
          />

          <div className="container">
            <table>
              <thead>
                <th>No</th>
                <th>Title</th>
                <th>Artist</th>
                <th>Album</th>
                <th>Genre</th>
                <th>Actions</th>
              </thead>
              <tbody>
                {songs.data &&
                  songs.data.map((song: Song, index: number) => (
                    <tr>
                      <td>{++index}</td>
                      <td>{song.title}</td>
                      <td>
                        {song.artist}
                        <hr />
                        <ul>
                          <li>
                            Total Songs:{" "}
                            {
                              songs.artistStat.filter(
                                (stat: ArtistStat) =>
                                  stat.artist == song.artist,
                              )[0]?.totalSongs
                            }
                          </li>
                          <li>
                            Total Albums:{" "}
                            {
                              songs.artistStat.filter(
                                (stat: ArtistStat) =>
                                  stat.artist == song.artist,
                              )[0]?.totalAlbums
                            }
                          </li>
                        </ul>
                      </td>
                      <td>
                        {song.album}
                        <hr />
                        <ul>
                          <li>
                            Total Songs:
                            {
                              songs.albumStat.filter(
                                (stat: AlbumStat) => stat.album == song.album,
                              )[0]?.totalSongs
                            }
                          </li>
                        </ul>
                      </td>
                      <td>
                        {song.genre}
                        <hr />
                        <ul>
                          <li>
                            Total Songs:
                            {
                              songs.genreStat.filter(
                                (stat: GenreStat) => stat?.genre == song?.genre,
                              )[0]?.totalSongs
                            }
                          </li>
                        </ul>
                      </td>
                      <td>
                        <IconEdit
                          onClick={() => {
                            openEditModal(song)
                          }}
                        />
                        <IconTrash onClick={() => deleteCall(song)} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <Modal isOpen={modalIsOpen} onClose={closeModal}>
            {/* <h2>Modal Content</h2> */}
            {/* <p>This is a simple modal example.</p> */}

            <SongForm
              title={formTitle}
              song={selectedSong}
              openModal={openModal}
              closeModal={closeModal}
            />
          </Modal>
        </>
      )}
    </>
  )
}
