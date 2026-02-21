import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";
import { createTeacher, getStudentsForAttendence, getTeachers, removeTeacher, teacherLogin, verifyTeacher } from "../controllers/teacherControllers.js";

const teacherRouter = express.Router();

teacherRouter.post("/create-teacher", authUser, verifyAccess("admin"), createTeacher);
teacherRouter.get("/get-teachers", authUser, verifyAccess("admin"), getTeachers);
teacherRouter.delete("/delete-teacher/:teacherId/:employeeId", authUser, verifyAccess("admin"), removeTeacher);
teacherRouter.post("/teacher-login", teacherLogin);
teacherRouter.get("/verify-teacher", authUser, verifyTeacher);
teacherRouter.get("/get-students-attendence/:subjectId", authUser, verifyAccess("teacher"), getStudentsForAttendence);

export default teacherRouter;