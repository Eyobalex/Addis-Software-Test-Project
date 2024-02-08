import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Song } from "../../../models/song.model"
import { IconEdit, IconPlaylistAdd, IconTrash } from "@tabler/icons-react"
import Modal from "../../../shared/components/modal/modal-component"
import SongForm from "../components/song-form.component"
import { confirmAlert } from 'react-confirm-alert'
import { toast } from "react-toastify"
export function SongPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedSong, setSelectedSong] = useState<Song|undefined>(undefined)
    const [formTitle, setFormTitle] = useState<string>("Add New Song")
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)
  const openEditModal = (song: Song) => {
    setFormTitle(`Edit ${song.title}`)
    setSelectedSong(song)
    setModalIsOpen(true)
  }
  const dispatch = useDispatch()
  const songs = useSelector((state: any) => {
    console.log("🚀 ~ songs ~ state.song.lissssssssssst:", state)
    return state.songs
  })

  const deleteCall = (song: Song) => {
    // console.log("🚀 ~ deleteCall ~ song:", {...song, id: song._id})

    confirmAlert({
        title: `Delete ${song.title}`,                       
        message: 'You are about to delete a song. This is a permanent action.',               
        childrenElement: () => <div>Custom UI</div>,       
        confirmLabel: 'Delete',                          
        cancelLabel: 'Cancel',                            
        onConfirm: () => {
            dispatch({type: 'songs/deleteSong', payload: song._id})

            closeModal();
            toast.success("Song deleted successfully!", {
                position: "top-center",
                autoClose: 15000
              });
        },   
        onCancel: () => closeModal(),      
        overlayClassName: "overlay-custom-class-name"      
      })
    
  }
  useEffect(() => {
    // Fetch songs from the Redux store
    dispatch({ type: "songs/fetchSongs" })
  }, [dispatch])
  console.log("🚀 ~ SongPage ~ songssssssssss:", songs)

  return (
    <>
      <h1>Addis Songs
      <button onClick={openModal}>
        {" "}
        <IconPlaylistAdd /> Add
      </button>

      </h1>
      <hr />

      

      <div className="container">
        <table>
          <thead>
            <th>No</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Gener</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {songs.data &&
              songs.data.map((song: Song, index: number) => (
                <tr>
                  <td>{++index}</td>
                  <td>{song.title}</td>
                  <td>{song.album}</td>
                  <td>{song.artist}</td>
                  <td>{song.gener}</td>
                  <td>
                    <IconEdit onClick={() =>{
                        openEditModal(song)}
                        }/>
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

        <SongForm title={formTitle} song={selectedSong} openModal={openModal} closeModal={closeModal}/>
      </Modal>
    </>
  )
}
