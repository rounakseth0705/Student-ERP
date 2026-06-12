// import { useState } from "react";
// import homeIcon from "../assets/homeIcon.svg";
// import { useNavigate } from "react-router-dom";

// const CreateTeacherAndStudent = ({ role, createUser }) => {
//     const navigate = useNavigate();
//     const [name, setName] = useState("");
//     const [mobileNumber, setMobileNumber] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [courseCode, setCourseCode] = useState("");
//     const [uniqueId, setUniqueId] = useState("");
//     const handleCreateStudent = async (event) => {
//         event.preventDefault();
//         role !== "admin" ? await createUser(name,mobileNumber,email,password,courseCode,uniqueId,role) : await createUser(name,mobileNumber,email,password,role);
//     }
//     return(
//         <div className="h-screen w-screen flex flex-col items-center">
//             <img onClick={() => navigate("/admin-dashboard")} src={homeIcon} alt="homeIcon" className="fixed left-15 top-4 w-10 h-10 cursor-pointer"/>
//             <h1 className="text-blue-900 text-3xl mt-5 font-semibold">Create {role}</h1>
//             <form className="m-5 bg-blue-300 py-4 px-5 rounded-2xl sm:px-20 md:px-30">
//                 <div>
//                     <h1 className="p-1">Name</h1>
//                     <input onChange={(event) => setName(event.target.value)} value={name} type="text" placeholder="enter name" className="bg-gray-300 w-60 outline-0 rounded-full py-2 px-5 sm:w-80" required/>
//                 </div>
//                 <div className="m-2">
//                     <h1 className="p-1">Mobile no.</h1>
//                     <input type="text" onChange={(event) => setMobileNumber(event.target.value)} value={mobileNumber} placeholder="enter mobile no." className="bg-gray-300 w-60 outline-0 rounded-full py-2 px-5 sm:w-80" required/>
//                 </div>
//                 <div className="m-2">
//                     <h1 className="p-1">Email</h1>
//                     <input onChange={(event) => setEmail(event.target.value)} value={email} type="text" placeholder="enter email" className="bg-gray-300 w-60 outline-0 rounded-full py-2 px-5 sm:w-80" required/>
//                 </div>
//                 <div className="m-2">
//                     <h1 className="p-1">Password</h1>
//                     <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" placeholder="enter password" className="bg-gray-300 w-60 outline-0 rounded-full py-2 px-5 sm:w-80" required/>
//                 </div>
//                 { role !== "admin" &&
//                     <div className="m-2">
//                         <h1 className="p-1">Course code</h1>
//                         <input onChange={(event) => setCourseCode(event.target.value)} value={courseCode} type="text" placeholder="enter course code" className="bg-gray-300 w-60 outline-0 rounded-full py-2 px-5 sm:w-80" required/>
//                     </div>
//                 }
//                 { role !== "admin" &&
//                     <div className="m-2">
//                         <h1 className="p-1">{role==="student" ? "Roll no." : "Employee Id"}</h1>
//                         <input onChange={(event) => setUniqueId(event.target.value)} value={uniqueId} type="text" placeholder={role==="student" ? "enter roll no." : "enter employee id"} className="bg-gray-300 w-60 outline-0 rounded-full py-2 px-5 sm:w-80" required/>
//                     </div>
//                 }
//                 <button onClick={(event) => handleCreateStudent(event)} className="py-2 px-5 my-3 rounded-full bg-white text-blue-950 cursor-pointer">Create {role}</button>
//             </form>
//         </div>
//     )
// }

// export default CreateTeacherAndStudent;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, UserPlus, Eye, EyeOff } from "lucide-react";

const CreateTeacherAndStudent = ({ role, createUser }) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [uniqueId, setUniqueId] = useState("");
    
    /* Interactive Visibility Tracking Hook state */
    const [showPassword, setShowPassword] = useState(false);

    const handleCreateStudent = async (event) => {
        event.preventDefault();
        role !== "admin" 
            ? await createUser(name, mobileNumber, email, password, courseCode, uniqueId, role) 
            : await createUser(name, mobileNumber, email, password, role);
    };

    return (
        <div className="bg-slate-950 min-h-screen text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-blue-600 selection:text-white">
            <div className="max-w-3xl mx-auto space-y-6">
                
                {/* Modern Fixed Header Deck */}
                <div className="flex items-center gap-4 bg-slate-900/40 backdrop-blur-md border border-slate-800/60 p-4 rounded-2xl shadow-xl">
                    <button 
                        type="button"
                        onClick={() => navigate("/admin-dashboard")}
                        className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none border border-slate-800/40 shadow-inner shrink-0"
                        aria-label="Go Home"
                    >
                        <Home className="w-5 h-5" />
                    </button>
                    <h1 className="font-bold text-lg sm:text-xl lg:text-2xl tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent truncate capitalize">
                        Create {role}
                    </h1>
                </div>

                {/* Central Form Workspace Panel */}
                <form 
                    onSubmit={handleCreateStudent}
                    className="bg-slate-900/20 backdrop-blur-xl border border-slate-900 p-5 sm:p-8 rounded-2xl shadow-2xl space-y-6"
                >
                    {/* Balanced 2-Column Responsive Input Matrix */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase pl-1">Name</label>
                            <input 
                                onChange={(event) => setName(event.target.value)} 
                                value={name} 
                                type="text" 
                                placeholder="Enter name" 
                                className="w-full bg-slate-950/50 border border-slate-800/80 rounded-xl py-3 px-4 text-slate-200 placeholder-slate-600 text-sm outline-none font-medium focus:border-blue-500/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.05)] transition-all duration-300" 
                                required
                            />
                        </div>

                        {/* Mobile Number Field */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase pl-1">Mobile no.</label>
                            <input 
                                type="text" 
                                onChange={(event) => setMobileNumber(event.target.value)} 
                                value={mobileNumber} 
                                placeholder="Enter mobile no." 
                                className="w-full bg-slate-950/50 border border-slate-800/80 rounded-xl py-3 px-4 text-slate-200 placeholder-slate-600 text-sm outline-none font-medium focus:border-blue-500/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.05)] transition-all duration-300" 
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase pl-1">Email</label>
                            <input 
                                onChange={(event) => setEmail(event.target.value)} 
                                value={email} 
                                type="email" 
                                placeholder="Enter email" 
                                className="w-full bg-slate-950/50 border border-slate-800/80 rounded-xl py-3 px-4 text-slate-200 placeholder-slate-600 text-sm outline-none font-medium focus:border-blue-500/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.05)] transition-all duration-300" 
                                required
                            />
                        </div>

                        {/* Password Field Container (Wrapped for Relative Absolute Tracking) */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase pl-1">Password</label>
                            <div className="relative flex items-center">
                                <input 
                                    onChange={(event) => setPassword(event.target.value)} 
                                    value={password} 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Enter password" 
                                    className="w-full bg-slate-950/50 border border-slate-800/80 rounded-xl py-3 pl-4 pr-11 text-slate-200 placeholder-slate-600 text-sm outline-none font-medium focus:border-blue-500/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.05)] transition-all duration-300" 
                                    required
                                />
                                {/* Absolute Visibility Action Toggle Panel */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 p-1.5 text-slate-500 hover:text-slate-300 rounded-lg transition-colors cursor-pointer focus:outline-none"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4 shrink-0" />
                                    ) : (
                                        <Eye className="w-4 h-4 shrink-0" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Conditional Course Code Input (Skips on admin roles) */}
                        {role !== "admin" && (
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase pl-1">Course code</label>
                                <input 
                                    onChange={(event) => setCourseCode(event.target.value)} 
                                    value={courseCode} 
                                    type="text" 
                                    placeholder="Enter course code" 
                                    className="w-full bg-slate-950/50 border border-slate-800/80 rounded-xl py-3 px-4 text-slate-200 placeholder-slate-600 text-sm outline-none font-medium focus:border-blue-500/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.05)] transition-all duration-300" 
                                    required
                                />
                            </div>
                        )}

                        {/* Conditional Unique ID Input */}
                        {role !== "admin" && (
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase pl-1">
                                    {role === "student" ? "Roll no." : "Employee Id"}
                                </label>
                                <input 
                                    onChange={(event) => setUniqueId(event.target.value)} 
                                    value={uniqueId} 
                                    type="text" 
                                    placeholder={role === "student" ? "Enter roll no." : "Enter employee id"} 
                                    className="w-full bg-slate-950/50 border border-slate-800/80 rounded-xl py-3 px-4 text-slate-200 placeholder-slate-600 text-sm outline-none font-medium focus:border-blue-500/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.05)] transition-all duration-300" 
                                    required
                                />
                            </div>
                        )}

                    </div>

                    {/* Submit Registration Core Action */}
                    <div className="pt-4 border-t border-slate-900 flex justify-end">
                        <button 
                            type="submit"
                            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-bold text-sm rounded-xl cursor-pointer hover:bg-blue-500 shadow-lg shadow-blue-600/10 active:scale-98 transition-all duration-300 focus:outline-none capitalize"
                        >
                            <UserPlus className="w-4 h-4" />
                            <span>Create {role}</span>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateTeacherAndStudent;