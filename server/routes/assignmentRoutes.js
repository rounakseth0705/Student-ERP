import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";
import { createAssignment, deleteAssignment, getAssignmentsForAdmin, getAssignmentsForTeacher, getAssignmetsForStudent, updateAssignmentDate } from "../controllers/assignmentControllers.js";

const assignmentRouter = express.Router();

assignmentRouter.post("/create-assignment", authUser, verifyAccess("teacher"), createAssignment);
assignmentRouter.put("/update-assignment-date", authUser, verifyAccess("teacher"), updateAssignmentDate);
assignmentRouter.get("/get-assignments-teacher", authUser, verifyAccess("teacher"), getAssignmentsForTeacher);
assignmentRouter.get("/get-assignments-student", authUser, verifyAccess("student"), getAssignmetsForStudent);
assignmentRouter.get("/get-assignments-admin", authUser, verifyAccess("admin"), getAssignmentsForAdmin);
assignmentRouter.delete("/delete-assignment", authUser, verifyAccess("teacher"), deleteAssignment);

export default assignmentRouter;