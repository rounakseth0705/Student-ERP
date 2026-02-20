import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";
import { createAssignment, deleteAssignment, getAssignmentsForAdmin, getSubjectAssignmentsForTeacher, getAssignmetsForStudent, updateAssignmentDate, updateAssignmentName } from "../controllers/assignmentControllers.js";
import upload from "../config/multer.js";
import { attachTeacher } from "../middlewares/attachTeacher.js";

const assignmentRouter = express.Router();

assignmentRouter.post("/create-assignment", upload.single("assignmentFile"), authUser, verifyAccess("teacher"), attachTeacher, createAssignment);
assignmentRouter.put("/update-assignment-name", authUser, verifyAccess("teacher"), updateAssignmentName);
assignmentRouter.put("/update-assignment-date", authUser, verifyAccess("teacher"), updateAssignmentDate);
assignmentRouter.get("/get-assignments-teacher/:courseId/:subjectId", authUser, verifyAccess("teacher"), attachTeacher, getSubjectAssignmentsForTeacher);
assignmentRouter.get("/get-assignments-student", authUser, verifyAccess("student"), getAssignmetsForStudent);
assignmentRouter.get("/get-assignments-admin", authUser, verifyAccess("admin"), getAssignmentsForAdmin);
assignmentRouter.delete("/delete-assignment/:assignmentId", authUser, verifyAccess("teacher"), deleteAssignment);
// assignmentRouter.get("/download-assignment/:courseId/:subjectId", authUser, verifyAccess("teacher"), downloadAssignment);

export default assignmentRouter;