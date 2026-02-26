import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";
import { attachTeacher } from "../middlewares/attachTeacher.js";
import { getDayWiseAttendence, getSubjectWiseAttendance, markAttendence } from "../controllers/attendenceControllers.js";
import { attachStudent } from "../middlewares/attachStudent.js";

const attendanceRouter = express.Router();

attendanceRouter.post("/mark-attendence", authUser, verifyAccess("teacher"), attachTeacher, markAttendence);
attendanceRouter.get("/get-day-wise-attendence/:day/:month/:year/:courseId/:semester", authUser, verifyAccess("student"), getDayWiseAttendence);
attendanceRouter.get("/get-subject-wise-attendance/:subjectIds", authUser, verifyAccess("student"), attachStudent, getSubjectWiseAttendance);

export default attendanceRouter;