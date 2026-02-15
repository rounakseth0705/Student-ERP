import mongoose from "mongoose";

const assignmentUploadSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "student", required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "subject", required: true },
    semester: { type: Number, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "course", required: true },
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "assignment", required: true },
    assignmentUploadUrl: { type: String, required: true }
});

const AssignmentUpload = mongoose.Model("assignmentUpload", assignmentUploadSchema);

export default AssignmentUpload;