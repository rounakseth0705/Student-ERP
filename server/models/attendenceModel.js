import mongoose from "mongoose";

const attendenceSchema = new mongoose.Schema({
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "teacher", required: true },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "subject", required: true },
    classTime: { type: String, required: true },
    studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "student", required: true }]
},{ timestamps: true });

const Attendence = mongoose.model("attendence",attendenceSchema);

export default Attendence;