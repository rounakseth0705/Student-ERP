import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";
import { getSubjectAssignmentUploads, uploadAssignment } from "../controllers/assignmentUploadControllers.js";
import { attachStudent } from "../middlewares/attachStudent.js";

const assignmentUploadRouter = express.Router();

assignmentUploadRouter.post("/upload-assignment", authUser, verifyAccess("student"), attachStudent, uploadAssignment);
assignmentUploadRouter.get("/get-assignment-uploads/:assignmentId", authUser, verifyAccess("teacher"), getSubjectAssignmentUploads);

export default assignmentUploadRouter;