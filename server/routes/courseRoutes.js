import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";
import { createCourse, deleteCourse, getCourse } from "../controllers/courseControllers.js";

const courseRouter = express.Router();

courseRouter.post("/create-course", authUser, verifyAccess("admin"), createCourse);
courseRouter.delete("/delete-course", authUser, verifyAccess("admin"), deleteCourse);
courseRouter.get("/get-course", authUser, verifyAccess("admin"), getCourse);

export default courseRouter;