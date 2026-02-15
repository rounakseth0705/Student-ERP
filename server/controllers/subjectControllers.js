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
        const isSubjectExists = await Subject.findOne({ courseId, $or: [{ subjectCode },{ subjectName }] });
        if (isSubjectExists) {
            if (isSubjectExists.subjectName === subjectName) {
                return res.json({ success: false, message: "Subject already exists" });
            }
            return res.json({ success: false, message: "Subject code already exists" });
        }
        const subject = await Subject.create({ courseId, subjectName, subjectCode, semester, teacherId: teacher._id });
        return res.json({ success: true, subject, message: `Subject created in ${course.courseName}` });
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
        return res.json({ success: true, updatedSubject, message: "Subject teacher updated" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const deleteSubject = async (req,res) => {
    try {
        const { subjectId } = req.params;
        if (!subjectId) {
            return res.json({ success: false, message: "Missing details" });
        }
        const result = await Subject.findByIdAndDelete(subjectId);
        if (!result) {
            return res.json({ success: false, message: "Invalid subject id" });
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

export const fetchSubjectsByCourseId = async (req,res) => {
    try {
        const { courseId } = req.params;
        if (!courseId) {
            return res.json({ success: false, message: "Missing details" });
        }
        const subjects = await Subject.find({ courseId }).select("-courseId").populate({ path: "teacherId", select: "teacherId", populate: { path: "userId", select: "name" } });
        return res.json({ success: true, subjects, message: "List of subjects" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const scheduleClass = async (req,res) => {
    try {
        const { subjectName, subjectCode, courseId, semester, day, classTime } = req.body;
        if (!subjectName || !subjectCode || !courseId || !semester || !day || !classTime) {
            return res.json({ success: false, message: "Missing details" });
        }
        const subject = await Subject.findOne({ subjectName, subjectCode, courseId, semester });
        if (!subject) {
            return res.json({ success: false, message: "Invalid details" });
        }
        const isDayAndTimeExists = subject.schedule?.some(item => item.day === day);
        if (isDayAndTimeExists) {
            return res.json({ success: false, message: "Schedule already exists" });
        }
        if (!subject.schedule) {
            subject.schedule = [{ day, classTime }];
        } else {
            subject.schedule.push({ day, classTime });
        }
        await subject.save();
        return res.json({ success: true, message: "Subject scheduled" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const updateSchedule = async (req,res) => {
    try {
        const { subjectName, subjectCode, courseId, semester, day, classTime } = req.body;
        if (!subjectName || !subjectCode || !courseId || !semester || !day || !classTime) {
            return res.json({ success: false, message: "Missing details" });
        }
        const subject = await Subject.findOne({ subjectName, subjectCode, courseId, semester });
        if (!subject) {
            return res.json({ success: false, message: "Invalid details" });
        }
        if (!subject.schedule) {
            return res.json({ success: false, message: "Subject not scheduled yet" });
        }
        
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getSubjectsForTeacher = async (req,res) => {
    try {
        const { teacherId } = req.params;
        if (!teacherId) {
            return res.json({ success: false, message: "Missing details" });
        }
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.json({ success: false, message: "Teacher not found" });
        }
        const subjects = await Subject.find({ teacherId }).select("-schedule");
        return res.json({ success: true, subjects, message: "Your subject list" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}