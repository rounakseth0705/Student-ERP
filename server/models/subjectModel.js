import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "course", required: true },
    subjectName: { type: String, required: true },
    subjectCode: { type: String, required: true },
    semester: { type: Number, required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "teacher", required: true }
});

subjectSchema.index({ courseId: 1, subjectCode: 1 }, { unique: true });

const Subject = mongoose.models.subject || mongoose.model("subject", subjectSchema);

export default Subject;