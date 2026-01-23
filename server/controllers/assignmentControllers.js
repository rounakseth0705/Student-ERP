import Assignment from "../models/assignmentModel.js";
import Subject from "../models/subjectModel.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";

export const provideAssignment = async (req,res) => {
    try {
        const { assignmentName, assignmentSubjectId, assignmentCourseId, assignmentUploadDate, assignmentSubmitDate } = req.body;
        const { assignmentFile } = req.file;
        const assignmentProviderId = req.user.userId;
        if (!assignmentName || !assignmentSubjectId || !assignmentCourseId || !teacherId || assignmentUploadDate || !assignmentSubmitDate || !assignmentFile) {
            return res.json({ success: false, message: "Missing details" });
        }
        const assignmentId = String(Math.floor(100000 + Math.random() * 900000));
        const existingAssignment = await Assignment.findOne({ $or: [{ assignmentName },{ assignmentId }] });
        if (existingAssignment) {
            return res.json({ success: false, message: "Assignment name or Id already exists" });
        }
        const subject = await Subject.findById(assignmentSubjectId);
        if (!subject) {
            return res.json({ success: false, message: "Invalid subject id" });
        }
        const result = await uploadToCloudinary(assignmentFile.buffer, "assignment", "teacher");
        await Assignment.create({ assignmentName, assignmentSubjectId, assignmentCourseId, assignmentId, assignmentProviderId, assignmentUploadDate, assignmentSubmitDate, assignmentUrl: result.secure_url });
        return res.json({ success: true, message: "Assignment successfully uploaded" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const updateAssignmentDate = async (req,res) => {
    try {

    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}