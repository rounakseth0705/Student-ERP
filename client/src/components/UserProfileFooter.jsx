// import { useContext } from "react";
// import { UserContext } from "../context/AuthContext.jsx";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import eyeIcon from "../assets/eyeIcon.svg";

// const UserProfileFooter = () => {
//     const { user, userIdentity, updatePassword, updatePasswordWithIdentifier } = useContext(UserContext);
//     const [isUpdating, setIsUpdating] = useState(false);
//     const [isForgotPassword, setIsForgotPassword] = useState(false);
//     const [isEyeing, setIsEyeing] = useState(false);
//     const [identifier, setIdentifier] = useState("");
//     const [oldPassword, setOldPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [conformNewPassword, setConformNewPassword] = useState("");
//     const handleUpdatePassword = async () => {
//         if (newPassword !== conformNewPassword) {
//             toast.error("Check new password!");
//             return;
//         }
//         if (isForgotPassword) {
//             await updatePasswordWithIdentifier(identifier,conformNewPassword);
//         } else {
//             await updatePassword(oldPassword,conformNewPassword);
//         }
//         setIsUpdating(prev => !prev);
//         setIdentifier("");
//         setOldPassword("");
//         setNewPassword("");
//         setConformNewPassword("");
//         setIsEyeing(false);
//     }
//     const handleForgotPassword = () => {
//         setIsForgotPassword(prev => !prev);
//     }
//     return(
//         <div className="mt-5 text-gray-600 text-center">
//             <span className="flex flex-col items-center gap-3 my-3 font-semibold">
//                 <h1 className="bg-white w-80 rounded-2xl px-4 py-5 shadow-lg text-xs sm:w-110 sm:text-base">Email :- {user.email}</h1>
//                 <h1 className="bg-white w-80 rounded-2xl px-4 py-5 shadow-lg text-xs sm:w-110 sm:text-base">Mobile No. :- {user.mobileNo}</h1>
//             </span>
//             { userIdentity &&
//                 <span className="flex flex-col items-center gap-3 font-semibold mt-3">
//                     <h1 className="bg-white w-80 rounded-2xl px-4 py-5 shadow-lg text-xs sm:w-110 sm:text-base">{user.role === "student" ? `Student ID :- ${userIdentity.studentId}` : `Teacher ID :- ${userIdentity.teacherId}`}</h1>
//                     <h1 className="bg-white w-80 rounded-2xl px-4 py-5 shadow-lg text-xs sm:w-110 sm:text-base">{user.role === "student" ? `Roll No. :- ${userIdentity.rollNo}` : `Employee ID :- ${userIdentity.employeeId}`}</h1>
//                 </span>
//             }
//             <button onClick={() => setIsUpdating(prev => !prev)} className="bg-red-500 text-white mt-10 mb-5 text-xs rounded px-3 py-1 cursor-pointer hover:bg-red-400 transition-all duration-300 ease-in-out sm:text-base">Update Password</button>
//             { isUpdating &&
//                 <div className="flex flex-col items-center py-8">
//                     { isForgotPassword &&
//                         <input onChange={(event) => setIdentifier(event.target.value)} value={identifier} type="text" placeholder="enter email or mobile" className="bg-white my-1 px-2 py-1 outline-0 rounded text-xs sm:text-base"/>
//                     }
//                     { !isForgotPassword &&
//                         <div className="flex justify-center items-center gap-1">
//                             <input onChange={(event) => setOldPassword(event.target.value)} value={oldPassword} type={isEyeing ? "text" : "password"} placeholder="enter old password" className="bg-white my-1 px-2 py-1 outline-0 rounded text-xs sm:text-base"/>
//                             <span onClick={() => setIsEyeing(prev => !prev)}>
//                                 <img src={eyeIcon} alt="eyeIcon" className="w-4 h-4 cursor-pointer"/>
//                             </span>
//                         </div>
//                     }
//                     <div className="flex justify-center items-center gap-1">
//                         <input onChange={(event) => setNewPassword(event.target.value)} value={newPassword} type={isEyeing ? "text" : "password"} placeholder="enter new password" className="bg-white my-1 px-2 py-1 outline-0 rounded text-xs sm:text-base"/>
//                         <span onClick={() => setIsEyeing(prev => !prev)}>
//                             <img src={eyeIcon} alt="eyeIcon" className="w-4 h-4 cursor-pointer"/>
//                         </span>
//                     </div>
//                     <div className="flex justify-center items-center gap-1">
//                         <input onChange={(event) => setConformNewPassword(event.target.value)} value={conformNewPassword} type={isEyeing ? "text" : "password"} placeholder="conform new password" className="bg-white my-1 px-2 py-1 outline-0 rounded text-xs sm:text-base"/>
//                         <span onClick={() => setIsEyeing(prev => !prev)}>
//                             <img src={eyeIcon} alt="eyeIcon" className="w-4 h-4 cursor-pointer"/>
//                         </span>
//                     </div>
//                     <button onClick={handleUpdatePassword} className="bg-green-500 text-white mt-3 px-3 py-1 cursor-pointer rounded hover:bg-green-400 transition-all duration-300 ease-in-out text-xs sm:text-base">Set new password</button>
//                     <h1 onClick={handleForgotPassword} className="mt-2 underline cursor-pointer text-xs sm:text-base">{isForgotPassword ? "Try another way?" : "Forgot password?"}</h1>
//                 </div>
//             }
//         </div>
//     )
// }

// export default UserProfileFooter;

// import { useContext, useState } from "react";
// import { UserContext } from "../context/AuthContext.jsx";
// import toast from "react-hot-toast";
// import { Eye, EyeOff, Mail, Phone, Shield, Fingerprint, KeyRound } from "lucide-react";

// const UserProfileFooter = () => {
//     const { user, userIdentity, updatePassword, updatePasswordWithIdentifier } = useContext(UserContext);
//     const [isUpdating, setIsUpdating] = useState(false);
//     const [isForgotPassword, setIsForgotPassword] = useState(false);
//     const [isEyeing, setIsEyeing] = useState(false);
//     const [identifier, setIdentifier] = useState("");
//     const [oldPassword, setOldPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [conformNewPassword, setConformNewPassword] = useState("");

//     const handleUpdatePassword = async () => {
//         if (newPassword !== conformNewPassword) {
//             toast.error("Check new password!");
//             return;
//         }
//         if (isForgotPassword) {
//             await updatePasswordWithIdentifier(identifier, conformNewPassword);
//         } else {
//             await updatePassword(oldPassword, conformNewPassword);
//         }
//         setIsUpdating(prev => !prev);
//         setIdentifier("");
//         setOldPassword("");
//         setNewPassword("");
//         setConformNewPassword("");
//         setIsEyeing(false);
//     };

//     const handleForgotPassword = () => {
//         setIsForgotPassword(prev => !prev);
//     };

//     return (
//         <div className="bg-slate-950 text-slate-300 font-sans p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
            
//             {/* Core Contact Cards Matrix */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex items-center gap-4 bg-slate-900/40 border border-slate-900 p-4 rounded-xl shadow-lg">
//                     <Mail className="w-5 h-5 text-slate-500 shrink-0" />
//                     <div className="truncate">
//                         <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Email Address</p>
//                         <p className="text-sm font-semibold text-slate-200 truncate">{user?.email}</p>
//                     </div>
//                 </div>
//                 <div className="flex items-center gap-4 bg-slate-900/40 border border-slate-900 p-4 rounded-xl shadow-lg">
//                     <Phone className="w-5 h-5 text-slate-500 shrink-0" />
//                     <div className="truncate">
//                         <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Mobile Number</p>
//                         <p className="text-sm font-semibold text-slate-200 truncate">{user?.mobileNo}</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Conditional User Identity Display Blocks */}
//             {userIdentity && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
//                     <div className="flex items-center gap-4 bg-slate-900/40 border border-slate-900 p-4 rounded-xl shadow-lg">
//                         <Shield className="w-5 h-5 text-slate-500 shrink-0" />
//                         <div className="truncate">
//                             <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
//                                 {user.role === "student" ? "Student ID" : "Teacher ID"}
//                             </p>
//                             <p className="text-sm font-semibold text-slate-200 truncate">
//                                 {user.role === "student" ? userIdentity.studentId : userIdentity.teacherId}
//                             </p>
//                         </div>
//                     </div>
//                     <div className="flex items-center gap-4 bg-slate-900/40 border border-slate-900 p-4 rounded-xl shadow-lg">
//                         <Fingerprint className="w-5 h-5 text-slate-500 shrink-0" />
//                         <div className="truncate">
//                             <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
//                                 {user.role === "student" ? "Roll No." : "Employee ID"}
//                             </p>
//                             <p className="text-sm font-semibold text-slate-200 truncate">
//                                 {user.role === "student" ? userIdentity.rollNo : userIdentity.employeeId}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Password Utility Toggle Anchor */}
//             <div className="flex justify-center pt-6">
//                 <button 
//                     onClick={() => setIsUpdating(prev => !prev)} 
//                     className="flex items-center gap-2 px-5 py-2.5 bg-rose-950/40 text-rose-400 border border-rose-900/60 rounded-xl font-semibold text-xs sm:text-sm cursor-pointer hover:bg-rose-900/60 hover:text-rose-300 transition-all duration-300 active:scale-98"
//                 >
//                     <KeyRound className="w-4 h-4" />
//                     <span>{isUpdating ? "Close Panel" : "Update Account Password"}</span>
//                 </button>
//             </div>

//             {/* Interactive Passcode Mutation Terminal */}
//             {isUpdating && (
//                 <div className="max-w-md mx-auto bg-slate-900/20 border border-slate-900/60 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-3 duration-300">
                    
//                     {/* Identifier field for Forgotten Passwords */}
//                     {isForgotPassword ? (
//                         <div className="space-y-1.5">
//                             <input 
//                                 onChange={(event) => setIdentifier(event.target.value)} 
//                                 value={identifier} 
//                                 type="text" 
//                                 placeholder="Enter email or mobile" 
//                                 className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl py-2.5 px-4 text-slate-200 placeholder-slate-600 text-sm outline-none focus:border-blue-500/50 transition-all duration-300"
//                             />
//                         </div>
//                     ) : (
//                         /* Old Password Input Block */
//                         <div className="space-y-1.5">
//                             <div className="relative flex items-center">
//                                 <input 
//                                     onChange={(event) => setOldPassword(event.target.value)} 
//                                     value={oldPassword} 
//                                     type={isEyeing ? "text" : "password"} 
//                                     placeholder="Enter old password" 
//                                     className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl py-2.5 pl-4 pr-11 text-slate-200 placeholder-slate-600 text-sm outline-none focus:border-blue-500/50 transition-all duration-300"
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setIsEyeing(prev => !prev)}
//                                     className="absolute right-3 p-1 text-slate-500 hover:text-slate-300 rounded transition-colors focus:outline-none cursor-pointer"
//                                 >
//                                     {isEyeing ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                                 </button>
//                             </div>
//                         </div>
//                     )}

//                     {/* New Password Input Block */}
//                     <div className="space-y-1.5">
//                         <div className="relative flex items-center">
//                             <input 
//                                 onChange={(event) => setNewPassword(event.target.value)} 
//                                 value={newPassword} 
//                                 type={isEyeing ? "text" : "password"} 
//                                 placeholder="Enter new password" 
//                                 className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl py-2.5 pl-4 pr-11 text-slate-200 placeholder-slate-600 text-sm outline-none focus:border-blue-500/50 transition-all duration-300"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setIsEyeing(prev => !prev)}
//                                 className="absolute right-3 p-1 text-slate-500 hover:text-slate-300 rounded transition-colors focus:outline-none cursor-pointer"
//                             >
//                                 {isEyeing ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                             </button>
//                         </div>
//                     </div>

//                     {/* Confirm New Password Input Block */}
//                     <div className="space-y-1.5">
//                         <div className="relative flex items-center">
//                             <input 
//                                 onChange={(event) => setConformNewPassword(event.target.value)} 
//                                 value={conformNewPassword} 
//                                 type={isEyeing ? "text" : "password"} 
//                                 placeholder="Confirm new password" 
//                                 className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl py-2.5 pl-4 pr-11 text-slate-200 placeholder-slate-600 text-sm outline-none focus:border-blue-500/50 transition-all duration-300"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setIsEyeing(prev => !prev)}
//                                 className="absolute right-3 p-1 text-slate-500 hover:text-slate-300 rounded transition-colors focus:outline-none cursor-pointer"
//                             >
//                                 {isEyeing ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                             </button>
//                         </div>
//                     </div>

//                     {/* Operations Submission Panel */}
//                     <div className="pt-2 space-y-3">
//                         <button 
//                             onClick={handleUpdatePassword} 
//                             className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer shadow-lg shadow-blue-600/10 active:scale-98 transition-all duration-300 focus:outline-none"
//                         >
//                             Set New Password
//                         </button>
                        
//                         <p 
//                             onClick={handleForgotPassword} 
//                             className="text-center text-xs text-slate-500 hover:text-slate-300 underline underline-offset-4 cursor-pointer transition-colors"
//                         >
//                             {isForgotPassword ? "Try another way?" : "Forgot password?"}
//                         </p>
//                     </div>

//                 </div>
//             )}
//         </div>
//     );
// };

// export default UserProfileFooter;

import React, { useContext, useState } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Phone, Shield, Fingerprint, KeyRound } from "lucide-react";

const UserProfileFooter = () => {
    const { user, userIdentity, updatePassword, updatePasswordWithIdentifier } = useContext(UserContext);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isEyeing, setIsEyeing] = useState(false);
    const [identifier, setIdentifier] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [conformNewPassword, setConformNewPassword] = useState("");

    const handleUpdatePassword = async () => {
        if (!newPassword || !conformNewPassword) {
            toast.error("Password fields cannot be blank");
            return;
        }
        if (newPassword !== conformNewPassword) {
            toast.error("Check new password!");
            return;
        }
        if (isForgotPassword) {
            await updatePasswordWithIdentifier(identifier, conformNewPassword);
        } else {
            await updatePassword(oldPassword, conformNewPassword);
        }
        setIsUpdating(prev => !prev);
        setIdentifier("");
        setOldPassword("");
        setNewPassword("");
        setConformNewPassword("");
        setIsEyeing(false);
    };

    const handleForgotPassword = () => {
        setIsForgotPassword(prev => !prev);
    };

    return (
        <div className="bg-slate-950 text-slate-300 font-sans p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-4">
            
            {/* Core Contact Cards Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 bg-[#090f1c] border border-slate-900 p-4 rounded-xl shadow-lg min-w-0">
                    <Mail className="w-5 h-5 text-slate-500 shrink-0" />
                    <div className="min-w-0 flex-1">
                        <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Email Address</p>
                        <p className="text-sm font-semibold text-slate-200 truncate">{user?.email || "N/A"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-[#090f1c] border border-slate-900 p-4 rounded-xl shadow-lg min-w-0">
                    <Phone className="w-5 h-5 text-slate-500 shrink-0" />
                    <div className="min-w-0 flex-1">
                        <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Mobile Number</p>
                        <p className="text-sm font-semibold text-slate-200 truncate">{user?.mobileNo || "N/A"}</p>
                    </div>
                </div>
            </div>

            {/* Conditional User Identity Display Blocks */}
            {userIdentity && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 bg-[#090f1c] border border-slate-900 p-4 rounded-xl shadow-lg min-w-0">
                        <Shield className="w-5 h-5 text-slate-500 shrink-0" />
                        <div className="min-w-0 flex-1">
                            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                                {user?.role === "student" ? "Student ID" : "Teacher ID"}
                            </p>
                            <p className="text-sm font-semibold text-slate-200 truncate">
                                {user?.role === "student" ? userIdentity.studentId : userIdentity.teacherId}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-[#090f1c] border border-slate-900 p-4 rounded-xl shadow-lg min-w-0">
                        <Fingerprint className="w-5 h-5 text-slate-500 shrink-0" />
                        <div className="min-w-0 flex-1">
                            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                                {user?.role === "student" ? "Roll No." : "Employee ID"}
                            </p>
                            <p className="text-sm font-semibold text-slate-200 truncate">
                                {user?.role === "student" ? userIdentity.rollNo : userIdentity.employeeId}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Password Utility Toggle Anchor */}
            <div className="flex justify-center pt-6">
                <button 
                    onClick={() => setIsUpdating(prev => !prev)} 
                    className="flex items-center gap-2 px-5 py-2.5 bg-rose-950/40 text-rose-400 border border-rose-900/40 rounded-xl font-semibold text-xs sm:text-sm cursor-pointer hover:bg-rose-900/60 hover:text-rose-300 transition-all duration-200 active:scale-95 focus:outline-none select-none"
                >
                    <KeyRound className="w-4 h-4" />
                    <span>{isUpdating ? "Close Terminal Panel" : "Update Account Password"}</span>
                </button>
            </div>

            {/* Interactive Passcode Mutation Terminal */}
            {isUpdating && (
                <div className="max-w-md mx-auto bg-[#090f1c] border border-slate-900 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
                    
                    {/* Identifier field for Forgotten Passwords */}
                    {isForgotPassword ? (
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-1">Verification Handle</label>
                            <input 
                                onChange={(event) => setIdentifier(event.target.value)} 
                                value={identifier} 
                                type="text" 
                                placeholder="Enter email or mobile handle" 
                                className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl py-2.5 px-4 text-slate-200 placeholder-slate-600 text-sm outline-none focus:border-blue-500/50 transition-all duration-150"
                            />
                        </div>
                    ) : (
                        /* Old Password Input Block */
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-1">Current Passcode</label>
                            <div className="relative flex items-center">
                                <input 
                                    onChange={(event) => setOldPassword(event.target.value)} 
                                    value={oldPassword} 
                                    type={isEyeing ? "text" : "password"} 
                                    placeholder="Enter old password" 
                                    className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl py-2.5 pl-4 pr-11 text-slate-200 placeholder-slate-600 text-sm outline-none focus:border-blue-500/50 transition-all duration-150"
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsEyeing(prev => !prev)}
                                    className="absolute right-3 p-1 text-slate-500 hover:text-slate-300 rounded transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
                                >
                                    {isEyeing ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* New Password Input Block */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-1">Target Passcode</label>
                        <div className="relative flex items-center">
                            <input 
                                onChange={(event) => setNewPassword(event.target.value)} 
                                value={newPassword} 
                                type={isEyeing ? "text" : "password"} 
                                placeholder="Enter new password" 
                                className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl py-2.5 pl-4 pr-11 text-slate-200 placeholder-slate-600 text-sm outline-none focus:border-blue-500/50 transition-all duration-150"
                            />
                            <button
                                type="button"
                                onClick={() => setIsEyeing(prev => !prev)}
                                className="absolute right-3 p-1 text-slate-500 hover:text-slate-300 rounded transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
                            >
                                {isEyeing ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm New Password Input Block */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-1">Verify Target Passcode</label>
                        <div className="relative flex items-center">
                            <input 
                                onChange={(event) => setConformNewPassword(event.target.value)} 
                                value={conformNewPassword} 
                                type={isEyeing ? "text" : "password"} 
                                placeholder="Confirm new password" 
                                className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl py-2.5 pl-4 pr-11 text-slate-200 placeholder-slate-600 text-sm outline-none focus:border-blue-500/50 transition-all duration-150"
                            />
                            <button
                                type="button"
                                onClick={() => setIsEyeing(prev => !prev)}
                                className="absolute right-3 p-1 text-slate-500 hover:text-slate-300 rounded transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
                            >
                                {isEyeing ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Operations Submission Panel */}
                    <div className="pt-2 space-y-3">
                        <button 
                            type="button"
                            onClick={handleUpdatePassword} 
                            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer shadow-lg shadow-blue-950/50 active:scale-95 transition-all duration-150 focus:outline-none"
                        >
                            Commit New Security Key
                        </button>
                        
                        <p 
                            onClick={handleForgotPassword} 
                            className="text-center text-xs text-slate-500 hover:text-slate-300 underline underline-offset-4 cursor-pointer transition-colors select-none"
                        >
                            {isForgotPassword ? "Return to default standard update?" : "Forgot your original security key?"}
                        </p>
                    </div>

                </div>
            )}
        </div>
    );
};

export default UserProfileFooter;