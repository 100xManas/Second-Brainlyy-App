"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagModel = exports.linkModel = exports.noteModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});
const noteSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    content: { type: String },
    link: { type: String },
    imageUrl: { type: String },
    type: { type: String, enum: ['tweet', 'image', 'video', 'article', "docs", "link"], required: true },
    tags: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Tag", }],
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
const linkSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    noteId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Note", required: true },
    url: String,
});
const tagSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true }
});
exports.userModel = mongoose_1.default.model("User", userSchema);
exports.noteModel = mongoose_1.default.model("Note", noteSchema);
exports.linkModel = mongoose_1.default.model("Link", linkSchema);
exports.tagModel = mongoose_1.default.model("Tag", tagSchema);
