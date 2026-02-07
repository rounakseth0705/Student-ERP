import express from "express";
import { createStudent, getStudents, removeStudent, studentLogin, verifyStudent } from "../controllers/studentControllers.js";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";

const studentRouter = express.Router();

studentRouter.post("/create-student", authUser, verifyAccess("admin"), createStudent);
studentRouter.get("/get-students", authUser, verifyAccess("admin"), getStudents);
studentRouter.delete("/delete-student", authUser, verifyAccess("admin"), removeStudent);
studentRouter.post("/student-login", studentLogin);
studentRouter.get("/student/verify-student", authUser, verifyStudent);

export default studentRouter;