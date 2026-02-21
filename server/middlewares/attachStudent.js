import Student from "../models/studentModel.js";

export const attachStudent = async (req,res,next) => {
    try {
        const role = req.role;
        if (role !== "student") {
            next();
        }
        const userId = req.user._id;
        const student = await Student.findOne({ userId });
        if (!student) {
            return res.json({ success: false, message: "Student profile not found" });
        }
        req.studentId = student._id;
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}