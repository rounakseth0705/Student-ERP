import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";
import { createSubject, deleteSubject, getSubjects } from "../controllers/subjectControllers.js";

const subjectRouter = express.Router();

subjectRouter.post("/create-subject", authUser, verifyAccess("admin"), createSubject);
subjectRouter.delete("/delete-subject", authUser, verifyAccess("admin"), deleteSubject);
subjectRouter.get("/get-subjects", authUser, verifyAccess("admin"), getSubjects);

export default subjectRouter;