import Course from "../models/courseModel.js";

export const createCourse = async (req,res) => {
    try {
        let { courseName, courseCode, duration } = req.body;
        if (!courseName || !courseCode || !duration) {
            return res.json({ success: false, message: "Missing details" });
        }
        courseName = courseName?.toUpperCase();
        if (courseCode?.split("-")[0] !== courseName) {
            return res.json({ success: false, message: "Invalid course code" });
        }
        const isExists = await Course.findOne({ $or: [{ courseName },{ courseCode }] });
        if (isExists) {
            return res.json({ success: false, message: "Course already exists" });
        }
        const course = await Course.create({ courseName, courseCode, duration, semesters: duration*2 });
        return res.json({ success: true, course, message: "Course created" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const deleteCourse = async (req,res) => {
    try {
        const { courseCode } = req.params;
        if (!courseCode) {
            return res.json({ success: false, message: "Missing details" });
        }
        const result = await Course.deleteOne({ courseCode });
        if (result.deletedCount !== 1) {
            return res.json({ success: false, message: "Something went wrong" });
        }
        return res.json({ success: true, message: "Course deleted" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getCourses = async (req,res) => {
    try {
        const courses = await Course.find();
        return res.json({ success: true, courses, message: "List of all courses" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}