import express from "express";

import { createNote, deleteById, getAllNotes, getNote, updateNote } from "../controllers/noteController.js";

import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", authMiddleware, createNote)
router.put("/:id", authMiddleware, updateNote)
router.get("/:id", authMiddleware, getNote)
router.get("/", authMiddleware, getAllNotes)
router.delete("/:id", authMiddleware, deleteById)

export default router