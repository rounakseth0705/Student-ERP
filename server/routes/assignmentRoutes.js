import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";
import { createAssignment, deleteAssignment, getAssignmentsForAdmin, getSubjectAssignmentsForTeacher, getAssignmetsForStudent, updateAssignmentDate } from "../controllers/assignmentControllers.js";
import upload from "../config/multer.js";
import { attachTeacher } from "../middlewares/attachTeacher.js";

const assignmentRouter = express.Router();

assignmentRouter.post("/create-assignment", upload.single("assignmentFile"), authUser, verifyAccess("teacher"), attachTeacher, createAssignment);
assignmentRouter.put("/update-assignment-date", authUser, verifyAccess("teacher"), updateAssignmentDate);
assignmentRouter.get("/get-assignments-teacher/:subjectId", authUser, verifyAccess("teacher"), getSubjectAssignmentsForTeacher);
assignmentRouter.get("/get-assignments-student", authUser, verifyAccess("student"), getAssignmetsForStudent);
assignmentRouter.get("/get-assignments-admin", authUser, verifyAccess("admin"), getAssignmentsForAdmin);
assignmentRouter.delete("/delete-assignment", authUser, verifyAccess("teacher"), deleteAssignment);

export default assignmentRouter;