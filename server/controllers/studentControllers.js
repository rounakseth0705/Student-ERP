import Student from "../models/studentModel.js";
import User from "../models/userModel.js";

export const createStudent = async (req,res) => {
    try {
        const { userId, name, course, rollNo, age, address } = req.body;
        if (!userId || !name || !course || !rollNo || !age || !address) {
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
        const studentId = String(Math.floor(1000000 + Math.random() * 9000000));
        await Student.create({ userId, studentId, name, course, rollNo, age, address });
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
        const student = await Student.findOne({ studentId, rollNo });
        if (!student) {
            return res.json({ success: false, message: "Invalid userId or roll no." });
        }
        const deletedStudent = await Student.findByIdAndDelete(student._id);
        return res.json({ success: true, deletedStudent, message: "Student deleted" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}