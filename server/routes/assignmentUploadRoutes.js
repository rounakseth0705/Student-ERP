import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";
import { getAssignmentUploadsForStudent, getSubjectAssignmentUploads, uploadAssignment } from "../controllers/assignmentUploadControllers.js";
import { attachStudent } from "../middlewares/attachStudent.js";
import upload from "../config/multer.js";

const assignmentUploadRouter = express.Router();

assignmentUploadRouter.post("/upload-assignment", upload.single("assignmentUploadFile"), authUser, verifyAccess("student"), attachStudent, uploadAssignment);
assignmentUploadRouter.get("/get-assignment-uploads/:assignmentId", authUser, verifyAccess("teacher"), getSubjectAssignmentUploads);
assignmentUploadRouter.get("/get-assignment-uploads-student/:subjectId", authUser, verifyAccess("student"), attachStudent, getAssignmentUploadsForStudent);

export default assignmentUploadRouter;