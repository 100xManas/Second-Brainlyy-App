import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
})

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String },
    link: { type: String },
    imageUrl: { type: String },
    type: { type: String, enum: ['tweet', 'image', 'video', 'article', "docs", "link"], required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag", }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true })

const linkSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    noteId: { type: mongoose.Schema.Types.ObjectId, ref: "Note", required: true },
    url: String,
})

const tagSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
})

export const userModel = mongoose.model("User", userSchema)
export const noteModel = mongoose.model("Note", noteSchema)
export const linkModel = mongoose.model("Link", linkSchema)
export const tagModel = mongoose.model("Tag", tagSchema)
