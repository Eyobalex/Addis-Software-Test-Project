import { useEffect, useState } from "react"
import "./song-form.css"
import { Song } from "../../../models/song.model";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface SongFormProps {
    title: string;
    song?: Song;

    openModal?: () => void;
    closeModal?: () => void;
}
const SongForm: React.FC<SongFormProps> = ({title, song, openModal, closeModal}) => {

    const initialState: Song ={
        title: "",
        artist: "",
        album: "",
        gener: "",

    }
  const [formData, setFormData] = useState<Song>(initialState)

  const dispatch = useDispatch();

  useEffect(() => {
    if(song){
        setFormData(song)
    }
  }, [song]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add form submission logic here
    // console.log("Form submitted:", formData)

    if(song){
        dispatch({type: "songs/updateSong", payload: {id: song._id, song: formData}})
        toast.success("Song updated successfully!", {
            position: "top-center",
            autoClose: 15000
          });
    }else{
        dispatch({type: "songs/addSong", payload: formData})
        toast.success("Song created successfully!", {
            position: "top-center",
            autoClose: 15000
          });
    }

    if(closeModal){
        closeModal();
    }

    

  }

  return (
    <>
    <h1>{title}</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="artist">Artist</label>
          <input
            type="text"
            id="artist"
            name="artist"
            placeholder="Enter Artist"
            value={formData.artist}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Album</label>
          <input
            type="album"
            id="album"
            name="album"
            placeholder="Enter album"
            value={formData.album}
            onChange={handleChange}
            required
          />

          <label htmlFor="gener">Gener</label>
          <input
            type="gener"
            id="gener"
            name="gener"
            placeholder="Enter gener"
            value={formData.gener}
            onChange={handleChange}
            required
          />

          <button type="submit">{song ? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  )
}

export default SongForm
