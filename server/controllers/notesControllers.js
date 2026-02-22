import Notes from "../models/notesModel.js";
import Subject from "../models/subjectModel.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinaryUtils.js";

export const createNotes = async (req,res) => {
    let notesPublicId = null;
    try {
        const { notesName, notesSubjectId } = req.body;
        const notesFile = req?.file;
        const notesProviderId = req?.teacherId;
        if (!notesName || !notesSubjectId) {
            return res.json({ success: false, message: "Details missing" });
        }
        const subject = await Subject.findById(notesSubjectId);
        if (!subject) {
            return res.json({ success: false, message: "Invalid subject code" });
        }
        const result = await uploadToCloudinary(notesFile.buffer, "notes", "teacher");
        if (!result || !result.public_id) {
            return res.json({ success: false, message: "Notes upload failed!" });
        }
        notesPublicId = result.public_id;
        await Notes.create({ notesName, notesSubjectId: subject._id, notesCourseId: subject.courseId, semester: subject.semester, notesProviderId, notesUrl: result.secure_url, notesPublicId });
        return res.json({ success: true, message: "Notes successfully uploaded" });
    } catch(error) {
        if (notesPublicId) {
            await deleteFromCloudinary(notesPublicId);
        }
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getSubjectNotesForTeacher = async (req,res) => {
    try {
        const teacherId = req?.teacherId;
        const { courseId, subjectId } = req.params;
        if (!courseId || !subjectId || !teacherId) {
            return res.json({ success: false, message: "Details missing" });
        }
        const notes = await Notes.find({ notesCourseId: courseId, notesSubjectId: subjectId, notesProviderId: teacherId });
        return res.json({ success: true, notes, message: "List of notes" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const deleteNotes = async (req,res) => {
    try {
        const { notesId } = req.params;
        if (!notesId) {
            return res.json({ success: false, message: "Details missing" });
        }
        const notes = await Notes.findById(notesId);
        if (!notes) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        const response = await deleteFromCloudinary(notes.notesPublicId);
        if (response.result !== "ok") {
            return res.json({ success: false, message: "Can't delete it!" });
        }
        await notes.deleteOne();
        return res.json({ success: true, message: "Notes successfully deleted" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}