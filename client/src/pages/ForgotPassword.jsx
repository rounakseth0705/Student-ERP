import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

const ForgotPassword = () => {
    const { sendResetPasswordOtp, isOtpSent, updatePasswordWithOtp } = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [enteredOtp, setEnteredOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [conformedPassword, setConformedPassword] = useState("");
    const handleSendResetPasswordOtp = async () => {
        await sendResetPasswordOtp(email);
    }
    const handleUpdatePasswordWithOtp = async () => {
        if (newPassword !== conformedPassword) {
            toast.error("Check the conformed password again");
            return;
        }
        await updatePasswordWithOtp(email,enteredOtp,conformedPassword);
    }
    return(
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-blue-950 font-semibold mt-10 sm:text-2xl md:text-3xl">An OTP will be sent to your Email.</h1>
            <input onChange={(event) => setEmail(event.target.value)} value={email} type="text" placeholder="enter your email" className="bg-gray-200 outline-0 rounded-3xl px-5 py-3 w-40 mt-5 sm:w-50 md:w-60 lg:w-80"/>
            <button onClick={handleSendResetPasswordOtp} className="mt-3 bg-blue-500 text-white py-1 px-2 rounded cursor-pointer hover:bg-blue-400 transition-all duration-400 ease-in-out">Send OTP</button>
            <span className="flex justify-center items-center gap-1 mt-3">
                <h1>Remember Password?</h1>
                <h1 onClick={() => navigate("/")} className="text-blue-800 cursor-pointer hover:underline">click here</h1>
            </span>
            { isOtpSent &&
                <div className="flex flex-col justify-center items-center gap-5 mt-5">
                    <input onChange={(event) => setEnteredOtp(event.target.value)} value={enteredOtp} type="text" placeholder="enter otp" className="outline-0 bg-gray-200 px-2 py-1 border-b"/>
                    <input onChange={(event) => setNewPassword(event.target.value)} value={newPassword} type="text" placeholder="enter new password" className="w-80 outline-0 rounded-3xl px-4 py-3 bg-gray-200"/>
                    <input onChange={(event) => setConformedPassword(event.target.value)} value={conformedPassword} type="text" placeholder="conform new password" className="w-80 outline-0 rounded-3xl px-4 py-3 bg-gray-200"/>
                    <button onClick={handleUpdatePasswordWithOtp} className="bg-green-500 text-white rounded px-3 py-1 cursor-pointer hover:bg-green-400 transition-all duration-400 ease-in-out">Set new password</button>
                </div>
            }
        </div>
    )
}

export default ForgotPassword;