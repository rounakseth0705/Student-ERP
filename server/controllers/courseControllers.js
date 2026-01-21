import Course from "../models/courseModel.js";

export const createCourse = async (req,res) => {
    try {
        let { courseName, courseCode, duration, semesters } = req.body;
        if (!courseName || !courseCode || !duration || !semesters) {
            return res.json({ success: false, message: "Missing details" });
        }
        courseName = courseName?.toUpperCase();
        const isExists = await Course.findOne({ courseName });
        if (isExists) {
            return res.json({ success: false, message: "Course already exists" });
        }
        await Course.create({ courseName, courseCode, duration, semesters });
        return res.json({ success: true, message: "Course created" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const deleteCourse = async (req,res) => {
    try {
        const { courseCode } = req.body;
        if (!courseCode) {
            return res.json({ success: false, message: "Missing details" });
        }
        await Course.deleteOne({ courseCode });
        return res.json({ success: true, message: "Course deleted" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getCourse = async (req,res) => {
    try {
        const courses = await Course.find();
        return res.json({ success: true, courses, message: "List of all courses" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}