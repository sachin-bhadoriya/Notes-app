import Note from "../model/Note.js"

export const createNote = async (req, res) => {
    try {
        const note = await Note.create({ user: req.user, ...req.body })
        res.json(note).status(201)
    } catch (error) {
        res.json(error.message)
    }
}

export const updateNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate({ _id: req.params.id, user: req.user }, req.body, { new: true })
        res.json(note).status(201)
    } catch (error) {
        res.json(error.message)
    }
}

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user })
        res.json(notes.reverse()).status(201)
    } catch (error) {
        res.json(error.message)
    }
}

export const getNote = async (req, res) => {
    try {
        const note = await Note.findById({ _id: req.params.id, user: req.user })
        res.json(note).status(201)
    } catch (error) {
        res.json(error.message)
    }
}

export const deleteById = async (req, res) => {
    try {
        await Note.findByIdAndDelete({ _id: req.params.id, user: req.user })
        res.json({ message: "Note Deleted Successfully!" }).status(201)
    } catch (error) {
        res.json(error.message)
    }
}
