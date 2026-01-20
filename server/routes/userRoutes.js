import express from "express";
import { adminSignUp, deleteAccount, updatePassword, UserCreation, userLogin } from "../controllers/userControllers.js";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";

const userRouter = express.Router();

userRouter.post("/admin-signup", adminSignUp);
userRouter.post("/create-user", authUser, verifyAccess("admin"), UserCreation);
userRouter.post("/login", userLogin);
userRouter.post("/update-password", authUser, updatePassword);
userRouter.post("/delete-account", authUser, deleteAccount);

export default userRouter;