import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext.jsx";

const ForgotPassword = () => {
    const { sendResetPasswordOtp, isOtpSent } = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const handleSendResetPasswordOtp = async () => {
        await sendResetPasswordOtp(email);
    }
    const handleUpdatePasswordWithOtp = async () => {
        
    }
    return(
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-blue-950 text-3xl font-semibold mt-10">An OTP will be sent to your Email.</h1>
            <input onChange={(event) => setEmail(event.target.value)} value={email} type="text" placeholder="enter your email" className="bg-gray-200 outline-0 rounded-3xl px-5 py-3 w-80 mt-5"/>
            <button onClick={handleSendResetPasswordOtp} className="mt-3 bg-blue-500 text-white py-1 px-2 rounded cursor-pointer hover:bg-blue-400 transition-all duration-400 ease-in-out">Send OTP</button>
            <span className="flex justify-center items-center gap-1 mt-3">
                <h1>Remember Password?</h1>
                <h1 onClick={() => navigate("/")} className="text-blue-800 cursor-pointer underline">click here</h1>
            </span>
            { isOtpSent &&
                <div></div>
            }
        </div>
    )
}

export default ForgotPassword;