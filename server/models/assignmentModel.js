import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    assignmentName: { type: String, required: true },
    assignmentSubjectId: { type: mongoose.Schema.Types.ObjectId, ref: "subject", required: true },
    assignmentCourseId: { type: mongoose.Schema.Types.ObjectId, ref: "course", required: true  },
    semester: { type: Number, required: true },
    assignmentId: { type: String, required: true, unique: true },
    assignmentCreaterId: { type: String, required: true },
    assignmentUploadDate: { type: Date, required: true },
    assignmentSubmitDate: { type: Date, required: true },
    assignmentUrl: { type: String, required: true }
});

const Assignment = mongoose.model("assignment", assignmentSchema);

export default Assignment;