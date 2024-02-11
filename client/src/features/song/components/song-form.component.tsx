import { useEffect, useState } from "react"
import { Song } from "../../../models/song.model"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import emotionStyled from "@emotion/styled"

interface SongFormProps {
  title: string
  song?: Song

  openModal?: () => void
  closeModal?: () => void
  fetchAll: () => void
}

// const FormContainer = emotionStyled.div
const Form = emotionStyled.form({
  display: "flex",
  flexDirection: "column",
})

const Label = emotionStyled.label({
  fontSize: "1.4rem",
  marginBottom: ".5rem",
  textAlign: "start",
})

const Input = emotionStyled.input({
  padding: "1rem",
  marginBottom: "1.5rem",
  border: "1px solid #ccc",
  borderRadius: ".4rem",
})

const Button = emotionStyled.button({
  backgroundColor: '#3498db',
  color: '#fff',
  padding: '1rem',
  border: 'none',
  borderRadius: '.4rem',
  cursor: 'pointer',
  fontSize: '1.6rem',
  transition: 'background-color 0.3s',

  '&:hover': {
    backgroundColor: '#217dbb', // Change the color on hover if needed
  },
})
const SongForm: React.FC<SongFormProps> = ({
  title,
  song,
  openModal,
  closeModal,
  fetchAll
}) => {
  const initialState: Song = {
    title: "",
    artist: "",
    album: "",
    genre: "",
  }
  const [formData, setFormData] = useState<Song>(initialState)

  const dispatch = useDispatch()

  useEffect(() => {
    if (song) {
      setFormData(song)
    }
  }, [song])

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

    if (song) {
      dispatch({
        type: "songs/updateSong",
        payload: { id: song._id, song: formData },
      })
      
    } else {
      dispatch({ type: "songs/addSong", payload: formData })
     
    }

    fetchAll();
    if (closeModal) {
      closeModal()
    }
  }

  return (
    <>
      <h1>{title}</h1>
      <div>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <Label htmlFor="artist">Artist</Label>
          <Input
            type="text"
            id="artist"
            name="artist"
            placeholder="Enter Artist"
            value={formData.artist}
            onChange={handleChange}
            required
          />

          <Label htmlFor="email">Album</Label>
          <Input
            type="album"
            id="album"
            name="album"
            placeholder="Enter album"
            value={formData.album}
            onChange={handleChange}
            required
          />

          <Label htmlFor="genre">Genre</Label>
          <Input
            type="genre"
            id="genre"
            name="genre"
            placeholder="Enter genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />

          <Button type="submit">{song ? "Update" : "Submit"}</Button>
        </Form>
      </div>
    </>
  )
}

export default SongForm
