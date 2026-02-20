import Assignment from "../models/assignmentModel.js";
import Subject from "../models/subjectModel.js";
import { nanoid } from "nanoid";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinaryUtils.js";

export const createAssignment = async (req,res) => {
    try {
        const { assignmentName, assignmentSubjectCode, assignmentSubmitDate } = req.body;
        const assignmentFile = req.file;
        const assignmentCreaterId = req?.teacherId;
        if (!assignmentName || !assignmentSubjectCode || !assignmentSubmitDate || !assignmentFile || !assignmentCreaterId) {
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
        const assignment = await Assignment.create({ assignmentName, assignmentSubjectId: subject._id, assignmentCourseId: subject.courseId, semester: subject.semester, assignmentId, assignmentCreaterId, assignmentSubmitDate, assignmentUrl: result.secure_url, assignmentPublicId: result.public_id });
        if (!assignment) {
            await deleteFromCloudinary(result.public_id);
        }
        return res.json({ success: true, message: "Assignment successfully uploaded" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const updateAssignmentName = async (req,res) => {
    try {
        const { assignmentId, assignmentUpdatedName } = req.body;
        if (!assignmentId || !assignmentUpdatedName) {
            return res.json({ success: false, message: "Missing details" });
        }
        const assignment = await Assignment.findByIdAndUpdate(assignmentId, { assignmentName: assignmentUpdatedName },{ new: true });
        if (!assignment) {
            return res.json({ success: false, message: "Sommething went wrong!" });
        }
        return res.json({ success: true, message: "Assignment name updated" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const updateAssignmentDate = async (req,res) => {
    try {
        const { assignmentId, assignmentUpdatedSubmitDate } = req.body;
        if (!assignmentId || !assignmentUpdatedSubmitDate) {
            return res.json({ success: false, message: "Missing details" });
        }
        const assignment = await Assignment.findByIdAndUpdate(assignmentId, { assignmentSubmitDate: assignmentUpdatedSubmitDate },{ new: true });
        if (!assignment) {
            return res.json({ success: false, message: "Something went wrong" });
        }
        return res.json({ success: true, message: "Assignment date updated" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getSubjectAssignmentsForTeacher = async (req,res) => {
    try {
        const teacherId = req?.teacherId;
        const { courseId, subjectId } = req.params;
        if (!teacherId || !courseId || !subjectId) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        const assignments = await Assignment.find({ assignmentSubjectId: subjectId, assignmentCourseId: courseId, assignmentCreaterId: teacherId });
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
        const { assignmentId } = req.params;
        const deletedAssignment = await Assignment.findByIdAndDelete(assignmentId);
        if (!deletedAssignment) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        const response = await deleteFromCloudinary(deleteAssignment.assignmentPublicId);
        if (response.result !== "ok") {
            console.log("It was deleted");
            return res.json({ success: false, message: "Something went wrong!" });
        }
        return res.json({ success: true, message: "Assignment deleted" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

// export const downloadAssignment = async (req,res) => {
//     try {
//         const { courseId, subjectId } = req.params;
//         if (!courseId || !subjectId) {
//             return res.json({ success: false, message: "Something went wrong!" });
//         }
//         const assignments = await Assignment.find({ assignmentSubjectId: subjectId, assignmentCourseId: courseId });
//         if (!assignments) {
//             return res.json({ success: false, message: "Something went wrong!" });
//         }
//         let downloadUrls = [];
//         for (let assignment=0; assignment<assignments.length; assignment++) {
//             downloadUrls.push(cloudinaryDownloadUrl(assignment.assignmentPublicId));
//         }
//         return res.json({ success: true, downloadUrls, message: "Assignment download" });
//     } catch(error) {
//         console.log(error.message);
//         return res.json({ success: false, message: error.message });
//     }
// }