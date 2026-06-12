// import { useNavigate, useParams } from "react-router-dom";
// import leftArrowBlack from "../assets/leftArrowBlack.svg";
// import { useContext, useEffect, useState } from "react";
// import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
// import { useRef } from "react";
// import { UserContext } from "../context/AuthContext.jsx";

// const MarkSubjectAttendence = () => {
//     const { subjectId, subjectName, subjectCode } = useParams();
//     const { userIdentity } = useContext(UserContext);
//     const { getStudentsForAttendence, studentsForAttendence, markAttendence } = useContext(TeacherDashboardContext);
//     const navigate = useNavigate();
//     const [studentIds, setStudentIds] = useState([]);
//     const day = useRef(new Date().toLocaleDateString("en-US", { weekday: "short" }));
//     const handleGetStudentsForAttendence = async () => {
//         await getStudentsForAttendence(subjectId);
//     }
//     const handleMarkAttendence = async () => {
//         await markAttendence(subjectId,studentIds,day.current);
//     }
//     const handleMarkStudent = (id) => {
//         setStudentIds(prev => prev.includes(id) ? prev.filter(studentId => studentId !== id) : [...prev,id]);
//     }
//     useEffect(() => {
//         handleGetStudentsForAttendence();
//     },[]);
//     return(
//         <>
//             <div className="flex justify-between items-center py-4 px-3 sm:px-4 sm:py-5 lg:p-5">
//                 <img onClick={() => navigate("/teacher-dashboard/mark-attendence")} src={leftArrowBlack} alt="leftArrow" className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
//                 <h1 className="font-semibold text-blue-950 sm:text-2xl lg:text-3xl">{subjectName} ({subjectCode})</h1>
//                 <button onClick={() => navigate(`/teacher-dashboard/about-${userIdentity.courseId.courseName.toLowerCase()}`)} className="bg-blue-400 text-white text-xs rounded p-1 cursor-pointer sm:text-base">Check Schedule</button>
//             </div>
//             <div className="mt-4 mx-auto bg-blue-200 rounded shadow-lg w-[90vw] pb-2 sm:w-[85vw] sm:mt-7 lg:w-[80vw]">
//                 <div className="grid grid-cols-3 py-2 font-semibold sm:text-2xl">
//                     <h1 className="flex justify-center items-center">Name</h1>
//                     <h1 className="flex justify-center items-center">Roll no.</h1>
//                     <h1 className="flex justify-center items-center">Attendence</h1>
//                 </div>
//                 <hr className="mb-3"/>
//                 {
//                     studentsForAttendence.map((student,index) => (
//                         <div key={index} className="grid grid-cols-3 mt-2 text-xs sm:text-base">
//                             <h1 className="flex justify-center items-center">{student.userId.name}</h1>
//                             <h1 className="flex justify-center items-center">{student.rollNo}</h1>
//                             <input checked={studentIds.includes(student._id)} onChange={() => handleMarkStudent(student._id)} type="checkbox" className="flex justify-center items-center"/>
//                         </div>
//                     ))
//                 }
//             </div>
//             <button onClick={handleMarkAttendence} className="bg-red-500 text-white rounded py-2 px-2 my-6 mx-auto cursor-pointer hover:bg-red-400 transition-all duration-400 ease-in-out text-xs sm:px-3 sm:text-base md:px-4">Submit Attendence</button>
//         </>
//     )
// }

// export default MarkSubjectAttendence;

import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/AuthContext.jsx";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
// Premium Lucide Icons Ecosystem
import { ArrowLeft, UserCheck, CalendarDays } from "lucide-react";

const MarkSubjectAttendance = () => {
    const { subjectId, subjectName, subjectCode } = useParams();
    const { userIdentity } = useContext(UserContext);
    const { getStudentsForAttendence, studentsForAttendence, markAttendence } = useContext(TeacherDashboardContext);
    const navigate = useNavigate();
    
    const [studentIds, setStudentIds] = useState([]);
    const day = useRef(new Date().toLocaleDateString("en-US", { weekday: "short" }));

    const handleGetStudentsForAttendence = async () => {
        if (subjectId) {
            await getStudentsForAttendence(subjectId);
        }
    };

    const handleMarkAttendance = async () => {
        await markAttendence(subjectId, studentIds, day.current);
    };

    const handleMarkStudent = (id) => {
        setStudentIds(prev => 
            prev.includes(id) ? prev.filter(studentId => studentId !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        handleGetStudentsForAttendence();
    }, []);

    return (
        <div className="bg-[#030712] text-slate-100 min-h-screen font-sans antialiased selection:bg-blue-600 selection:text-white pb-16">
            
            {/* Header Toolbar Panel - FORCED SINGLE ROW USING flex-nowrap */}
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 border-b border-slate-800 pb-5">
                <div className="flex flex-row flex-nowrap items-center justify-between gap-3 sm:gap-4">
                    
                    {/* Left Wing Elements Wrapper */}
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <button 
                            onClick={() => navigate("/teacher-dashboard/mark-attendence")}
                            className="p-2 sm:p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors group flex-shrink-0 flex items-center justify-center"
                            aria-label="Back to attendance dashboard"
                        >
                            <ArrowLeft className="w-4 h-4 sm:w-5 h-5 text-slate-300 group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <div className="min-w-0">
                            <span className="hidden sm:block text-xs font-semibold uppercase tracking-wider text-blue-500">Attendance Manager</span>
                            <h1 className="text-sm sm:text-2xl font-bold text-white tracking-tight truncate">
                                {subjectName} <span className="text-slate-500 font-mono text-xs sm:text-lg font-medium">({subjectCode})</span>
                            </h1>
                        </div>
                    </div>
                    
                    {/* Right Wing Context Action Trigger */}
                    <button 
                        onClick={() => navigate(`/teacher-dashboard/about-${userIdentity?.courseId?.courseName?.toLowerCase()}`)} 
                        className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-blue-950/40 focus:outline-none whitespace-nowrap flex-shrink-0"
                    >
                        Check Schedule
                    </button>
                </div>
            </div>

            {/* Core Working Area: Student Roster Container */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                
                {/* Meta Indicator Bar */}
                <div className="mb-4 flex justify-between items-center px-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <CalendarDays className="w-4 h-4 text-slate-500" />
                        <span>Session Day: <strong className="text-blue-400 uppercase">{day.current}</strong></span>
                    </div>
                    <span className="text-xs bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-slate-400 font-mono">
                        Present Count: <strong className="text-emerald-400">{studentIds.length}</strong> / {studentsForAttendence.length}
                    </span>
                </div>

                {/* Structured Student Matrix Board */}
                <div className="bg-[#090f1c] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-900/40 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    <th className="px-6 py-4">Student Identity</th>
                                    <th className="px-6 py-4 text-center">Roll No.</th>
                                    <th className="px-6 py-4 text-right">Status Check</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-sm text-slate-300">
                                {studentsForAttendence.length > 0 ? (
                                    studentsForAttendence.map((student, index) => {
                                        const isMarked = studentIds.includes(student._id);
                                        return (
                                            <tr 
                                                key={student._id || index} 
                                                className={`transition-colors duration-150 group cursor-pointer ${
                                                    isMarked ? "bg-emerald-500/[0.02] hover:bg-emerald-500/[0.04]" : "hover:bg-slate-900/30"
                                                }`}
                                                onClick={() => handleMarkStudent(student._id)}
                                            >
                                                <td className="px-6 py-3.5 font-medium text-slate-200 group-hover:text-white transition-colors">
                                                    {student.userId?.name}
                                                </td>
                                                <td className="px-6 py-3.5 text-center font-mono text-slate-400 text-xs sm:text-sm">
                                                    {student.rollNo}
                                                </td>
                                                <td className="px-6 py-3.5 text-right">
                                                    <div className="inline-flex justify-end items-center" onClick={(e) => e.stopPropagation()}>
                                                        <input 
                                                            id={`student-check-${student._id}`}
                                                            type="checkbox" 
                                                            checked={isMarked}
                                                            onChange={() => handleMarkStudent(student._id)}
                                                            className="w-4 h-4 rounded text-blue-600 bg-slate-900 border-slate-700 focus:ring-blue-500 focus:ring-offset-slate-950 focus:ring-2 cursor-pointer transition-all accent-blue-600"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-12 text-center text-slate-500 font-medium text-sm">
                                            No student metadata profiles registered under this configuration stream.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Submission Management Vector Call Button */}
                <div className="flex justify-center mt-8">
                    <button 
                        onClick={handleMarkAttendance} 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/40 focus:outline-none select-none cursor-pointer"
                    >
                        <UserCheck className="w-4 h-4" />
                        <span>Submit Attendance Blueprint</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default MarkSubjectAttendance;