// import { useNavigate } from "react-router-dom";
// import homeIcon from "../assets/homeIcon.svg";
// import { useContext, useRef } from "react";
// import { UserContext } from "../context/AuthContext.jsx";
// import calendarIcon from "../assets/calendarIcon.svg";
// import clipboardCheckIcon from "../assets/clipboardCheckIcon.svg";

// const Attendence = () => {
//     const { userIdentity } = useContext(UserContext);
//     const semester = useRef(userIdentity?.semester);
//     const navigate = useNavigate();
//     return(
//         <div className="bg-blue-100 min-h-screen">
//             <div className="flex justify-between items-center px-[2vw] py-[2vh] sm:px-5 sm:py-6 lg:py-4">
//                 <img onClick={() => navigate("/student-dashboard")} src={homeIcon} alt="homeIcon" className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
//                 <h1 className="text-blue-950 font-semibold sm:text-2xl lg:text-3xl">Attendance</h1>
//                 <button onClick={() => navigate("/student-dashboard/timetable")} className="bg-blue-500 text-white text-xs cursor-pointer p-1 rounded sm:text-base">Timetable</button>
//             </div>
//             <div className="flex flex-col justify-between gap-3 mt-10 mx-10 rounded shadow-lg py-5 px-3 bg-gray-50 font-semibold sm:mx-20 md:mx-30 lg:mx-50 2xl:mx-80 sm:px-10 md:px-12 lg:px-15">
//                 <span className="flex justify-between items-center">
//                     <h1 className="sm:text-2xl">Overall Attendance</h1>
//                     <h1 className="sm:text-2xl">{Number(((userIdentity.classesAttended/userIdentity.courseId.classesDelivered[userIdentity.semester-1])*100).toFixed(2))}%</h1>
//                 </span>
//                 <span className="flex flex-col py-3">
//                     <span className="flex justify-between items-center px-2 sm:px-5">
//                         <h1 className="text-xs sm:text-base">Total Classes Delivered</h1>
//                         <h1 className="text-xs sm:text-base">{userIdentity?.courseId?.classesDelivered[semester.current-1]}</h1>
//                     </span>
//                     <span className="flex justify-between items-center px-2 sm:px-5">
//                         <h1 className="text-xs sm:text-base">Total Classes Attended</h1>
//                         <h1 className="text-xs sm:text-base">{userIdentity.classesAttended}</h1>
//                     </span>
//                 </span>
//             </div>
//             <div className="grid grid-cols-1 gap-12 mx-15 mt-10 text-white sm:mx-20 md:mx-30 lg:mx-50 2xl:mx-80 sm:text-2xl">
//                 <div onClick={() => navigate("day-wise")} className="flex justify-center items-center gap-2 bg-blue-500 py-7 px-3 rounded cursor-pointer hover:bg-blue-400 transition-all duration-400 ease-in-out sm:py-10">
//                     <img src={calendarIcon} alt="calenderIcon" className="w-8 h-8 sm:w-10 sm:h-10"/>
//                     <h1>Day Wise Attendance</h1>
//                 </div>
//                 <div onClick={() => navigate("subject-wise")} className="flex justify-center items-center gap-2 bg-blue-500 py-7 px-3 rounded cursor-pointer hover:bg-blue-400 transition-all duration-400 ease-in-out sm:py-10">
//                     <img src={clipboardCheckIcon} alt="clipboardCheckIcon" className="w-8 h-8 sm:w-10 sm:h-10"/>
//                     <h1>Subject Wise Attendance</h1>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Attendence;

import { useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { UserContext } from "../context/AuthContext.jsx";
// Premium Lucide Icons Ecosystem
import { Home, CalendarDays, ClipboardCheck, Percent, CalendarRange } from "lucide-react";

const Attendance = () => {
    const { userIdentity } = useContext(UserContext);
    const semester = useRef(userIdentity?.semester);
    const navigate = useNavigate();

    // Context Evaluation Metrics
    const delivered = userIdentity?.courseId?.classesDelivered?.[semester.current - 1] || 0;
    const attended = userIdentity?.classesAttended || 0;
    const attendancePercentage = delivered > 0 ? Number(((attended / delivered) * 100).toFixed(2)) : 0;
    
    // Critical Academic Boundary (Warning Threshold < 75%)
    const isLowAttendance = attendancePercentage < 75;

    return (
        <div className="bg-slate-950 text-slate-300 min-h-screen font-sans antialiased selection:bg-blue-600 selection:text-white pb-16">
            
            {/* Header Navigation Bar Panel - FORCED SINGLE ROW */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-900/60 shadow-xl mb-8">
                <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 flex flex-row flex-nowrap items-center justify-between gap-4">
                    
                    {/* Left Actions: Back Button */}
                    <button 
                        onClick={() => navigate("/student-dashboard")}
                        className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none border border-slate-800/40 shadow-inner shrink-0 flex items-center justify-center"
                        aria-label="Back to dashboard"
                    >
                        <Home className="w-5 h-5" />
                    </button>
                    
                    {/* Centered Component Title */}
                    <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent sm:text-2xl text-center truncate">
                        Attendance Ledger
                    </h1>
                    
                    {/* Theme-Matched Action Button */}
                    <button 
                        onClick={() => navigate("/student-dashboard/timetable")} 
                        className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm rounded-xl transition-all duration-300 border border-slate-800 hover:border-slate-700 shadow-lg active:scale-95 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none"
                    >
                        <span>Timetable</span>
                        <CalendarRange className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-transform duration-300 ease-out transform group-hover:translate-x-0.5" />
                    </button>
                </div>
            </div>

            {/* Core Metrics Hub Layout */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
                
                {/* Scoreboard Summary Card Panel */}
                <div className="bg-[#090f1c] border border-slate-900 p-5 sm:p-6 rounded-2xl shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                        <Percent className="w-36 h-36 text-white" />
                    </div>
                    
                    {/* Metrics Banner Header */}
                    <div className="flex justify-between items-center border-b border-slate-900/60 pb-4">
                        <div>
                            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">Aggregate Metric</p>
                            <h3 className="text-base font-bold text-slate-200 mt-0.5">Overall Performance Score</h3>
                        </div>
                        <div className={`text-2xl sm:text-3xl font-black font-mono tracking-tight transition-colors ${
                            isLowAttendance ? "text-rose-400" : "text-emerald-400"
                        }`}>
                            {attendancePercentage}%
                        </div>
                    </div>

                    {/* Data Details List Rows */}
                    <div className="mt-4 space-y-3.5">
                        <div className="flex justify-between items-center text-xs sm:text-sm bg-slate-950/40 px-4 py-3 rounded-xl border border-slate-900/40">
                            <span className="text-slate-400 font-medium">Total Classes Delivered</span>
                            <span className="font-mono font-bold text-slate-200">{delivered}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs sm:text-sm bg-slate-950/40 px-4 py-3 rounded-xl border border-slate-900/40">
                            <span className="text-slate-400 font-medium">Total Classes Attended</span>
                            <span className="font-mono font-bold text-slate-200">{attended}</span>
                        </div>
                    </div>
                </div>

                {/* Sub-Navigation Action Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Card Variant A: Day Wise View */}
                    <div 
                        onClick={() => navigate("day-wise")} 
                        className="flex items-center gap-4 bg-[#090f1c] border border-slate-900 hover:border-slate-800 p-5 rounded-xl cursor-pointer group shadow-lg transition-all duration-300 relative select-none"
                    >
                        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                            <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="min-w-0">
                            <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                                Day Wise Attendance
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5 truncate">
                                Chronological timeline performance tracking.
                            </p>
                        </div>
                    </div>

                    {/* Card Variant B: Subject Wise View */}
                    <div 
                        onClick={() => navigate("subject-wise")} 
                        className="flex items-center gap-4 bg-[#090f1c] border border-slate-900 hover:border-slate-800 p-5 rounded-xl cursor-pointer group shadow-lg transition-all duration-300 relative select-none"
                    >
                        <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white transition-all shrink-0">
                            <ClipboardCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="min-w-0">
                            <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                                Subject Wise Attendance
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5 truncate">
                                Modular discipline breakdown matrices.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Attendance;