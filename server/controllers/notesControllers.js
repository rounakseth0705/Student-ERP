import Notes from "../models/notesModel.js";
import Subject from "../models/subjectModel.js";
import { nanoid } from "nanoid";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";

export const createNotes = async (req,res) => {
    try {
        const { notesName, notesSubjectCode } = req.body;
        const notesFile = req.file;
        const notesProviderId = req?.teacherId;
        if (!notesName || !notesSubjectCode) {
            return res.json({ success: false, message: "Missing details" });
        }
        const notesId = nanoid(8);
        const existingNotes = await Notes.findOne({ notesId });
        if (existingNotes) {
            return res.json({ success: false, message: "Notes Id already exists" });
        }
        const subject = await Subject.findOne({ subjectCode: notesSubjectCode });
        if (!subject) {
            return res.json({ success: false, message: "Invalid subject code" });
        }
        const result = await uploadToCloudinary(notesFile.buffer, "notes", "teacher");
        await Notes.create({ notesName, notesSubjectId: subject._id, notesCourseId: subject.courseId, semester: subject.semester, notesId, notesProviderId, notesUrl: result.secure_url });
        return res.json({ success: true, message: "Notes successfully uploaded" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getSubjectNotes = async (req,res) => {
    try {
        const { courseId, subjectId } = req.params;
        if (!courseId || !subjectId) {
            return res.json({ success: false, message: "Missing details" });
        }
        const subject = await Subject.findById(subjectId);
        if (!subject || subject.courseId !== courseId) {
            return res.json({ success: false, message: "Invalid details" });
        }
        const notes = await Notes.find({ notesCourseId: courseId, notesSubjectId: subjectId });
        return res.json({ success: true, notes, message: "List of notes" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}