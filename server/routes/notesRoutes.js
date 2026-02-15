import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";
import { attachTeacher } from "../middlewares/attachTeacher.js";
import { createNotes } from "../controllers/notesControllers.js";
import upload from "../config/multer.js";

const notesRouter = express.Router();

notesRouter.post("/create-notes", upload.single("notesFile"), authUser, verifyAccess("teacher"), attachTeacher, createNotes);

export default notesRouter;