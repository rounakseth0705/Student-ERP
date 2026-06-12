// import { useNavigate } from "react-router-dom";
// import leftArrowBlack from "../assets/leftArrowBlack.svg";
// import { useEffect } from "react";
// import { useContext } from "react";
// import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
// import { UserContext } from "../context/AuthContext.jsx";
// import { useState } from "react";
// import CurrentTime from "../components/CurrentTime.jsx";

// const SubjectWiseAttendence = () => {
//     const { userIdentity } = useContext(UserContext);
//     const { subjects, getSubjects, getSubjectWiseAttendance } = useContext(StudentDashboardContext);
//     const navigate = useNavigate();
//     const [subjectIds, setSubjectIds] = useState([]);
//     const handleGetSubjects = async () => {
//         await getSubjects(userIdentity.courseId._id,userIdentity.semester);
//     }
//     useEffect(() => {
//         handleGetSubjects();
//         const arrayOfubjectIds = subjects.map(subject => subject._id);
//         setSubjectIds(arrayOfubjectIds);
//     },[]);
//     return(
//         <>
//             <div className="flex justify-between items-center px-[2vw] py-[2vh] sm:px-5 sm:py-6 lg:py-4">
//                 <img onClick={() => navigate("/student-dashboard/attendance")} src={leftArrowBlack} alt="ArrowIcon" className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
//                 <h1 className="text-blue-950 font-semibold sm:text-2xl lg:text-3xl">Subject Wise Attendance</h1>
//                 <button onClick={() => navigate("/student-dashboard/attendance/day-wise")} className="bg-blue-400 text-white rounded p-1 cursor-pointer text-xs sm:text-base">Day Wise Attendance</button>
//             </div>
//             <div className="my-5 mx-3 sm:mx-10 md:mx-20 lg:mx-25 xl:mx-30">
//                 {
//                     subjects.map((subject,index) => {
//                         const subjectAttendance = userIdentity?.subjectWiseAttendance?.find(subjectAttendance => subjectAttendance.subjectId === subject._id);
//                         const classesAttended = subjectAttendance ? subjectAttendance.classesAttended : 0;
//                         return(
//                             <div key={index} className="bg-gray-50 shadow-lg my-5 py-2 px-1 sm:px-3">
//                                 <h1 className="text-center my-2 font-semibold sm:text-2xl">{subject.subjectName}</h1>
//                                 <span className="flex justify-between items-center text-xs text-blue-600 mt-3 sm:text-base">
//                                     <h1 className="sm:px-5">Subject Code</h1>
//                                     <h1 className="sm:px-5">Attended/Delivered</h1>
//                                     <h1 className="sm:px-5">Percentage</h1>
//                                 </span>
//                                 <span className="flex justify-between items-center my-1 text-xs sm:text-base">
//                                     <h1 className="sm:px-5">{subject.subjectCode}</h1>
//                                     <h1 className="sm:px-5">{classesAttended}/{subject.classesDelivered}</h1>
//                                     <h1 className="sm:px-5">{ classesAttended ? Number(((classesAttended/subject.classesDelivered) * 100).toFixed(2)) : 0 }%</h1>
//                                 </span>
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         </>
//     )
// }

// export default SubjectWiseAttendence;

import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
import { UserContext } from "../context/AuthContext.jsx";
import CurrentTime from "../components/CurrentTime.jsx";
// Premium Lucide Icons Ecosystem
import { ArrowLeft, CalendarDays, BookOpen, Layers, BarChart3 } from "lucide-react";

const SubjectWiseAttendance = () => {
    const { userIdentity } = useContext(UserContext);
    const { subjects, getSubjects, getSubjectWiseAttendance } = useContext(StudentDashboardContext);
    const navigate = useNavigate();
    const [subjectIds, setSubjectIds] = useState([]);

    const handleGetSubjects = async () => {
        await getSubjects(userIdentity.courseId._id, userIdentity.semester);
    }

    useEffect(() => {
        handleGetSubjects();
        const arrayOfSubjectIds = subjects.map(subject => subject._id);
        setSubjectIds(arrayOfSubjectIds);
    }, []);

    return (
        <div className="bg-slate-950 text-slate-300 min-h-screen font-sans antialiased selection:bg-blue-600 selection:text-white pb-16">
            
            {/* Header Navigation Bar Panel - FORCED SINGLE ROW */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-900/60 shadow-xl mb-8">
                <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 flex flex-row flex-nowrap items-center justify-between gap-4">
                    
                    {/* Left Actions: Back Button */}
                    <button 
                        onClick={() => navigate("/student-dashboard/attendance")}
                        className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none border border-slate-800/40 shadow-inner shrink-0 flex items-center justify-center"
                        aria-label="Back to aggregate analytics"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    
                    {/* Centered Component Title */}
                    <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent sm:text-2xl text-center truncate">
                        Subject Metrics
                    </h1>
                    
                    {/* Theme-Matched Action Toggle Trigger Button */}
                    <button 
                        onClick={() => navigate("/student-dashboard/attendance/day-wise")} 
                        className="group inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm rounded-xl transition-all duration-300 border border-slate-800 hover:border-slate-700 shadow-lg active:scale-95 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none"
                    >
                        <span className="hidden sm:inline">Day Wise Attendance</span>
                        <span className="sm:hidden">Day Wise</span>
                        <CalendarDays className="w-4 h-4 text-slate-400 group-hover:text-slate-200 transition-colors" />
                    </button>
                </div>
            </div>

            {/* Core Metrics Hub Layout */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
                {subjects.map((subject, index) => {
                    const subjectAttendance = userIdentity?.subjectWiseAttendance?.find(
                        subAttendance => subAttendance.subjectId === subject._id
                    );
                    const classesAttended = subjectAttendance ? subjectAttendance.classesAttended : 0;
                    const deliveryMetric = subject.classesDelivered || 0;
                    const percentage = deliveryMetric > 0 ? Number(((classesAttended / deliveryMetric) * 100).toFixed(2)) : 0;
                    
                    // Critical Academic Boundary (Warning Threshold < 75%)
                    const isLowAttendance = percentage < 75;

                    return (
                        <div 
                            key={index} 
                            className="bg-[#090f1c] border border-slate-900 p-5 sm:p-6 rounded-2xl shadow-xl transition-all duration-300 hover:border-slate-800/80 group"
                        >
                            {/* Subject Title Profile Banner Header */}
                            <div className="flex items-center gap-3 border-b border-slate-900/60 pb-3.5 mb-4">
                                <div className="p-2 bg-slate-950 border border-slate-900 text-slate-400 rounded-lg group-hover:text-blue-400 group-hover:border-blue-500/20 transition-colors shrink-0">
                                    <BookOpen className="w-4 h-4 sm:w-5 h-5" />
                                </div>
                                <h2 className="text-sm sm:text-lg font-bold text-slate-200 tracking-tight line-clamp-1">
                                    {subject.subjectName}
                               </h2>
                            </div>

                            {/* Metadata Matrix Blueprint */}
                            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                                
                                {/* Segment Column A: Code Identifier */}
                                <div className="bg-slate-950/40 border border-slate-900/40 rounded-xl p-2.5 sm:p-3 flex flex-col justify-center min-w-0">
                                    <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                                        <Layers className="w-3 h-3 hidden sm:inline text-slate-600" />
                                        <span>Code</span>
                                    </div>
                                    <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-1 truncate">
                                        {subject.subjectCode}
                                    </p>
                                </div>

                                {/* Segment Column B: Fraction Ledger */}
                                <div className="bg-slate-950/40 border border-slate-900/40 rounded-xl p-2.5 sm:p-3 flex flex-col justify-center min-w-0">
                                    <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                                        <BarChart3 className="w-3 h-3 hidden sm:inline text-slate-600" />
                                        <span className="truncate">Attended</span>
                                    </div>
                                    <p className="text-xs sm:text-sm font-mono font-bold text-slate-300 mt-1">
                                        {classesAttended}<span className="text-slate-600 mx-0.5">/</span>{deliveryMetric}
                                    </p>
                                </div>

                                {/* Segment Column C: Percentage Display Score */}
                                <div className="bg-slate-950/40 border border-slate-900/40 rounded-xl p-2.5 sm:p-3 flex flex-col justify-center min-w-0">
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">Ratio</span>
                                    <p className={`text-xs sm:text-sm font-mono font-black mt-1 tracking-tight ${
                                        isLowAttendance ? "text-rose-400" : "text-emerald-400"
                                    }`}>
                                        {percentage}%
                                    </p>
                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SubjectWiseAttendance;