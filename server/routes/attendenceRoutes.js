import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";
import { attachTeacher } from "../middlewares/attachTeacher.js";
import { getDayWiseAttendence, markAttendence } from "../controllers/attendenceControllers.js";

const attendenceRouter = express.Router();

attendenceRouter.post("/mark-attendence", authUser, verifyAccess("teacher"), attachTeacher, markAttendence);
attendenceRouter.get("/get-day-wise-attendence/:day/:month/:year/:courseId/:semester", authUser, verifyAccess("student"), getDayWiseAttendence);

export default attendenceRouter;