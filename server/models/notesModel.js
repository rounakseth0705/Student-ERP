import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    notesName: { type: String, required: true },
    notesSubjectId: { type: mongoose.Schema.Types.ObjectId, ref: "subject", required: true },
    notesCourseId: { type: mongoose.Schema.Types.ObjectId, ref: "course", required: true },
    semester: { type: Number, required: true },
    notesId: { type: String, required: true, unique: true },
    notesProviderId: { type: String, required: true },
    notesUrl: { type: String, required: true }
},{ timestamps: true });

const Notes = mongoose.model("notes", notesSchema);

export default Notes;