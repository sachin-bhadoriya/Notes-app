import express from "express";
import { login, signup, allUser } from "../controllers/userController.js";

const router = express.Router()

// router.get("/", allUser)
router.post("/signup", signup)
router.post("/login", login)


export default router