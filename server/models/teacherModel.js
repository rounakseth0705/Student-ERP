import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, unique: true },
    teacherId: { type: String, required: true, unique: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "course", required: true },
    employeeId: { type: String, required: true, unique: true }
});

const Teacher = mongoose.model("teacher", teacherSchema);

export default Teacher;