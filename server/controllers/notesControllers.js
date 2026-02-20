import Notes from "../models/notesModel.js";
import Subject from "../models/subjectModel.js";
import { uploadToCloudinary } from "../utils/cloudinaryUtils.js";

export const createNotes = async (req,res) => {
    try {
        const { notesName, notesSubjectCode } = req.body;
        const notesFile = req?.file;
        const notesProviderId = req?.teacherId;
        if (!notesName || !notesSubjectCode) {
            return res.json({ success: false, message: "Missing details" });
        }
        const subject = await Subject.findOne({ subjectCode: notesSubjectCode });
        if (!subject) {
            return res.json({ success: false, message: "Invalid subject code" });
        }
        const result = await uploadToCloudinary(notesFile.buffer, "notes", "teacher");
        await Notes.create({ notesName, notesSubjectId: subject._id, notesCourseId: subject.courseId, semester: subject.semester, notesProviderId, notesUrl: result.secure_url, notesPublicId: result.public_id });
        return res.json({ success: true, message: "Notes successfully uploaded" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getSubjectNotesForTeacher = async (req,res) => {
    try {
        const teacherId = req?.teacherId;
        const { courseId, subjectId } = req.params;
        if (!courseId || !subjectId || !teacherId) {
            return res.json({ success: false, message: "Missing details" });
        }
        const notes = await Notes.find({ notesCourseId: courseId, notesSubjectId: subjectId, notesProviderId: teacherId });
        return res.json({ success: true, notes, message: "List of notes" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}