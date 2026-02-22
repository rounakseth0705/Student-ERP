import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, unique: true },
    studentId: { type: String, required: true, unique: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "course", required: true },
    rollNo: { type: String, required: true, unique: true },
    attendence: { type: Number, required: true, default: 0 }
},{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

studentSchema.virtual("semester").get(function () {
    const now = new Date();
    const monthsDiff = (now.getFullYear() - this.createdAt.getFullYear()) * 12 + (now.getMonth() - this.createdAt.getMonth());
    return Math.floor(monthsDiff / 6) + 1;
});

const Student = mongoose.model("student", studentSchema);

export default Student;