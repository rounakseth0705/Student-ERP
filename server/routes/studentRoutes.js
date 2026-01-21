import express from "express";
import { createStudent, getStudents, removeStudent, studentLogin } from "../controllers/studentControllers.js";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";

const studentRouter = express.Router();

studentRouter.post("/create-student", authUser, verifyAccess("admin"), createStudent);
studentRouter.get("/get-students", authUser, verifyAccess("admin"), getStudents);
studentRouter.delete("/delete-student", authUser, verifyAccess("admin"), removeStudent);
studentRouter.post("/login", studentLogin);

export default studentRouter;