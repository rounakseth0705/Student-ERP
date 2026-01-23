import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";
import { createTeacher, getTeachers, removeTeacher, teacherLogin } from "../controllers/teacherControllers.js";

const teacherRouter = express.Router();

teacherRouter.post("/create-teacher", authUser, verifyAccess("admin"), createTeacher);
teacherRouter.get("/get-teachers", authUser, verifyAccess("admin"), getTeachers);
teacherRouter.delete("/delete-teachers", authUser, verifyAccess("admin"), removeTeacher);
teacherRouter.post("/teacher-login", teacherLogin);

export default teacherRouter;