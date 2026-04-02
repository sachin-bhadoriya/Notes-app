import { useState } from 'react'
import API from "./api"

const Table = ({ notess, getNotes, setEditNote }) => {
    const [asc, setAsc] = useState(true)
    const [search, setSearch] = useState("")
    const [isEditLoading, setIsEditLoading] = useState(false)
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)

    const sorting = () => {
        setAsc(!asc);
    };

    const filteredData = notess.filter((item) => (
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    ))

    const displayData = asc ? filteredData : [...filteredData].reverse()

    const deleteNote = async (id) => {
        setIsDeleteLoading(true)
        const confirmDelete = window.confirm("Are you want to delete this Note?")
        if (!confirmDelete) return
        await API.delete(`/note/${id}`)
        alert("Note Deleted Successfully!")
        getNotes()
        setIsDeleteLoading(false)
    }

    const editNote = (note) => {
        setIsEditLoading(true)
        setEditNote(note)
        console.log(note);
        setIsEditLoading(false)
    }




    return (
        <section>
            <div className="search" style={{ display: "flex", alignItems: "end", justifyContent: "end" }}>
                <input type="text" placeholder=' '
                    id='search'
                    name='search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                <label htmlFor="search">Search any Query...</label>
            </div>
            <table>
                <thead>
                    <tr>
                        <td onClick={sorting} className='center' style={{ cursor: "pointer" }}>
                            Sr. No. {asc ? "asc" : "dec"}
                        </td>
                        <td className='center'>Title</td>
                        <td className='center'>Description</td>
                        <td className='center'>Image</td>
                        <td className='center'>Action</td>
                    </tr>
                </thead>

                <tbody>
                    {displayData.length > 0 ?
                        (
                            displayData.map((note, index) => (
                                <tr key={note._id}>
                                    <td className='center' style={{ cursor: "pointer" }}>{index + 1}</td>
                                    <td className='center'>{note.title}</td>
                                    <td className=''>{note.description}</td>
                                    <td className='center' style={{ width: "100px", height: "100px", overflow: "hidden" }}>
                                        <img
                                            loading='lazy'
                                            src={note.image}
                                            alt={note.title}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                    </td>
                                    <td className='center actionBtns'>
                                        <button onClick={() => editNote(note)}>{isEditLoading ? "Loading" : "Edit"}</button>
                                        <button onClick={() => deleteNote(note._id)}>{isDeleteLoading ? "Loading" : "Delete"}</button>
                                    </td>
                                </tr>
                            ))
                        ) :
                        (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center' }}>No results found...</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </section>
    )
}

export default Table
