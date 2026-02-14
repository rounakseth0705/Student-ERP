import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, unique: true },
    studentId: { type: String, required: true, unique: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "course", required: true },
    rollNo: { type: String, required: true, unique: true },
    semester: { type: Number, required: true, default: 1 },
    attendence: { type: Number, required: true, default: 0 }
});

const Student = mongoose.model("student", studentSchema);

export default Student;