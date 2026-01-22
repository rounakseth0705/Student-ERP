import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique },
    teacherId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
});