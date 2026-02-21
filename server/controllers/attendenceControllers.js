import Attendence from "../models/attendenceModel.js";
import Subject from "../models/subjectModel.js";

export const markAttendence = async (req,res) => {
    try {
        const { subjectId, studentIds, day } = req.body;
        const teacherId = req?.teacherId;
        if (!teacherId || !subjectId || !studentIds || !day) {
            return res.json({ success: false, message: "Details missing" });
        }
        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        const classTime = subject.schedule.find(schedule => schedule.day === day);
        if (!classTime) {
            return res.json({ success: false, message: "Can't mark attendence" });
        }
        const attendence = await Attendence.create({ teacherId, subjectId, studentIds, classTime });
        if (!attendence) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        return res.json({ success: true, message: "Attendence marked" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}