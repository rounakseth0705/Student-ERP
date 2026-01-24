import Course from "../models/courseModel.js";
import Subject from "../models/subjectModel.js";

export const createSubject = async (req,res) => {
    try {
        const { courseCode, subjectName, subjectCode, semester } = req.body;
        if (!courseCode || !subjectName || !subjectCode || !semester) {
            return res.json({ success: false, message: "Missing details" });
        }
        if (!subjectCode?.split("-")[1]?.startsWith(semester)) {
            return res.json({ success: false, message: "Invalid subject code" });
        }
        if (subjectCode?.split("-")[0] !== courseCode?.split("-")[0]) {
            return res.json({ success: false, message: "Invalid subject code" });
        }
        const course = await Course.findOne({ courseCode });
        if (!course) {
            return res.json({ success: false, message: "Invalid course code" });
        }
        const courseId = course._id;
        const isSubjectExists = await Subject.findOne({ courseId, $or: [{ subjectCode },{ subjectName }] });
        if (isSubjectExists) {
            if (isSubjectExists.subjectName === subjectName) {
                return res.json({ success: false, message: "Subject already exists" });
            }
            return res.json({ success: false, message: "Subject code already exists" });
        }
        await Subject.create({ courseId, subjectName, subjectCode, semester });
        return res.json({ success: true, message: `Subject created in ${course.courseName}` });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const deleteSubject = async (req,res) => {
    try {
        const { courseCode, subjectName, subjectCode } = req.body;
        if (!courseCode || !subjectName || !subjectCode) {
            return res.json({ success: false, message: "Missing details" });
        }
        const course = await Course.findOne({ courseCode });
        if (!course) {
            return res.json({ success: false, message: "Invalid course code" });
        }
        const result = await Subject.deleteOne({ courseId: course._id, subjectName, subjectCode });
        if (result.deletedCount !== 1) {
            return res.json({ success: false, message: "Invalid course or subject" });
        }
        return res.json({ success: true, message: "Subject deleted" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getSubjects = async (req,res) => {
    try {
        const subjects = await Subject.find();
        return res.json({ success: true, subjects, message: "List of all subjects" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}