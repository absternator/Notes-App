// This is the mongoose model(collection for notes)
const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "NEED TITLE"],
        unique: [true, "NEED To be unique"]
    },
    content: {
        type: String,
        required: [true,"NEED BODY"]
    }
},{
    timestamps: true,
});
const Note = mongoose.model("Note",notesSchema);
module.exports = Note;