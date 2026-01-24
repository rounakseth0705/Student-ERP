import Assignment from "../models/assignmentModel.js";
import Subject from "../models/subjectModel.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";

export const createAssignment = async (req,res) => {
    try {
        const { assignmentName, assignmentSubjectId, assignmentCourseId, semester, assignmentUploadDate, assignmentSubmitDate } = req.body;
        const { assignmentFile } = req.file;
        const assignmentcreaterId = req.user.userId;
        if (!assignmentName || !assignmentSubjectId || !assignmentCourseId || !semester || !teacherId || assignmentUploadDate || !assignmentSubmitDate || !assignmentFile) {
            return res.json({ success: false, message: "Missing details" });
        }
        if (semester > assignmentCourseId.semesters) {
            return res.json({ success: false, message: "Invalid semester" });
        }
        const assignmentId = String(Math.floor(100000 + Math.random() * 900000));
        const existingAssignment = await Assignment.findOne({ assignmentId });
        if (existingAssignment) {
            return res.json({ success: false, message: "Assignment name or Id already exists" });
        }
        const subject = await Subject.findById(assignmentSubjectId);
        if (!subject) {
            return res.json({ success: false, message: "Invalid subject id" });
        }
        const result = await uploadToCloudinary(assignmentFile.buffer, "assignment", "teacher");
        await Assignment.create({ assignmentName, assignmentSubjectId, assignmentCourseId, semester, assignmentId, assignmentcreaterId, assignmentUploadDate, assignmentSubmitDate, assignmentUrl: result.secure_url });
        return res.json({ success: true, message: "Assignment successfully uploaded" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const updateAssignmentDate = async (req,res) => {
    try {
        const { assignmentId, assignmentUpdatedUploadDate } = req.body;
        const assignmentProviderId = req.user.userId;
        if (!assignmentId || !assignmentUpdatedUploadDate || !assignmentProviderId) {
            return res.json({ success: false, message: "Missing details" });
        }
        const assignment = await Assignment.findOne({ assignmentId, assignmentProviderId });
        if (!assignment) {
            return res.json({ success: false, message: "Something went wrong" });
        }
        assignment.assignmentUploadDate = assignmentUpdatedUploadDate;
        await assignment.save();
        return res.json({ success: true, message: "Assignment date updated" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getAssignmentsForTeacher = async (req,res) => {
    try {
        const { teacherId } = req.user;
        const assignments = await Assignment.find({ assignmentProviderId: teacherId });
        return res.json({ success: true, assignments, message: "List of all assignments" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getAssignmetsForStudent = async (req,res) => {
    try {
        const { courseId, semester } = req.user;
        const assignments = await Assignment.find({ courseId, semester });
        return res.json({ success: true, assignments, message: "List of all assignments" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getAssignmentsForAdmin = async (req,res) => {
    try {
        const assignments = await Assignment.find();
        return res.json({ success: true, assignments, message: "List of all assignments" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const deleteAssignment = async (req,res) => {
    try {
        const { assignmentId } = req.body;
        const result = await Assignment.deleteOne({ assignmentId });
        return res.json({ success: true, message: "Assignment deleted" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}