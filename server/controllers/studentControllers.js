import Student from "../models/studentModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Course from "../models/courseModel.js";

export const createStudent = async (req,res) => {
    try {
        const { userId, courseCode, rollNo } = req.body;
        if (!userId || !courseCode || !rollNo) {
            return res.json({ success: false, message: "Missing details" });
        }
        const isUser = await User.findById(userId);
        if (!isUser || isUser.role !== "student") {
            return res.json({ success: false, message: "Invalid user id" });
        }
        const studentId = String(Math.floor(1000000 + Math.random() * 9000000));
        const existingStudent = await Student.findOne({ $or: [{ userId },{ studentId },{ rollNo }] });
        if (existingStudent) {
            return res.json({ success: false, message: "Student already exists" });
        }
        const course = await Course.findOne({ courseCode });
        if (!course) {
            return res.json({ success: false, message: "Invalid course" });
        }
        const courseId = course._id;
        const student = await Student.create({ userId, studentId, courseId, rollNo });
        return res.json({ success: true, student, message: "Student successfully created" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getStudents = async (req,res) => {
    try {
        const students = await Student.find().populate([{ path: "courseId", select: "courseName" },{ path: "userId", select: "name" }]);
        return res.json({ success: true, students, message: "List of all students" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const removeStudent = async (req,res) => {
    try {
        const { studentId, rollNo } = req.params;
        if (!studentId || !rollNo) {
            return res.json({ success: false, message: "Missing details" });
        }
        const deletedStudent = await Student.findOneAndDelete({ studentId, rollNo });
        if (!deletedStudent) {
            return res.json({ success: false, message: "Invalid userId or roll no." });
        }
        return res.json({ success: true, deletedStudent, message: "Student deleted" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const studentLogin = async (req,res) => {
    try {
        const { studentId, password } = req.body;
        if (!studentId || !password) {
            return res.json({ success: false, message: "Missing details" });
        }
        const student = await Student.findOne({ studentId });
        if (!student) {
            return res.json({ success: false, message: "Invalid student id" });
        }
        const user = await User.findOne({ _id: student.userId });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!user || !isMatch || user.role !== "student") {
            return res.json({ success: false, message: "Invalid student id or password" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.json({ success: true, user, student, token, message: "Student successfully logged in" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const verifyStudent = async (req,res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.json({ success: false, message: "Not authenticated" });
        }
        const student = await Student.findOne({ userId: user._id });
        if (!student) {
            return res.json({ success: false, message: "Invalid access!" });
        }
        return res.json({ success: true, user, student, message: "Student details" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getCourseStudents = async (req,res) => {
    try {
        const { courseId } = req.params;
        console.log(courseId);
        if (!courseId) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        const course = await Course.findById(courseId);
        if (!course) {
            return res.json({ success: false, message: "Invalid course!" });
        }
        const students = await Student.find({ courseId }).populate("userId","name");
        if (!students) {
            return res.json({ success: false, message: "No students exists in this course" });
        }
        return res.json({ success: true, students, message: `List of students in ${course.courseName}` });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}