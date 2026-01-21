import express from "express";
import { adminLogin, adminSignUp, deleteUser, updatePassword, UserCreation } from "../controllers/userControllers.js";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";

const userRouter = express.Router();

userRouter.post("/admin-signup", adminSignUp);
userRouter.post("/create-user", authUser, verifyAccess("admin"), UserCreation);
userRouter.post("/admin-login", adminLogin);
userRouter.put("/update-password", authUser, updatePassword);
userRouter.delete("/delete-user", authUser, verifyAccess("admin"), deleteUser);

export default userRouter;