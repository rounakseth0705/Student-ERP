import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";
import { createCourse, deleteCourse, getCourseById, getCourses } from "../controllers/courseControllers.js";

const courseRouter = express.Router();

courseRouter.post("/create-course", authUser, verifyAccess("admin"), createCourse);
courseRouter.delete("/delete-course/:courseCode", authUser, verifyAccess("admin"), deleteCourse);
courseRouter.get("/get-courses", authUser, verifyAccess("admin"), getCourses);
courseRouter.get("/get-course/:courseId", authUser, verifyAccess("admin","teacher"), getCourseById);

export default courseRouter;