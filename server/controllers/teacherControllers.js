import Course from "../models/courseModel.js";
import Subject from "../models/subjectModel.js";
import Teacher from "../models/teacherModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createTeacher = async (req,res) => {
    try {
        const { userId, name, courseCode, employeeId } = req.body;
        if (!userId || !name || !courseCode || !employeeId) {
            return res.json({ success: false, message: "Missing details" });
        }
        const isUser = await User.findById(userId);
        if (!isUser || isUser.name !== name || isUser.role !== "teacher") {
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
        const teacher = await Teacher.create({ userId, teacherId, name, courseId, employeeId });
        return res.json({ success: true, teacher, message: "Teacher successfully created" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getTeachers = async (req,res) => {
    try {
        const teachers = await Teacher.find().populate("courseId","courseCode").select("-userId");
        return res.json({ success: true, teachers, message: "List of all teachers" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const removeTeacher = async (req,res) => {
    try {
        const { teacherId, employeeId } = req.params;
        if (!teacherId || !employeeId) {
            return res.json({ success: false, message: "Missing details" });
        }
        const teacher = await Teacher.findOne({ teacherId, employeeId });
        if (!teacher) {
            return res.json({ success: false, message: "Invalid teacher id or employee id" });
        }
        const isAssigned = await Subject.findOne({ teacherId: teacher._id });
        if (isAssigned) {
            return res.json({ success: false, message: "Can't delete an assigned teacher" });
        }
        const deletedTeacher = await Teacher.findByIdAndDelete(teacher._id);
        return res.json({ success: true, deletedTeacher, message: "Teacher deleted" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const teacherLogin = async (req,res) => {
    try {
        const { teacherId, password } = req.body;
        if (!teacherId || !password) {
            return res.json({ success: false, message: "Missing details" });
        }
        const teacher = await Teacher.findOne({ teacherId }).populate("courseId","courseName");
        if (!teacher) {
            return res.json({ success: false, message: "Invalid teacher id" });
        }
        const isUser = await User.findOne({ _id: teacher.userId });
        const isMatch = await bcrypt.compare(password, isUser.password);
        if (!isUser || !isMatch || isUser.role !== "teacher") {
            return res.json({ success: false, message: "Invalid teacher id or password" });
        }
        const token = jwt.sign({ id: isUser._id, role: isUser.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.json({ success: true, user: isUser, teacher, token, message: "Teacher successfully logged in" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const verifyTeacher = async (req,res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.json({ success: false, message: "Not authenticated" });
        }
        const teacher = await Teacher.findOne({ userId: user._id }).populate("courseId","courseName");
        if (!teacher) {
            return res.json({ success: false, message: "Invalid access!" });
        }
        return res.json({ success: true, user, teacher, message: "Teacher details" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}