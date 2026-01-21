import Student from "../models/studentModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Course from "../models/courseModel.js";

export const createStudent = async (req,res) => {
    try {
        const { userId, name, courseCode, rollNo, age, address } = req.body;
        if (!userId || !name || !courseCode || !rollNo || !age || !address) {
            return res.json({ success: false, message: "Missing details" });
        }
        const isUser = await User.findById(userId);
        if (!isUser || isUser.role !== "student" || isUser.name !== name) {
            return res.json({ success: false, message: "Invalid user id or name" });
        }
        const existingStudent = await Student.findOne({ $or: [{ userId },{ rollNo }] });
        if (existingStudent) {
            return res.json({ success: false, message: "Student already exists" });
        }
        const course = await Course.findOne({ courseCode });
        if (!course) {
            return res.json({ success: false, message: "Invalid course" });
        }
        const courseId = course._id;
        const studentId = String(Math.floor(1000000 + Math.random() * 9000000));
        await Student.create({ userId, studentId, name, courseId, rollNo, age, address });
        return res.json({ success: true, message: "Student successfully created" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getStudents = async (req,res) => {
    try {
        const students = await Student.find();
        return res.json({ success: true, students, message: "List of all students" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const removeStudent = async (req,res) => {
    try {
        const { studentId, rollNo } = req.body;
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
        return res.json({ success: true, user, token, message: "Student successfully logged in" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}