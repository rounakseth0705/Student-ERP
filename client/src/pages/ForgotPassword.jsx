// import { useContext } from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/AuthContext.jsx";
// import toast from "react-hot-toast";

// const ForgotPassword = () => {
//     const { sendResetPasswordOtp, isOtpSent, updatePasswordWithOtp } = useContext(UserContext);
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("");
//     const [enteredOtp, setEnteredOtp] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [conformedPassword, setConformedPassword] = useState("");
//     const handleSendResetPasswordOtp = async () => {
//         await sendResetPasswordOtp(email);
//     }
//     const handleUpdatePasswordWithOtp = async () => {
//         if (newPassword !== conformedPassword) {
//             toast.error("Check the conformed password again");
//             return;
//         }
//         await updatePasswordWithOtp(email,enteredOtp,conformedPassword);
//     }
//     return(
//         <div className="flex flex-col justify-center items-center px-[3vw]">
//             <h1 className="text-blue-950 font-semibold text-center mt-[20vh] text-2xl sm:text-4xl">An OTP will be sent to your Email.</h1>
//             <input onChange={(event) => setEmail(event.target.value)} value={email} type="text" placeholder="enter your email" className="bg-gray-200 text-xs outline-0 rounded-3xl px-[5vw] py-[1.5vh] w-[65vw] mt-5 sm:text-base sm:w-[50vw] sm:py-[1.2vh] sm:px-[3.5vw] md:w-[43vw] lg:py-[1.7vh] lg:px-[2.2vw] lg:w-[34vw] xl:w-[30vw] xl:px-[1.5vw] xl:py-[1.5vh]"/>
//             <button onClick={handleSendResetPasswordOtp} className="mt-3 bg-blue-500 text-white py-1 px-2 rounded cursor-pointer hover:bg-blue-400 transition-all duration-400 ease-in-out">Send OTP</button>
//             <span className="flex justify-center items-center gap-1 mt-3">
//                 <h1>Remember Password?</h1>
//                 <h1 onClick={() => navigate("/")} className="text-blue-800 cursor-pointer hover:underline">click here</h1>
//             </span>
//             { isOtpSent &&
//                 <div className="flex flex-col justify-center items-center gap-5 mt-5">
//                     <input onChange={(event) => setEnteredOtp(event.target.value)} value={enteredOtp} type="text" placeholder="enter otp" className="outline-0 bg-gray-200 px-2 py-1 border-b"/>
//                     <input onChange={(event) => setNewPassword(event.target.value)} value={newPassword} type="text" placeholder="enter new password" className="w-80 outline-0 rounded-3xl px-4 py-3 bg-gray-200"/>
//                     <input onChange={(event) => setConformedPassword(event.target.value)} value={conformedPassword} type="text" placeholder="conform new password" className="w-80 outline-0 rounded-3xl px-4 py-3 bg-gray-200"/>
//                     <button onClick={handleUpdatePasswordWithOtp} className="bg-green-500 text-white rounded px-3 py-1 cursor-pointer hover:bg-green-400 transition-all duration-400 ease-in-out">Set new password</button>
//                 </div>
//             }
//         </div>
//     )
// }

// export default ForgotPassword;

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext.jsx";
import { Mail, KeyRound, ShieldCheck, ArrowLeft } from "lucide-react"; // Matching Lucide Icons
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
        await updatePasswordWithOtp(email, enteredOtp, conformedPassword);
    }

    return (
        <div className="relative flex flex-col justify-center items-center min-h-screen w-screen p-4 font-sans selection:bg-blue-600 selection:text-white overflow-hidden bg-slate-950">
            
            {/* Blurry Background Image Layer */}
            <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center scale-105 blur-md opacity-40 pointer-events-none"
                style={{ backgroundImage: `url('http://googleusercontent.com/image_collection/image_retrieval/3502508796826645335_0')` }}
            />
            
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/15 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-600/15 rounded-full blur-[90px] pointer-events-none" />

            {/* Premium Glassmorphic Card */}
            <div className="relative w-full max-w-md bg-slate-900/60 backdrop-blur-2xl border border-slate-700/40 p-8 sm:p-10 rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.6)] flex flex-col items-center z-10">
                
                {/* Header Title with Subtitle */}
                <div className="text-center mb-8">
                    <h1 className="text-white text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        RESET PASSWORD
                    </h1>
                    <p className="text-xs text-slate-400 mt-2 tracking-wide max-w-[280px] mx-auto">
                        {!isOtpSent ? "An OTP will be sent to your registered Email address." : "Enter your OTP and choose a new password."}
                    </p>
                </div>
                
                {/* Step 1: Email Submission (Always visible or disabled after sending) */}
                <div className="w-full flex flex-col items-center space-y-4">
                    <div className="group w-full flex items-center gap-3 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:bg-slate-950/70 transition-all duration-300">
                        <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors shrink-0" />
                        <input 
                            onChange={(event) => setEmail(event.target.value)} 
                            value={email} 
                            type="text" 
                            disabled={isOtpSent}
                            placeholder="Enter your email" 
                            className="bg-transparent text-slate-100 placeholder-slate-500 outline-none w-full text-sm sm:text-base font-medium disabled:opacity-50" 
                        />
                    </div>
                    
                    {!isOtpSent && (
                        <button 
                            onClick={handleSendResetPasswordOtp} 
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-blue-900/30 hover:shadow-blue-500/20 cursor-pointer text-sm sm:text-base tracking-wide"
                        >
                            Send OTP
                        </button>
                    )}
                </div>

                {/* Step 2: OTP & New Password Verification Forms */}
                {isOtpSent && (
                    <div className="w-full flex flex-col items-center space-y-4 mt-4 pt-4 border-t border-slate-800/60">
                        {/* OTP Input */}
                        <div className="group w-full flex items-center gap-3 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:bg-slate-950/70 transition-all duration-300">
                            <KeyRound className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors shrink-0" />
                            <input 
                                onChange={(event) => setEnteredOtp(event.target.value)} 
                                value={enteredOtp} 
                                type="text" 
                                placeholder="Enter OTP" 
                                className="bg-transparent text-slate-100 placeholder-slate-500 outline-none w-full text-sm sm:text-base font-medium tracking-wider" 
                            />
                        </div>

                        {/* New Password Input */}
                        <div className="group w-full flex items-center gap-3 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:bg-slate-950/70 transition-all duration-300">
                            <ShieldCheck className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors shrink-0" />
                            <input 
                                onChange={(event) => setNewPassword(event.target.value)} 
                                value={newPassword} 
                                type="password" 
                                placeholder="Enter new password" 
                                className="bg-transparent text-slate-100 placeholder-slate-500 outline-none w-full text-sm sm:text-base font-medium" 
                            />
                        </div>

                        {/* Confirm Password Input */}
                        <div className="group w-full flex items-center gap-3 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:bg-slate-950/70 transition-all duration-300">
                            <ShieldCheck className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors shrink-0" />
                            <input 
                                onChange={(event) => setConformedPassword(event.target.value)} 
                                value={conformedPassword} 
                                type="password" 
                                placeholder="Confirm new password" 
                                className="bg-transparent text-slate-100 placeholder-slate-500 outline-none w-full text-sm sm:text-base font-medium" 
                            />
                        </div>

                        {/* Submission Button */}
                        <button 
                            onClick={handleUpdatePasswordWithOtp} 
                            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-emerald-900/30 hover:shadow-emerald-500/20 cursor-pointer text-sm sm:text-base tracking-wide"
                        >
                            Update Password
                        </button>
                    </div>
                )}
                
                {/* Modernized Navigation Footer */}
                <div className="flex justify-center items-center gap-1.5 mt-8 text-xs sm:text-sm text-slate-400">
                    <span>Remember Password?</span>
                    <button 
                        onClick={() => navigate("/")} 
                        className="flex items-center gap-1 text-blue-400 font-semibold hover:text-blue-300 hover:underline active:text-blue-500 transition-colors bg-transparent border-none p-0 cursor-pointer"
                    >
                        Click here
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default ForgotPassword;