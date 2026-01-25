import Course from "../models/courseModel.js";
import Subject from "../models/subjectModel.js";
import Teacher from "../models/teacherModel.js";

export const createSubject = async (req,res) => {
    try {
        const { courseCode, subjectName, subjectCode, semester, teacherId } = req.body;
        if (!courseCode || !subjectName || !subjectCode || !semester || !teacherId) {
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
        if (semester > course.semesters) {
            return res.json({ success: false, message: "Invalid semester" });
        }
        const teacher = await Teacher.findOne({ teacherId });
        if (!teacher) {
            return res.json({ success: false, message: "Invalid teacher id" });
        }
        const courseId = course._id;
        const isSubjectExists = await Subject.findOne({ courseId, teacherId: teacher._id, $or: [{ subjectCode },{ subjectName }] });
        if (isSubjectExists) {
            if (isSubjectExists.subjectName === subjectName) {
                return res.json({ success: false, message: "Subject already exists" });
            }
            return res.json({ success: false, message: "Subject code already exists" });
        }
        await Subject.create({ courseId, subjectName, subjectCode, semester, teacherId: teacher._id });
        return res.json({ success: true, message: `Subject created in ${course.courseName}` });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const changeSubjectTeacher = async (req,res) => {
    try {
        const { subjectCode, teacherId, newTeacherId } = req.body;
        if (!subjectCode || !teacherId || !newTeacherId) {
            return res.json({ success: false, message: "Missing details" });
        }
        const newTeacher = await Teacher.findOne({ teacherId: newTeacherId });
        if (!newTeacher) {
            return res.json({ success: false, message: "Invalid teacher id" });
        }
        const teacher = await Teacher.findOne({ teacherId });
        const updatedSubject = await Subject.findOneAndUpdate({ subjectCode, teacherId: teacher._id },{ teacherId: newTeacher._id },{ new: true });
        if (!updatedSubject) {
            return res.json({ success: false, message: "Invalid details" });
        }
        return res.json({ success: true, message: "Subject teacher updated" });
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