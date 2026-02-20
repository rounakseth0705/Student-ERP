import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";
import { attachTeacher } from "../middlewares/attachTeacher.js";
import { createNotes, getSubjectNotesForTeacher } from "../controllers/notesControllers.js";
import upload from "../config/multer.js";

const notesRouter = express.Router();

notesRouter.post("/create-notes", upload.single("notesFile"), authUser, verifyAccess("teacher"), attachTeacher, createNotes);
notesRouter.get("/get-notes-teacher/:courseId/:subjectId", authUser, verifyAccess("teacher"), attachTeacher, getSubjectNotesForTeacher);

export default notesRouter;