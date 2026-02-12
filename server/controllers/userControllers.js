import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export const adminSignUp = async (req,res) => {
    try {
        const { name, mobileNo, email, password, role, adminSecret } = req.body;
        if (!name || !mobileNo || !email || !password || !role || !adminSecret) {
            return res.json({ success: false, message: "Missing details" });
        }
        if (role !== "admin") {
            return res.json({ success: false, message: "Not allowed to create account" });
        }
        if (adminSecret !== process.env.ADMIN_SECRET) {
            return res.json({ success: false, message: "Invalid admin secret" });
        }
        if (mobileNo.length !== 10) {
            return res.json({ success: false, message: "Invalid mobile no." });
        }
        const isAdminExists = await User.findOne({ $or: [{ mobileNo },{ email },{ role }] });
        if (isAdminExists) {
            return res.json({ success: false, message: "Cannot create admin" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, mobileNo, email, password: hashedPassword, role });
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.json({ success: true, user, token, message: "First Admin" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const getAdmins = async (req,res) => {
    try {
        const role = "admin";
        const admins = await User.find({ role });
        if (admins.length === 0) {
            return res.json({ success: false, message: "No admin exists" });
        }
        return res.json({ success: true, message: "Admin already exists" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const UserCreation = async (req,res) => {
    try {
        const { name, mobileNo, email, password, role } = req.body;
        if (!name || !mobileNo || !email || !password || !role) {
            return res.json({ success: false, message: "Missing details" });
        }
        if (mobileNo.length !== 10) {
            return res.json({ success: false, message: "Invalid mobile no." });
        }
        const existingUser = await User.findOne({ $or: [{ mobileNo },{ email }] });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, mobileNo, email, password: hashedPassword, role });
        return res.json({ success: true, userId: user._id, message: `${role} created` });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const adminLogin = async (req,res) => {
    try {
        const { identifier, password } = req.body;
        if (!identifier || !password) {
            return res.json({ success: false, message: "Missing details" });
        }
        const existingUser = await User.findOne({ $or: [{ mobileNo: identifier },{ email: identifier }] });
        if (!existingUser || existingUser.role !== "admin") {
            return res.json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }
        const token = jwt.sign({ id: existingUser._id, role: existingUser.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.json({ success: true, user: existingUser, token, message: "Admin logged in successfully" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const updatePassword = async (req,res) => {
    try {
        const { identifier, currentPassword, newPassword } = req.body;
        if (!identifier || !currentPassword || !newPassword) {
            return res.json({ success: false, message: "Missing details" });
        }
        if (currentPassword === newPassword) {
            return res.json({ success: false, message: "Old password and new password cannot be same" });
        }
        const userId = req.user._id;
        const existingUser = await User.findOne({ _id: userId, $or: [{ mobileNo: identifier },{ email: identifier }] });
        if (!existingUser) {
            return res.json({ success: false, message: "Invalid email or mobile no." });
        }
        const isMatch = await bcrypt.compare(currentPassword, existingUser.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        existingUser.password = hashedPassword;
        await existingUser.save();
        return res.json({ success: true, message: "Password updated" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const deleteUser = async (req,res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.json({ success: false, message: "Missing user id" });
        }
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.json({ success: false, message: "Invalid user id" });
        }
        return res.json({ success: true, message: "User deleted" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const verifyAdmin = async (req,res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.json({ success: false, message: "Not authenticated" });
        }
        return res.json({ success: true, user, message: "Admin details" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}