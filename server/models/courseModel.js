import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseName: { type: String, enum: ["BTECH","MTECH","BSC","MSC","BCA","MCA","BBA","MBA","BJMC","MJMC"], required: true, unique: true },
    courseCode: { type: String, required: true, unique: true },
    duration: { type: Number, required: true },
    semesters: { type: Number, required: true }
});

const Course = mongoose.models.course || mongoose.model("course", courseSchema);

export default Course;