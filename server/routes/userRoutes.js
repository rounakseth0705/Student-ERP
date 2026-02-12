import express from "express";
import { adminLogin, adminSignUp, deleteUser, getAdmins, updatePassword, UserCreation, verifyAdmin } from "../controllers/userControllers.js";
import { authUser } from "../middlewares/authUser.js";
import { verifyAccess } from "../middlewares/role.js";

const userRouter = express.Router();

userRouter.post("/admin-signup", adminSignUp);
userRouter.post("/create-user", authUser, verifyAccess("admin"), UserCreation);
userRouter.post("/admin-login", adminLogin);
userRouter.put("/update-password", authUser, updatePassword);
userRouter.delete("/delete-user/:userId", authUser, verifyAccess("admin"), deleteUser);
userRouter.get("/get-admins", getAdmins);
userRouter.get("/verify-admin", authUser, verifyAdmin);

export default userRouter;