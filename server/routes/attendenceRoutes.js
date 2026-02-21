import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";
import { attachTeacher } from "../middlewares/attachTeacher.js";
import { markAttendence } from "../controllers/attendenceControllers.js";

const attendenceRouter = express.Router();

attendenceRouter.post("/mark-attendence", authUser, verifyAccess("teacher"), attachTeacher, markAttendence);

export default attendenceRouter;