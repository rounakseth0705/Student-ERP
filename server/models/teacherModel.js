import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique },
    teacherId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    employeeId: { type: String, required: true, unique: true }
});

const Teacher = mongoose.model("teacher", teacherSchema);

export default Teacher;