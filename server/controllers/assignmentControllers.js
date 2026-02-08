import Assignment from "../models/assignmentModel.js";
import Subject from "../models/subjectModel.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";
import { nanoid } from "nanoid";

export const createAssignment = async (req,res) => {
    try {
        const { assignmentName, assignmentSubjectCode, assignmentSubmitDate } = req.body;
        const assignmentFile = req.file;
        const assignmentCreaterId = req?.teacherId;
        if (!assignmentName || !assignmentSubjectCode || !assignmentSubmitDate || !assignmentFile) {
            return res.json({ success: false, message: "Missing details" });
        }
        const assignmentId = nanoid(8);
        const existingAssignment = await Assignment.findOne({ assignmentId });
        if (existingAssignment) {
            return res.json({ success: false, message: "Assignment Id already exists" });
        }
        const subject = await Subject.findOne({ subjectCode: assignmentSubjectCode });
        if (!subject) { 
            return res.json({ success: false, message: "Invalid subject Code" });
        }
        const result = await uploadToCloudinary(assignmentFile.buffer, "assignment", "teacher");
        const assignmentUploadDate = new Date().toDateString();
        await Assignment.create({ assignmentName, assignmentSubjectId: subject._id, assignmentCourseId: subject.courseId, semester: subject.semester, assignmentId, assignmentCreaterId, assignmentUploadDate, assignmentSubmitDate, assignmentUrl: result.secure_url });
        return res.json({ success: true, message: "Assignment successfully uploaded" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: `Assignment api, ${error.message}` });
    }
}

export const updateAssignmentDate = async (req,res) => {
    try {
        const { assignmentId, assignmentUpdatedUploadDate } = req.body;
        const assignmentcreaterId = req.user.userId;
        if (!assignmentId || !assignmentUpdatedUploadDate || !assignmentcreaterId) {
            return res.json({ success: false, message: "Missing details" });
        }
        const assignment = await Assignment.findOneAndUpdate({ assignmentId, assignmentcreaterId },{ assignmentSubmitDate: assignmentUpdatedUploadDate },{ new: true });
        if (!assignment) {
            return res.json({ success: false, message: "Something went wrong" });
        }
        return res.json({ success: true, message: "Assignment date updated" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getAssignmentsForTeacher = async (req,res) => {
    try {
        const { teacherId } = req.user;
        const assignments = await Assignment.find({ assignmentCreaterId: teacherId });
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