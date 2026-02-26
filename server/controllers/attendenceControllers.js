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
        const time = subject.schedule.find(schedule => schedule.day === day);
        if (!time) {
            return res.json({ success: false, message: "Can't mark attendance" });
        }
        const semester = subject.semester;
        const courseId = subject.courseId;
        const attendence = await Attendence.create({ teacherId, subjectId, courseId, semester, studentIds, time });
        if (!attendence) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        await Promise.all(studentIds.map(studentId => updateAttendence(studentId,subjectId,courseId,semester)));
        return res.json({ success: true, message: "Attendance marked" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

const updateAttendence = async (studentId,subjectId,courseId,semester) => {
    const student = await Student.findById(studentId);
    const subject = await Subject.findById(subjectId);
    const course = await Course.findById(courseId);
    subject.classesDelivered = subject.classesDelivered + 1;
    await subject.save();
    course.classesDelivered[semester-1] = course.classesDelivered[semester-1] + 1;
    await course.save();
    const totalClassesDelivered = course.classesDelivered[semester-1];
    const totalClassesAttended = student.classesAttended + 1;
    student.classesAttended = totalClassesAttended;
    student.attendence = (totalClassesAttended / totalClassesDelivered) * 100;
    const subjectWiseAttendance = student.subjectWiseAttendance?.find(subjectWiseAttendance => subjectWiseAttendance.subjectId.equals(subjectId));
    if (subjectWiseAttendance) {
        subjectWiseAttendance.classesAttended = subjectWiseAttendance.classesAttended + 1;
    } else {
        student.subjectWiseAttendance?.push({ subjectId, classesAttended: 1 });
    }
    await student.save();
}

export const getDayWiseAttendence = async (req,res) => {
    try {
        const { day, month, year, courseId, semester } = req.params;
        if (!day || !month || !year || !courseId || !semester) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        const start = new Date(year,month,day,0,0,0);
        const end = new Date(year,month,day,23,59,59,999);
        const attendances = await Attendence.find({ courseId, semester, createdAt: { $gte: start, $lte: end } }).populate("subjectId","subjectName");
        if (!attendances) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        return res.json({ success: true, attendances, message: "Day wise attendance" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getSubjectWiseAttendance = async (req,res) => {
    try {
        const subjectIds = req.params.subjectIds.split(",");
        const studentId = req?.studentId;
        if (!subjectIds) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        const attendances = await Attendence.find({ subjectId: { $in: subjectIds } });
        if (!attendances) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        let classAttendances = [];
        attendances.forEach(attendance => {
            subjectIds.map(subjectId => {
                if (subjectId === attendance.subjectId) {
                    if (attendance.studentIds.includes(studentId)) {
                        if (classAttendances.length === 0) {
                            classAttendances.push({ subjectId: subjectId, classAttended: 1 });
                        } else if (classAttendances.some(classAttended => classAttended.subjectId === subjectId)) {
                            const classAttendance = classAttendances.find(classAttendance => classAttendance.subjectId === subjectId);
                            if (classAttendance) {
                                classAttendance.classAttended = classAttendance.classAttended + 1;
                            }
                        } else {
                            classAttendances.push({ subjectId: subjectId, classAttended: 1 });
                        }
                    }
                }
            });
        });
        return res.json({ success: true, classAttendances, message: "Subject wise attendance" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}