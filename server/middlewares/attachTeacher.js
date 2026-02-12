import Teacher from "../models/teacherModel.js";

export const attachTeacher = async (req,res,next) => {
    try {
        const role = req.role;
        if (role !== "teacher") {
            return next();
        }
        const userId = req.user._id;
        const teacher = await Teacher.findOne({ userId });
        if (!teacher) {
            return res.json({ success: false, message: "Teacher profile not found" });
        }
        req.teacherId = teacher.teacherId;
        next();
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}