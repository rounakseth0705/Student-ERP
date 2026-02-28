import AssignmentUpload from "../models/assignmentUploadModel.js";
import Subject from "../models/subjectModel.js";
import { cloudinaryDownloadUrl, deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinaryUtils.js";

export const uploadAssignment = async (req,res) => {
    let assignmentUploadPublicId = null;
    try {
        console.log(req.body);
        console.log(req?.file);
        const { subjectId, assignmentId } = req.body;
        const assignmentUploadFile = req?.file;
        const studentId = req?.studentId;
        if (!subjectId || !assignmentId || !assignmentUploadFile || !studentId) {
            return res.json({ success: false, message: "Something went wrong!" });
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
        await AssignmentUpload.create({ studentId, subjectId: subject._id, semester: subject.semester, courseId: subject.courseId, assignmentId, assignmentUploadUrl: result.secure_url, assignmentUploadDownloadUrl });
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
        const assignmentUploads = await AssignmentUpload.find({ assignmentId }).populate("studentId","name rollNo");
        if (!assignmentUploads) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        return res.json({ success: true, assignmentUploads, message: "List of assignment uploads" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}