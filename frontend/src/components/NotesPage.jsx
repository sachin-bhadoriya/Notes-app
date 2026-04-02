import React, { useEffect, useState } from 'react'
import Note from './Note'
import Table from './Table'
import API from './api'
import Navbar from './Navbar'

const NotesPage = () => {

    const [notess, setNotess] = useState([])
    const [editNote, setEditNote] = useState(null)

    const getNotes = async () => {
        const res = await API.get("/note")
        setNotess(res.data)
    }

    useEffect(() => {
        getNotes()
    }, [])

    return (
        <>
            <Navbar />
            <Note getNotes={getNotes} editNote={editNote} setEditNote={setEditNote} />
            <Table notess={notess} getNotes={getNotes} setEditNote={setEditNote} />
        </>
    )
}

export default NotesPage