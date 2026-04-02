import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrZ4K6iGL2LmiK9pBrdk4Njg-YKPL-xXjtOQ&s"
        }
    },
    { timestamps: true }
)

const Note = mongoose.model("Note", NoteSchema);

export default Note