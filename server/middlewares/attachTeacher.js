import Teacher from "../models/teacherModel";

export const attachTeacher = async (req,res) => {
    try {
        const role = req.role;
        if (role !== "teacher") {
            return next();
        }
        const userId = req.userId;
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