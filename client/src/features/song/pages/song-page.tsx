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
import { css, keyframes } from "@emotion/react"
import Empty from "../../../shared/components/icons/empty.component"

const loaderAnimation = keyframes`
  0% {
    box-shadow: 
      0 -30px #F4DD51, calc(30px*0.707) calc(-30px*0.707) #E3AAD6, 30px 0 #F4DD51, 0 0 #E3AAD6,
      0 0 #F4DD51, 0 0 #E3AAD6, 0 0 #F4DD51, 0 0 #E3AAD6;
  }
  12.5% {
    box-shadow: 
      0 0 #F4DD51, calc(30px*0.707) calc(-30px*0.707) #E3AAD6, 30px 0 #F4DD51, calc(30px*0.707) calc(30px*0.707) #E3AAD6,
      0 0 #F4DD51, 0 0 #E3AAD6, 0 0 #F4DD51, 0 0 #E3AAD6;
  }
  25% {
    box-shadow: 
      0 0 #F4DD51, 0 0 #E3AAD6, 30px 0 #F4DD51, calc(30px*0.707) calc(30px*0.707) #E3AAD6,
      0 30px #F4DD51, 0 0 #E3AAD6, 0 0 #F4DD51, 0 0 #E3AAD6;
  }
  37.5% {
    box-shadow: 
      0 0 #F4DD51, 0 0 #E3AAD6, 0 0 #F4DD51, calc(30px*0.707) calc(30px*0.707) #E3AAD6,
      0 30px #F4DD51, calc(-30px*0.707) calc(30px*0.707) #E3AAD6, 0 0 #F4DD51, 0 0 #E3AAD6;
  }
  50% {
    box-shadow: 
      0 0 #F4DD51, 0 0 #E3AAD6, 0 0 #F4DD51, 0 0 #E3AAD6,
      0 30px #F4DD51, calc(-30px*0.707) calc(30px*0.707) #E3AAD6, -30px 0 #F4DD51, 0 0 #E3AAD6;
  }
  62.5% {
    box-shadow: 
      0 0 #F4DD51, 0 0 #E3AAD6, 0 0 #F4DD51, 0 0 #E3AAD6,
      0 0 #F4DD51, calc(-30px*0.707) calc(30px*0.707) #E3AAD6, -30px 0 #F4DD51, calc(-30px*0.707) calc(-30px*0.707) #E3AAD6;
  }
  75% {
    box-shadow: 
      0 -30px #F4DD51, 0 0 #E3AAD6, 0 0 #F4DD51, 0 0 #E3AAD6,
      0 0 #F4DD51, 0 0 #E3AAD6, -30px 0 #F4DD51, calc(-30px*0.707) calc(-30px*0.707) #E3AAD6;
  }
  87.5% {
    box-shadow: 
      0 -30px #F4DD51, calc(30px*0.707) calc(-30px*0.707) #E3AAD6, 0 0 #F4DD51, 0 0 #E3AAD6,
      0 0 #F4DD51, 0 0 #E3AAD6, 0 0 #F4DD51, calc(-30px*0.707) calc(-30px*0.707) #E3AAD6;
  }
  100% {
    box-shadow: 
      0 -30px #F4DD51, calc(30px*0.707) calc(-30px*0.707) #E3AAD6, 30px 0 #F4DD51, 0 0 #E3AAD6,
      0 0 #F4DD51, 0 0 #E3AAD6, 0 0 #F4DD51, 0 0 #E3AAD6;
  }
`

const Loader = css`
  width: 22px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #f10c49;
  animation: ${loaderAnimation} 1.5s infinite linear;
`

const Relative = emotionStyled.div({
  position: "relative",
  marginTop: "25rem"
})

const Centered = emotionStyled.div({
  display: "block",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
})

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

  return (
    <>
      {songs.isLoading ? (
        <Relative>
          <Centered>
            
            <div css={Loader}></div>
          </Centered>
        </Relative>
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

                {songs.data && songs.data.length < 1 ? (
                  <tr>
                    <td colSpan={6}>
                    <Empty />

                    </td>

                  </tr>
                ) : (
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
                  ))
                )}
               
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
