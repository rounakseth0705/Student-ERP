import AssignmentUpload from "../models/assignmentUploadModel.js";
import Subject from "../models/subjectModel.js";
import { cloudinaryDownloadUrl, deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinaryUtils.js";

export const uploadAssignment = async (req,res) => {
    let assignmentUploadPublicId = null;
    try {
        const { subjectId, assignmentId } = req.body;
        const assignmentUploadFile = req?.file;
        const studentId = req?.studentId;
        if (!subjectId || !assignmentId || !assignmentUploadFile || !studentId) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        const existingAssignmentUplaod = await AssignmentUpload.findOne({ studentId, assignmentId });
        if (existingAssignmentUplaod) {
            const result = await uploadToCloudinary(assignmentUploadFile.buffer, "assignmentUpload", "student");
            if (!result || !result.public_id) {
                return res.json({ success: false, message: "Something went wrong!" });
            }
            await deleteFromCloudinary(existingAssignmentUplaod.assignmentUploadPublicId);
            existingAssignmentUplaod.assignmentUploadUrl = result.secure_url;
            existingAssignmentUplaod.assignmentUploadPublicId = result.public_id;
            existingAssignmentUplaod.assignmentUploadDownloadUrl = cloudinaryDownloadUrl(result.public_id);
            await existingAssignmentUplaod.save();
            return res.json({ success: true, message: "Assignment file updated" });
        }
        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        const result = await uploadToCloudinary(assignmentUploadFile.buffer, "assignmentUpload", "student");
        if (!result || !result.public_id) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        assignmentUploadPublicId = result.public_id;
        const assignmentUploadDownloadUrl = cloudinaryDownloadUrl(assignmentUploadPublicId);
        await AssignmentUpload.create({ studentId, subjectId: subject._id, semester: subject.semester, courseId: subject.courseId, assignmentId, assignmentUploadUrl: result.secure_url, assignmentUploadPublicId, assignmentUploadDownloadUrl });
        return res.json({ success: true, message: "Assignment successfully uploaded" });
    } catch(error) {
        if (assignmentUploadPublicId) {
            await deleteFromCloudinary(assignmentUploadPublicId);
        }
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getSubjectAssignmentUploads = async (req,res) => {
    try {
        const { assignmentId } = req.params;
        if (!assignmentId) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        const assignmentUploads = await AssignmentUpload.find({ assignmentId }).populate({ path: "studentId", select: "rollNo userId createdAt", populate: { path: "userId", select: "name" } });
        if (!assignmentUploads) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        return res.json({ success: true, assignmentUploads, message: "List of assignment uploads" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getAssignmentUploadsForStudent = async (req,res) => {
    try {
        const { subjectId } = req.params;
        const studentId = req?.studentId;
        if (!subjectId || !studentId) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        const assignmentUploads = await AssignmentUpload.find({ studentId, subjectId });
        if (!assignmentUploads) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        return res.json({ success: true, assignmentUploads, message: "List of assignment uploads" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}