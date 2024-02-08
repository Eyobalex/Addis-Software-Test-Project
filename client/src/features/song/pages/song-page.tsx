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
export function SongPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedSong, setSelectedSong] = useState<Song | undefined>(undefined)
  const [formTitle, setFormTitle] = useState<string>("Add New Song")

  const [uniqueArtists, setUniqueArtists] = useState<string[]>([])
  const [uniqueAlbums, setUniqueAlbums] = useState<string[]>([])
  const [uniqueGeners, setUniqueGeners] = useState<string[]>([])

  const [selectedArtist, setSelectedArtist] = useState<string | undefined>(
    undefined,
  )
  const [selectedAlbum, setSelectedAlbum] = useState<string | undefined>(
    undefined,
  )
  const [selectedGener, setSelectedGener] = useState<string | undefined>(
    undefined,
  )

  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)

  const dispatch = useDispatch()
  const songs = useSelector((state: any) => state.songs)
  console.log("🚀 ~ SongPage ~ songs:", songs)

  useEffect(() => {
    let uas: string[] = []

    songs.data.map((song: Song) => {
      if (!uas.includes(song.artist)) uas.push(song.artist)
    })

    setUniqueArtists(uas)

    let uals: string[] = []

    songs.data.map((song: Song) => {
      if (!uals.includes(song.album)) uals.push(song.album)
    })

    setUniqueAlbums(uals)

    let ugs: string[] = []

    songs.data.map((song: Song) => {
      if (!ugs.includes(song.genre)) ugs.push(song.genre)
    })

    setUniqueGeners(ugs)
  }, [songs])

  useEffect(() => {
    let queryParam = ""

    if (selectedAlbum && selectedArtist && selectedGener) {
      queryParam = `album=${selectedAlbum}&artist=${selectedArtist}&genre=${selectedGener}`
    } else if (selectedAlbum && selectedArtist) {
      queryParam = `album=${selectedAlbum}&artist=${selectedArtist}`
    } else if (selectedAlbum && selectedGener) {
      queryParam = `album=${selectedAlbum}&genre=${selectedGener}`
    } else if (selectedArtist && selectedGener) {
      queryParam = `artist=${selectedArtist}&genre=${selectedGener}`
    } else if (selectedGener) {
      queryParam = `genre=${selectedGener}`
    } else if (selectedAlbum) {
      queryParam = `album=${selectedAlbum}`
    } else if (selectedArtist) {
      queryParam = `artist=${selectedArtist}`
    }

    if (searchQuery) {
      queryParam += `&search=${searchQuery}`
    }

    dispatch({ type: "songs/fetchSongs", payload: queryParam })
  }, [selectedAlbum, selectedArtist, selectedGener, searchQuery])

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
  useEffect(() => {
    dispatch({ type: "songs/fetchSongs" })
    dispatch({ type: "songs/fetchArtistStatistics" })
    dispatch({ type: "songs/fetchAlbumStatistics" })
    dispatch({ type: "songs/fetchGenreStatistics" })

    dispatch({ type: "songs/fetchArtists" })
    dispatch({ type: "songs/fetchAlbums" })
    dispatch({ type: "songs/fetchGenres" })
    // dispatch({ type: "songs/fetchStatistics" })
  }, [dispatch])
  console.log("🚀 ~ SongPage ~ songssssssssss:", songs)

  return (
    <>
      <TotalStats stats={songs.statistics} />

      <h1>
        Addis Songs
        <button onClick={openModal} style={{ marginLeft: "50rem" }}>
          {" "}
          <IconPlaylistAdd /> Add
        </button>
      </h1>

      <div
        className="filter-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
          marginLeft: "10rem",
        }}
      >
        <select
          name=""
          id=""
          style={{ width: "15%", height: "2.5rem" }}
          onChange={e => setSelectedArtist(e.target.value)}
        >
          <option value="">Select Artist</option>

          {songs.artists &&
            songs.artists.length > 0 &&
            songs.artists.map((artist: string) => (
              <option value={artist}>{artist}</option>
            ))}
        </select>
        <select
          name=""
          id=""
          style={{ width: "15%", height: "2.5rem" }}
          onChange={e => setSelectedAlbum(e.target.value)}
        >
          <option value="">Select Album</option>
          {songs.albums &&
            songs.albums.length > 0 &&
            songs.albums.map((album: string) => (
              <option value={album}>{album}</option>
            ))}
        </select>
        <select
          name=""
          id=""
          style={{ width: "15%", height: "2.5rem" }}
          onChange={e => setSelectedGener(e.target.value)}
        >
          <option value="">Select Genre</option>

          {songs.genres &&
            songs.genres.length > 0 &&
            songs.genres.map((genre: string) => (
              <option value={genre}>{genre}</option>
            ))}
        </select>

        <input
          type="text"
          style={{ width: "15%", height: ".5rem" }}
          onKeyDown={async e => {
            await setSearchQuery(e.currentTarget.value)
          }}
        />
      </div>

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
                            (stat: ArtistStat) => stat.artist == song.artist,
                          )[0]?.totalSongs
                        }
                      </li>
                      <li>
                        Total Albums:{" "}
                        {
                          songs.artistStat.filter(
                            (stat: ArtistStat) => stat.artist == song.artist,
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
  )
}
