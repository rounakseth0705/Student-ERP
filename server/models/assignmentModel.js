import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    assignmentName: { type: String, required: true, unique: true },
    assignmentSubjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
    assignmentCourseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true  },
    semester: { type: Number, required: true },
    assignmentId: { type: String, required: true, unique: true },
    assignmentcreaterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignmentUploadDate: { type: Date, required: true },
    assignmentSubmitDate: { type: Date, required: true },
    assignmentUrl: { type: String, required: true }
});

const Assignment = mongoose.model("assignment", assignmentSchema);

export default Assignment;