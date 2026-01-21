import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";
import { createSubject } from "../controllers/subjectControllers.js";

const subjectRouter = express.Router();

subjectRouter.post("/create-subject", authUser, verifyAccess("admin"), createSubject);

export default subjectRouter;