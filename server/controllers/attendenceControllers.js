import Attendence from "../models/attendenceModel.js";
import Course from "../models/courseModel.js";
import Student from "../models/studentModel.js";
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
        const semester = subject.semester;
        const courseId = subject.courseId;
        const attendence = await Attendence.create({ teacherId, subjectId, courseId, semester, studentIds, classTime });
        if (!attendence) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        await Promise.all(studentIds.map(studentId => updateAttendence(studentId,subjectId,courseId,semester)));
        return res.json({ success: true, message: "Attendence marked" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

// const updateClassesDelivered = async (subjectId,courseId,semester) => {
//     const course = await Course.findById(courseId);
//     const subject = await Subject.findById(subjectId);
//     course.classesDelivered[semester-1] = course.classesDelivered[semester-1] + 1;
//     subject.classesDelivered = course.classesDelivered + 1;
//     await course.save();
//     await subject.save();
// }

const updateAttendence = async (studentId,subjectId,courseId,semester) => {
    const student = await Student.findById(studentId);
    const subject = await Subject.findById(subjectId);
    const course = await Course.findById(courseId);
    subject.classesDelivered = subject.classesDelivered + 1;
    await subject.save();
    // console.log("TOtal classed delivered in course", course.classesDelivered[semester-1]);
    course.classesDelivered[semester-1] = course.classesDelivered[semester-1] + 1;
    await course.save();
    const totalClassesDelivered = course.classesDelivered[semester-1];
    // console.log("Total classes delivered",totalClassesDelivered);
    // console.log("Total classes attended prev",student.classesAttended);
    const totalClassesAttended = student.classesAttended + 1;
    // console.log("Total class attended", totalClassesAttended);
    student.classesAttended = totalClassesAttended;
    student.attendence = (totalClassesAttended / totalClassesDelivered ) * 100;
    // console.log(student.attendence);
    await student.save();
}