import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    day: { type: String, enum: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], required: true },
    time: { type: String, required: true }
},{ _id: false });

const subjectSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "course", required: true },
    subjectName: { type: String, required: true },
    subjectCode: { type: String, required: true },
    semester: { type: Number, required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "teacher", required: true },
    schedule: { type: [scheduleSchema], required: false, default: undefined }
});

subjectSchema.index({ courseId: 1, subjectCode: 1 }, { unique: true });

const Subject = mongoose.models.subject || mongoose.model("subject", subjectSchema);

export default Subject;