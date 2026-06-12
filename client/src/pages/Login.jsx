// import { useContext, useState } from "react";
// import userIcon from "../assets/userIcon.svg";
// import passwordIcon from "../assets/passwordIcon.svg";
// import { UserContext } from "../context/AuthContext.jsx";
// import CreateFirstAdmin from "../components/CreateFirstAdmin.jsx";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const { login, isAdminExists } = useContext(UserContext);
//     const navigate = useNavigate();
//     const [role, setRole] = useState("student");
//     const [userId, setUserId] = useState("");
//     const [password, setPassword] = useState("");
//     const getRole = (event) => {
//         setRole(event.target.value);
//     }
//     const handleLogin = async (event) => {
//         event.preventDefault();
//         await login(userId,password,role);
//     }
//     return isAdminExists ? (
//         <div className="flex flex-col justify-center items-center h-screen w-screen bg-[#5C6FA3]">
//             <h1 className="text-white text-3xl font-semibold mb-5 sm:text-5xl sm:font-extrabold sm:mb-10">{role.toUpperCase()} LOGIN</h1>
//             <form className="flex flex-col justify-center items-center">
//                 <div className="flex justify-center items-center gap-1 m-2 sm:gap-5 sm:m-5">
//                     <img src={userIcon} alt="userIcon" className="h-15 w-15 sm:h-20 sm:w-20"/>
//                     <input onChange={(event) => setUserId(event.target.value)} value={userId} type="text" placeholder={ role==="student" ? "Student Id" : role==="teacher" ? "Teacher Id" : "Email or Mobile no." } className="bg-gray-400 text-blue-950 outline-0 w-62 py-3 px-5 rounded-4xl sm:w-100 sm:p-5 md:w-120" />
//                 </div>
//                 <div className="flex justify-center items-center gap-1 m-2 sm:gap-5 sm:m-5">
//                     <img src={passwordIcon} alt="passwordIcon" className="h-15 w-15 sm:h-20 sm:w-20"/>
//                     <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" placeholder="Password" className="bg-gray-400 text-blue-950 outline-0 w-62 py-3 px-5 rounded-4xl sm:w-100 sm:p-5 md:w-120" />
//                 </div>
//                 <button onClick={(event) => handleLogin(event)} className="bg-white text-blue-950 font-semibold mt-5 py-2 px-10 rounded-full hover:opacity-75 transition-all duration-500 ease-in-out cursor-pointer sm:text-3xl sm:py-5 sm:px-20">LOGIN</button>
//             </form>
//             <select onChange={getRole} className="mt-5 p-2 outline-0 text-white bg-blue-950 rounded cursor-pointer">
//                 <option value="student">student</option>
//                 <option value="teacher">teacher</option>
//                 <option value="admin">admin</option>
//             </select>
//             <span className="flex justify-center items-center gap-1 mt-3">
//                 <h1>Forgot Password?</h1>
//                 <h1 onClick={() => navigate("forgot-password")} className="text-blue-950 cursor-pointer hover:underline active:underline">click here</h1>
//             </span>
//         </div>
//     ) : (
//         <CreateFirstAdmin/>
//     )
// }

// export default Login;

// import { useContext, useState } from "react";
// import { User, Lock } from "lucide-react"; // Imported Lucide icons
// import { UserContext } from "../context/AuthContext.jsx";
// import CreateFirstAdmin from "../components/CreateFirstAdmin.jsx";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const { login, isAdminExists } = useContext(UserContext);
//     const navigate = useNavigate();
//     const [role, setRole] = useState("student");
//     const [userId, setUserId] = useState("");
//     const [password, setPassword] = useState("");
    
//     const getRole = (event) => {
//         setRole(event.target.value);
//     }
    
//     const handleLogin = async (event) => {
//         event.preventDefault();
//         await login(userId, password, role);
//     }

//     return isAdminExists ? (
//         <div className="flex flex-col justify-center items-center min-h-screen w-screen bg-slate-900 p-4 font-sans selection:bg-blue-500 selection:text-white">
//             <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-8 rounded-2xl shadow-2xl flex flex-col items-center transition-all duration-300">
                
//                 {/* Header Title */}
//                 <h1 className="text-white text-2xl sm:text-3xl font-bold mb-8 tracking-wide text-center">
//                     {role.toUpperCase()} LOGIN
//                 </h1>
                
//                 {/* Login Form */}
//                 <form onSubmit={handleLogin} className="w-full flex flex-col items-center space-y-5">
//                     {/* User ID Input */}
//                     <div className="w-full flex items-center gap-3 bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
//                         <User className="h-5 w-5 text-slate-400 shrink-0" />
//                         <input 
//                             onChange={(event) => setUserId(event.target.value)} 
//                             value={userId} 
//                             type="text" 
//                             placeholder={role === "student" ? "Student Id" : role === "teacher" ? "Teacher Id" : "Email or Mobile no."} 
//                             className="bg-transparent text-slate-100 placeholder-slate-400 outline-none w-full text-sm sm:text-base" 
//                         />
//                     </div>
                    
//                     {/* Password Input */}
//                     <div className="w-full flex items-center gap-3 bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
//                         <Lock className="h-5 w-5 text-slate-400 shrink-0" />
//                         <input 
//                             onChange={(event) => setPassword(event.target.value)} 
//                             value={password} 
//                             type="password" 
//                             placeholder="Password" 
//                             className="bg-transparent text-slate-100 placeholder-slate-400 outline-none w-full text-sm sm:text-base" 
//                         />
//                     </div>
                    
//                     {/* Login Button */}
//                     <button 
//                         onClick={(event) => handleLogin(event)} 
//                         className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-blue-600/20 cursor-pointer text-sm sm:text-base mt-2"
//                     >
//                         LOGIN
//                     </button>
//                 </form>
                
//                 {/* Role Selector */}
//                 <div className="w-full flex flex-col mt-6">
//                     <label className="text-xs text-slate-400 mb-1.5 font-medium ml-1">Select Login Role</label>
//                     <select 
//                         onChange={getRole} 
//                         value={role}
//                         className="w-full p-3 outline-none text-slate-200 bg-slate-900 border border-slate-700 rounded-xl cursor-pointer text-sm focus:border-blue-500 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239cbdff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.65rem_auto] bg-[right_1rem_center] bg-no-repeat"
//                     >
//                         <option value="student">Student</option>
//                         <option value="teacher">Teacher</option>
//                         <option value="admin">Admin</option>
//                     </select>
//                 </div>
                
//                 {/* Forgot Password Links */}
//                 <div className="flex justify-center items-center gap-1.5 mt-8 text-xs sm:text-sm text-slate-400">
//                     <span>Forgot Password?</span>
//                     <button 
//                         onClick={() => navigate("forgot-password")} 
//                         className="text-blue-400 font-medium hover:text-blue-300 hover:underline active:text-blue-500 transition-colors bg-transparent border-none p-0 cursor-pointer"
//                     >
//                         click here
//                     </button>
//                 </div>
                
//             </div>
//         </div>
//     ) : (
//         <CreateFirstAdmin/>
//     )
// }

// export default Login;

// import { useContext, useState } from "react";
// import { User, Lock, ChevronDown } from "lucide-react"; // Added ChevronDown for custom select arrow
// import { UserContext } from "../context/AuthContext.jsx";
// import CreateFirstAdmin from "../components/CreateFirstAdmin.jsx";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const { login, isAdminExists } = useContext(UserContext);
//     const navigate = useNavigate();
//     const [role, setRole] = useState("student");
//     const [userId, setUserId] = useState("");
//     const [password, setPassword] = useState("");
    
//     const getRole = (event) => {
//         setRole(event.target.value);
//     }
    
//     const handleLogin = async (event) => {
//         event.preventDefault();
//         await login(userId, password, role);
//     }

//     return isAdminExists ? (
//         <div className="relative flex flex-col justify-center items-center min-h-screen w-screen bg-slate-950 p-4 font-sans selection:bg-blue-600 selection:text-white overflow-hidden">
            
//             {/* Ambient Background Glows */}
//             <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
//             <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />

//             {/* Premium Glassmorphic Login Card */}
//             <div className="relative w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-700/40 p-8 sm:p-10 rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] flex flex-col items-center z-10">
                
//                 {/* Header Title with Subtitle */}
//                 <div className="text-center mb-8">
//                     <h1 className="text-white text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
//                         {role.toUpperCase()} LOGIN
//                     </h1>
//                     <p className="text-xs text-slate-400 mt-1.5 tracking-wide">Welcome back! Please enter your details.</p>
//                 </div>
                
//                 {/* Login Form */}
//                 <form onSubmit={handleLogin} className="w-full flex flex-col items-center space-y-5">
//                     {/* User ID Input */}
//                     <div className="group w-full flex items-center gap-3 bg-slate-950/40 border border-slate-800 rounded-xl px-4 py-3.5 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:bg-slate-950/60 transition-all duration-300">
//                         <User className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors shrink-0" />
//                         <input 
//                             onChange={(event) => setUserId(event.target.value)} 
//                             value={userId} 
//                             type="text" 
//                             placeholder={role === "student" ? "Student ID" : role === "teacher" ? "Teacher ID" : "Email or Mobile no."} 
//                             className="bg-transparent text-slate-100 placeholder-slate-500 outline-none w-full text-sm sm:text-base font-medium" 
//                         />
//                     </div>
                    
//                     {/* Password Input */}
//                     <div className="group w-full flex items-center gap-3 bg-slate-950/40 border border-slate-800 rounded-xl px-4 py-3.5 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:bg-slate-950/60 transition-all duration-300">
//                         <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors shrink-0" />
//                         <input 
//                             onChange={(event) => setPassword(event.target.value)} 
//                             value={password} 
//                             type="password" 
//                             placeholder="Password" 
//                             className="bg-transparent text-slate-100 placeholder-slate-500 outline-none w-full text-sm sm:text-base font-medium" 
//                         />
//                     </div>
                    
//                     {/* Login Button with Premium Glow */}
//                     <button 
//                         onClick={(event) => handleLogin(event)} 
//                         className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-blue-900/30 hover:shadow-blue-500/20 cursor-pointer text-sm sm:text-base mt-2 tracking-wide"
//                     >
//                         Sign In
//                     </button>
//                 </form>
                
//                 {/* Custom Role Selector Container */}
//                 <div className="w-full flex flex-col mt-6 relative">
//                     <label className="text-xs text-slate-400 mb-1.5 font-medium ml-1">Select Account Type</label>
//                     <div className="relative w-full">
//                         <select 
//                             onChange={getRole} 
//                             value={role}
//                             className="w-full p-3.5 pr-10 outline-none text-slate-200 bg-slate-950/40 border border-slate-800 rounded-xl cursor-pointer text-sm focus:border-blue-500 focus:bg-slate-950/80 appearance-none transition-all duration-300 font-medium"
//                         >
//                             <option value="student" className="bg-slate-900 text-slate-200">Student</option>
//                             <option value="teacher" className="bg-slate-900 text-slate-200">Teacher</option>
//                             <option value="admin" className="bg-slate-900 text-slate-200">Admin</option>
//                         </select>
//                         <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
//                     </div>
//                 </div>
                
//                 {/* Modernized Footer Link */}
//                 <div className="flex justify-center items-center gap-1.5 mt-8 text-xs sm:text-sm text-slate-400">
//                     <span>Forgot Password?</span>
//                     <button 
//                         onClick={() => navigate("forgot-password")} 
//                         className="text-blue-400 font-semibold hover:text-blue-300 hover:underline active:text-blue-500 transition-colors bg-transparent border-none p-0 cursor-pointer"
//                     >
//                         Reset here
//                     </button>
//                 </div>
                
//             </div>
//         </div>
//     ) : (
//         <CreateFirstAdmin/>
//     )
// }

// export default Login;

// import { useContext, useState } from "react";
// import { User, Lock, ChevronDown } from "lucide-react"; 
// import { UserContext } from "../context/AuthContext.jsx";
// import CreateFirstAdmin from "../components/CreateFirstAdmin.jsx";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const { login, isAdminExists } = useContext(UserContext);
//     const navigate = useNavigate();
//     const [role, setRole] = useState("student");
//     const [userId, setUserId] = useState("");
//     const [password, setPassword] = useState("");
    
//     const getRole = (event) => {
//         setRole(event.target.value);
//     }
    
//     const handleLogin = async (event) => {
//         event.preventDefault();
//         await login(userId, password, role);
//     }

//     return isAdminExists ? (
//         <div className="relative flex flex-col justify-center items-center min-h-screen w-screen p-4 font-sans selection:bg-blue-600 selection:text-white overflow-hidden bg-slate-950">
            
//             {/* Blurry Background Image Layer */}
//             <div 
//                 className="absolute inset-0 w-full h-full bg-cover bg-center scale-105 blur-md opacity-40 pointer-events-none"
//                 style={{ backgroundImage: `url('http://googleusercontent.com/image_collection/image_retrieval/3502508796826645335_0')` }}
//             />
            
//             {/* Ambient Background Glows on top of image for depth */}
//             <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/15 rounded-full blur-[90px] pointer-events-none" />
//             <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-600/15 rounded-full blur-[90px] pointer-events-none" />

//             {/* Premium Glassmorphic Login Card */}
//             <div className="relative w-full max-w-md bg-slate-900/60 backdrop-blur-2xl border border-slate-700/40 p-8 sm:p-10 rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.6)] flex flex-col items-center z-10">
                
//                 {/* Header Title with Subtitle */}
//                 <div className="text-center mb-8">
//                     <h1 className="text-white text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
//                         {role.toUpperCase()} LOGIN
//                     </h1>
//                     <p className="text-xs text-slate-400 mt-1.5 tracking-wide">Welcome back! Please enter your details.</p>
//                 </div>
                
//                 {/* Login Form */}
//                 <form onSubmit={handleLogin} className="w-full flex flex-col items-center space-y-5">
//                     {/* User ID Input */}
//                     <div className="group w-full flex items-center gap-3 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:bg-slate-950/70 transition-all duration-300">
//                         <User className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors shrink-0" />
//                         <input 
//                             onChange={(event) => setUserId(event.target.value)} 
//                             value={userId} 
//                             type="text" 
//                             placeholder={role === "student" ? "Student ID" : role === "teacher" ? "Teacher ID" : "Email or Mobile no."} 
//                             className="bg-transparent text-slate-100 placeholder-slate-500 outline-none w-full text-sm sm:text-base font-medium" 
//                         />
//                     </div>
                    
//                     {/* Password Input */}
//                     <div className="group w-full flex items-center gap-3 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:bg-slate-950/70 transition-all duration-300">
//                         <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors shrink-0" />
//                         <input 
//                             onChange={(event) => setPassword(event.target.value)} 
//                             value={password} 
//                             type="password" 
//                             placeholder="Password" 
//                             className="bg-transparent text-slate-100 placeholder-slate-500 outline-none w-full text-sm sm:text-base font-medium" 
//                         />
//                     </div>
                    
//                     {/* Login Button with Premium Glow */}
//                     <button 
//                         onClick={(event) => handleLogin(event)} 
//                         className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-blue-900/30 hover:shadow-blue-500/20 cursor-pointer text-sm sm:text-base mt-2 tracking-wide"
//                     >
//                         Sign In
//                     </button>
//                 </form>
                
//                 {/* Custom Role Selector Container */}
//                 <div className="w-full flex flex-col mt-6 relative">
//                     <label className="text-xs text-slate-400 mb-1.5 font-medium ml-1">Select Account Type</label>
//                     <div className="relative w-full">
//                         <select 
//                             onChange={getRole} 
//                             value={role}
//                             className="w-full p-3.5 pr-10 outline-none text-slate-200 bg-slate-950/50 border border-slate-800 rounded-xl cursor-pointer text-sm focus:border-blue-500 focus:bg-slate-950/80 appearance-none transition-all duration-300 font-medium"
//                         >
//                             <option value="student" className="bg-slate-900 text-slate-200">Student</option>
//                             <option value="teacher" className="bg-slate-900 text-slate-200">Teacher</option>
//                             <option value="admin" className="bg-slate-900 text-slate-200">Admin</option>
//                         </select>
//                         <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
//                     </div>
//                 </div>
                
//                 {/* Modernized Footer Link */}
//                 <div className="flex justify-center items-center gap-1.5 mt-8 text-xs sm:text-sm text-slate-400">
//                     <span>Forgot Password?</span>
//                     <button 
//                         onClick={() => navigate("forgot-password")} 
//                         className="text-blue-400 font-semibold hover:text-blue-300 hover:underline active:text-blue-500 transition-colors bg-transparent border-none p-0 cursor-pointer"
//                     >
//                         Reset here
//                     </button>
//                 </div>
                
//             </div>
//         </div>
//     ) : (
//         <CreateFirstAdmin/>
//     )
// }

// export default Login;

import { useContext, useState } from "react";
import { User, Lock, ChevronDown, Eye, EyeOff } from "lucide-react"; // Imported Eye and EyeOff icons
import { UserContext } from "../context/AuthContext.jsx";
import CreateFirstAdmin from "../components/CreateFirstAdmin.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login, isAdminExists } = useContext(UserContext);
    const navigate = useNavigate();
    const [role, setRole] = useState("student");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // New state for password visibility
    
    const getRole = (event) => {
        setRole(event.target.value);
    }
    
    const handleLogin = async (event) => {
        event.preventDefault();
        await login(userId, password, role);
    }

    return isAdminExists ? (
        <div className="relative flex flex-col justify-center items-center min-h-screen w-screen p-4 font-sans selection:bg-blue-600 selection:text-white overflow-hidden bg-slate-950">
            
            {/* Blurry Background Image Layer */}
            <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center scale-105 blur-md opacity-40 pointer-events-none"
                style={{ backgroundImage: `url('http://googleusercontent.com/image_collection/image_retrieval/3502508796826645335_0')` }}
            />
            
            {/* Ambient Background Glows on top of image for depth */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/15 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-600/15 rounded-full blur-[90px] pointer-events-none" />

            {/* Premium Glassmorphic Login Card */}
            <div className="relative w-full max-w-md bg-slate-900/60 backdrop-blur-2xl border border-slate-700/40 p-8 sm:p-10 rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.6)] flex flex-col items-center z-10">
                
                {/* Header Title with Subtitle */}
                <div className="text-center mb-8">
                    <h1 className="text-white text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        {role.toUpperCase()} LOGIN
                    </h1>
                    <p className="text-xs text-slate-400 mt-1.5 tracking-wide">Welcome back! Please enter your details.</p>
                </div>
                
                {/* Login Form */}
                <form onSubmit={handleLogin} className="w-full flex flex-col items-center space-y-5">
                    {/* User ID Input */}
                    <div className="group w-full flex items-center gap-3 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:bg-slate-950/70 transition-all duration-300">
                        <User className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors shrink-0" />
                        <input 
                            onChange={(event) => setUserId(event.target.value)} 
                            value={userId} 
                            type="text" 
                            placeholder={role === "student" ? "Student ID" : role === "teacher" ? "Teacher ID" : "Email or Mobile no."} 
                            className="bg-transparent text-slate-100 placeholder-slate-500 outline-none w-full text-sm sm:text-base font-medium" 
                        />
                    </div>
                    
                    {/* Password Input Wrapper */}
                    <div className="group w-full flex items-center gap-3 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:bg-slate-950/70 transition-all duration-300">
                        <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors shrink-0" />
                        <input 
                            onChange={(event) => setPassword(event.target.value)} 
                            value={password} 
                            type={showPassword ? "text" : "password"} // Dynamic type switching
                            placeholder="Password" 
                            className="bg-transparent text-slate-100 placeholder-slate-500 outline-none w-full text-sm sm:text-base font-medium" 
                        />
                        {/* Eye Toggle Trigger */}
                        <button
                            type="button" // Important: prevents form validation submissions
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-slate-500 hover:text-slate-300 active:text-blue-400 focus:outline-none transition-colors ml-auto cursor-pointer p-0.5 shrink-0"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                    
                    {/* Login Button with Premium Glow */}
                    <button 
                        onClick={(event) => handleLogin(event)} 
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-blue-900/30 hover:shadow-blue-500/20 cursor-pointer text-sm sm:text-base mt-2 tracking-wide"
                    >
                        Sign In
                    </button>
                </form>
                
                {/* Custom Role Selector Container */}
                <div className="w-full flex flex-col mt-6 relative">
                    <label className="text-xs text-slate-400 mb-1.5 font-medium ml-1">Select Account Type</label>
                    <div className="relative w-full">
                        <select 
                            onChange={getRole} 
                            value={role}
                            className="w-full p-3.5 pr-10 outline-none text-slate-200 bg-slate-950/50 border border-slate-800 rounded-xl cursor-pointer text-sm focus:border-blue-500 focus:bg-slate-950/80 appearance-none transition-all duration-300 font-medium"
                        >
                            <option value="student" className="bg-slate-900 text-slate-200">Student</option>
                            <option value="teacher" className="bg-slate-900 text-slate-200">Teacher</option>
                            <option value="admin" className="bg-slate-900 text-slate-200">Admin</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>
                
                {/* Modernized Footer Link */}
                <div className="flex justify-center items-center gap-1.5 mt-8 text-xs sm:text-sm text-slate-400">
                    <span>Forgot Password?</span>
                    <button 
                        onClick={() => navigate("forgot-password")} 
                        className="text-blue-400 font-semibold hover:text-blue-300 hover:underline active:text-blue-500 transition-colors bg-transparent border-none p-0 cursor-pointer"
                    >
                        Reset here
                    </button>
                </div>
                
            </div>
        </div>
    ) : (
        <CreateFirstAdmin/>
    )
}

export default Login;