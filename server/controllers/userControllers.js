import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import transporter from "../config/nodeMailer.js";

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
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Student-ERP",
            text: `Your account has been created as the first admin of this platform with an email id ${email} and mobile no. ${mobileNo}`
        }
        await transporter.sendMail(mailOptions);
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
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Student-ERP",
            text: `Your account has been created as an ${role} with email id ${email} and mobile no. ${mobileNo}`
        }
        await transporter.sendMail(mailOptions);
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
        const { currentPassword, newPassword } = req.body;
        const userId = req.user._id;
        if (!currentPassword || !newPassword || !userId) {
            return res.json({ success: false, message: "Missing details" });
        }
        if (currentPassword === newPassword) {
            return res.json({ success: false, message: "Old and new password cannot be same" });
        }
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.json({ success: false, message: "Something went wrong!" });
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

export const updatePasswordWithIdentifier = async (req,res) => {
    try {
        const { identifier, newPassword } = req.body;
        if (!identifier || !newPassword) {
            return res.json({ success: false, message: "Details missing" });
        }
        const existingUser = await User.findOne({ $or: [{ mobileNo: identifier },{ email: identifier }] });
        if (!existingUser) {
            return res.json({ success: false, message: "Invalid email or mobile" });
        }
        const isSame = await bcrypt.compare(newPassword, existingUser.password);
        if (isSame) {
            return res.json({ success: false, message: "Old and new password cannot be same" });
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

export const sendResetPasswordOtp = async (req,res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.json({ success: false, message: "Details missing" });
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.json({ success: false, message: "Invalid email entered" });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        const otpExpireAt = Date.now() + 5*60*1000;
        existingUser.otp = otp;
        existingUser.otpExpireAt = otpExpireAt;
        await existingUser.save();
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Password reset OTP",
            text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password`
        }
        await transporter.sendMail(mailOption);
        return res.json({ success: true, message: "Password reset OTP sent to your email" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const updatePasswordWithOtp = async (req,res) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            return res.json({ success: false, message: "Details missing" });
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.json({ success: false, message: "User not found" });
        }
        if (existingUser.otp === "" || existingUser.otp !== otp) {
            return res.json({ success: false, message: "Invalid otp" });
        }
        if (existingUser.otpExpireAt < Date.now()) {
            return res.json({ success: false, message: "Otp exipred" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        existingUser.password = hashedPassword;
        existingUser.otp = "";
        existingUser.otpExpireAt = 0;
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