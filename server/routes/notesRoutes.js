import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";
import { attachTeacher } from "../middlewares/attachTeacher.js";
import { createNotes, deleteNotes, getNotesForStudent, getSubjectNotesForTeacher, updateNotesName } from "../controllers/notesControllers.js";
import upload from "../config/multer.js";

const notesRouter = express.Router();

notesRouter.post("/create-notes", upload.single("notesFile"), authUser, verifyAccess("teacher"), attachTeacher, createNotes);
notesRouter.get("/get-notes-teacher/:courseId/:subjectId", authUser, verifyAccess("teacher"), attachTeacher, getSubjectNotesForTeacher);
notesRouter.get("/get-notes-student/:notesSubjectId/:notesCourseId/:semester", authUser, verifyAccess("student"), getNotesForStudent);
notesRouter.delete("/delete-notes/:notesId", authUser, verifyAccess("teacher"), deleteNotes);
notesRouter.put("/update-notes-name", authUser, verifyAccess("teacher"), updateNotesName);

export default notesRouter;