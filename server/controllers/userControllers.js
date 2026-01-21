import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export const adminSignUp = async (req,res) => {
    try {
        const { name, email, password, role, adminSecret } = req.body;
        if (!name || !email || !password || !role || !adminSecret) {
            return res.json({ success: false, message: "Missing details" });
        }
        if (role !== "admin") {
            return res.json({ success: false, message: "Not allowed to create account" });
        }
        if (adminSecret !== process.env.ADMIN_SECRET) {
            return res.json({ success: false, message: "Invalid admin secret" });
        }
        const isAdminExists = await User.findOne({ $or: [{ email },{ role }] });
        if (isAdminExists) {
            return res.json({ success: false, message: "Cannot create admin" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.json({ success: true, user, token, message: "First Admin" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const UserCreation = async (req,res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.json({ success: false, message: "Missing details" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        return res.json({ success: true, userId: user._id, message: `${role} created` });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const adminLogin = async (req,res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: "Missing details" });
        }
        const existingUser = await User.findOne({ email });
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
        const { email, currentPassword, newPassword } = req.body;
        if (!email || !currentPassword || !newPassword) {
            return res.json({ success: false, message: "Missing details" });
        }
        if (currentPassword === newPassword) {
            return res.json({ success: false, message: "Old password and new password cannot be same" });
        }
        const userId = req.user._id;
        const existingUser = await User.findOne({ _id: userId, email });
        if (!existingUser) {
            return res.json({ success: false, message: "Invalid email" });
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
        const { userId } = req.body;
        if (!userId) {
            return res.json({ success: false, message: "Missing user id" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "Invalid user id" });
        }
        await User.findByIdAndDelete(userId);
        return res.json({ success: true, message: "User deleted" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}