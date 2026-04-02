import express from "express";
import connectDB from "./db.js";
import userRoutes from "./routes/userRoutes.js"
import noteRoutes from "./routes/noteRoutes.js"
import profileRoutes from "./routes/profileRoutes.js";
import cors from "cors"


const app = express()
app.use(cors())
app.use(express.json())
connectDB()


app.use("/user", userRoutes)
app.use("/note", noteRoutes)
app.use("/profile", profileRoutes)

app.listen(8000, console.log("server started!"))