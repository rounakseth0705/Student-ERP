import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";
import { changeSubjectTeacher, createSubject, deleteSubject, fetchSubjectsByCourseId, getSubjects, scheduleClass, updateSchedule } from "../controllers/subjectControllers.js";

const subjectRouter = express.Router();

subjectRouter.post("/create-subject", authUser, verifyAccess("admin"), createSubject);
subjectRouter.put("/update-subject-teacher", authUser, verifyAccess("admin"), changeSubjectTeacher);
subjectRouter.delete("/delete-subject/:subjectId", authUser, verifyAccess("admin"), deleteSubject);
subjectRouter.get("/get-subjects", authUser, getSubjects);
subjectRouter.get("/fetch-subjects/:courseId", authUser, fetchSubjectsByCourseId);
subjectRouter.put("/schedule-class", authUser, verifyAccess("admin"), scheduleClass);
subjectRouter.put("update-schedule", authUser, verifyAccess("admin"), updateSchedule);

export default subjectRouter;