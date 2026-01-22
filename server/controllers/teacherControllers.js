import Course from "../models/courseModel.js";
import Teacher from "../models/teacherModel.js";
import User from "../models/userModel.js";

export const createTeacher = async (req,res) => {
    try {
        const { userId, name, courseCode, employeeId } = req.body;
        if (!userId || !name || !courseCode || !employeeId) {
            return res.json({ success: false, message: "Missing details" });
        }
        const isUser = await User.findById(userId);
        if (!isUser || isUser.name !== name) {
            return res.json({ success: false, message: "Invalid user id or name" });
        }
        const course = await Course.findOne({ courseCode });
        if (!course) {
            return res.json({ success: false, message: "Invalid course code" });
        }
        const courseId = course._id;
        const teacherId = String(Math.floor(1000000 + Math.random() * 9000000));
        const existingTeacher = await Teacher.findOne({ $or: [{ userId },{ teacherId },{ employeeId }] });
        if (existingTeacher) {
            return res.json({ success: false, message: "Teacher already exists" });
        }
        await Teacher.create({ userId, teacherId, name, courseId, employeeId });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}