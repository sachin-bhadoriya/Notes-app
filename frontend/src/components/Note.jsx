import { useEffect, useState } from "react"
import API from "./api.jsx"

const Note = ({ getNotes, setEditNote, editNote }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (editNote) {
        
        await API.put(`/note/${editNote._id}`, {
          title,
          description,
          imageUrl
        })

        setEditNote(null)
        
      } else {
        await API.post("/note/", {
          title,
          description,
          imageUrl
        })
      }
      getNotes()
      setTitle("")
      setDescription("")
      setImageUrl("")
      setIsLoading(false)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title)
      setDescription(editNote.description)
      setImageUrl(editNote.imageUrl)
    }
  }, [editNote])

  return (
    <div className="note-container">
      <form method="post" onSubmit={handleSubmit}>
        <div className="title">
          <label htmlFor="title">Title</label>
          <input type="text" id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="description">
          <label htmlFor="description">Description</label>
          <input type="text" id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="image">
          <label htmlFor="image">Image</label>
          <input type="file" id='image' onChange={(e) => setImageUrl(e.target.value)} />
        </div>
        <div className="button">
          {isLoading ? <button>Loading</button> : <button type="submit">{editNote ? "Update Note" : "Add Note"}</button>}

        </div>
      </form>
    </div>
  )
}

export default Note