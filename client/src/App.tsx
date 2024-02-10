import { SongPage } from "./features/song/pages/song-page"

import "./App.css"
import 'react-confirm-alert/src/react-confirm-alert.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from "react-toastify"
const App = () => {
  return (
    <div className="App">

    <ToastContainer />
    <SongPage />
  
    </div>
   
  )
}

export default App
