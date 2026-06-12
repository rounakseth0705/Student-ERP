// import { useContext } from "react";
// import TeacherFeaturesHeader from "../components/TeacherFeaturesHeader.jsx";
// import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
// import { useEffect } from "react";
// import { UserContext } from "../context/AuthContext.jsx";
// import rightArrowBlack from "../assets/rightArrowBlack.svg";
// import { useState } from "react";
// import React from "react";

// const AttendenceHistory = () => {
//     const { userIdentity } = useContext(UserContext);
//     const { attendanceHistory, attendances } = useContext(TeacherDashboardContext);
//     const [isOpen, setIsOpen] = useState(false);
//     const [activeIndex, setActiveIndex] = useState(null);
//     const [activeAttendanceId, setActiveAttendanceId] = useState(null);
//     const [query, setQuery] = useState("");
//     const [result, setResult] = useState([]);
//     const handleAttendanceHistory = async () => {
//         await attendanceHistory(userIdentity._id);
//     }
//     const handleArrowOpen = (attendanceId,index) => {
//         setActiveIndex(index);
//         setActiveAttendanceId(attendanceId);
//         setIsOpen(prev => !prev);
//     }
//     useEffect(() => {
//         handleAttendanceHistory();
//     },[]);
//     useEffect(() => {
//         const filteredAttendances = attendances.filter(attendance => attendance.subjectId.subjectName.toLowerCase().includes(query.trim().toLowerCase()) || new Date(attendance.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).includes(query.trim()));
//         setResult(filteredAttendances);
//     },[query]);
//     return(
//         <>
//             <TeacherFeaturesHeader toDisplay="Attendance History"/>
//             { attendances.length > 0 &&
//                 <div className="my-5 text-center sm:my-10">
//                     <input onChange={(event) => setQuery(event.target.value)} value={query} type="text" placeholder="search attendance" className="w-[65vw] outline-0 rounded-3xl bg-gray-200 px-5 py-2 text-sm sm:text-base sm:px-7 sm:py-3 sm:w-[50vw] md:w-[40vw] lg:w-[30vw]"/>
//                 </div>
//             }
//             <div className="my-5 mx-3 sm:my-10 sm:mx-10 md:mx-15 lg:mx-25 xl:mx-30">
//                 { attendances.length > 0 && query.trim() === "" ?
//                     attendances.map((attendance,index) => (
//                         <React.Fragment key={index}>
//                             <div className="flex justify-between items-center bg-blue-200 rounded shadow-lg my-5 p-3 text-xs sm:text-base">
//                                 <span className="mx-1 sm:mx-5 lg:mx-10">
//                                     <img onClick={() => handleArrowOpen(attendance._id,index)} src={rightArrowBlack} alt="rightArrowBlack" className={`cursor-pointer w-4 h-4 duration-300 ${activeIndex === index && isOpen ? "rotate-90" : "rotate-0"} sm:w-5 sm:h-5`}/>
//                                 </span>
//                                 <h1 className="mx-1 sm:mx-5 lg:mx-10">{attendance.subjectId.subjectName}</h1>
//                                 <h1 className="mx-1 sm:mx-5 lg:mx-10">Semester {attendance.semester}</h1>
//                                 <h1 className="mx-1 sm:mx-5 lg:mx-10">{new Date(attendance.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
//                             </div>
//                             { (isOpen && activeAttendanceId === attendance._id) &&
//                                 <div className="bg-blue-300 mx-10 py-2 rounded sm:mx-20">
//                                     {
//                                         attendance?.studentIds.map((student,index) => (
//                                             <div key={index} className="flex justify-evenly items-center py-1">
//                                                 <h1 className="text-xs sm:text-base">{index+1}.</h1>
//                                                 <h1 className="text-xs sm:text-base">{student.userId.name}</h1>
//                                                 <h1 className="text-xs sm:text-base">{student.rollNo}</h1>
//                                             </div>
//                                         ))
//                                     }
//                                 </div>
//                             }
//                         </React.Fragment>
//                     )) : result.length > 0 && query.trim() !== "" ?
//                     result.map((attendance,index) => (
//                         <React.Fragment key={index}>
//                             <div className="flex justify-between items-center bg-blue-200 rounded shadow-lg my-5 p-3 text-xs sm:text-base">
//                                 <span className="mx-1 sm:mx-5 lg:mx-10">
//                                     <img onClick={() => handleArrowOpen(attendance._id,index)} src={rightArrowBlack} alt="rightArrowBlack" className={`cursor-pointer w-5 h-5 duration-300 ${activeIndex === index && isOpen ? "rotate-90" : "rotate-0"}`}/>
//                                 </span>
//                                 <h1 className="mx-1 sm:mx-5 lg:mx-10">{attendance.subjectId.subjectName}</h1>
//                                 <h1 className="mx-1 sm:mx-5 lg:mx-10">Semester {attendance.semester}</h1>
//                                 <h1 className="mx-1 sm:mx-5 lg:mx-10">{new Date(attendance.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
//                             </div>
//                             { (isOpen && activeAttendanceId === attendance._id) &&
//                                 <div className="bg-blue-300 mx-10 py-2 rounded sm:mx-20">
//                                     {
//                                         attendance?.studentIds.map((student,index) => (
//                                             <div key={index} className="flex justify-evenly items-center py-1">
//                                                 <h1 className="text-xs sm:text-base">{index+1}.</h1>
//                                                 <h1 className="text-xs sm:text-base">{student.userId.name}</h1>
//                                                 <h1 className="text-xs sm:text-base">{student.rollNo}</h1>
//                                             </div>
//                                         ))
//                                     }
//                                 </div>
//                             }
//                         </React.Fragment>
//                     )) : <div className="text-center">You haven't marked any attendance in this semester</div>
//                 }
//             </div>
//         </>
//     )
// }

// export default AttendenceHistory;

import { useContext, useEffect, useState, Fragment } from "react";
import TeacherFeaturesHeader from "../components/TeacherFeaturesHeader.jsx";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import { UserContext } from "../context/AuthContext.jsx";
// Imported Lucide Icons
import { ChevronRight, Search, Calendar, Inbox } from "lucide-react";

const AttendenceHistory = () => {
    const { userIdentity } = useContext(UserContext);
    const { attendanceHistory, attendances } = useContext(TeacherDashboardContext);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [activeAttendanceId, setActiveAttendanceId] = useState(null);
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);

    const handleAttendanceHistory = async () => {
        if (userIdentity?._id) {
            await attendanceHistory(userIdentity._id);
        }
    };

    const handleArrowOpen = (attendanceId, index) => {
        if (activeAttendanceId === attendanceId) {
            setIsOpen((prev) => !prev);
        } else {
            setActiveIndex(index);
            setActiveAttendanceId(attendanceId);
            setIsOpen(true);
        }
    };

    useEffect(() => {
        handleAttendanceHistory();
    }, []);

    useEffect(() => {
        const filteredAttendances = attendances.filter(
            (attendance) =>
                attendance.subjectId?.subjectName?.toLowerCase().includes(query.trim().toLowerCase()) ||
                new Date(attendance.createdAt)
                    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
                    .includes(query.trim())
        );
        setResult(filteredAttendances);
    }, [query, attendances]);

    // Determine target state collection
    const displayAttendances = query.trim() === "" ? attendances : result;

    return (
        <div className="bg-[#030712] text-slate-100 min-h-screen font-sans antialiased selection:bg-blue-600 selection:text-white pb-12">
            <TeacherFeaturesHeader toDisplay="Attendance History" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                {/* Search Header Action Container */}
                {attendances.length > 0 && (
                    <div className="flex justify-center mb-8">
                        <div className="relative w-full max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-slate-500" />
                            </div>
                            <input
                                onChange={(event) => setQuery(event.target.value)}
                                value={query}
                                type="text"
                                placeholder="Search by subject or date (e.g., 12 Jun 2026)..."
                                className="block w-full pl-10 pr-4 py-2.5 bg-[#090f1c] border border-slate-800 rounded-xl text-sm placeholder-slate-500 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>
                )}

                {/* Main Accordion List Wrapper */}
                <div className="space-y-3">
                    {displayAttendances.length > 0 ? (
                        displayAttendances.map((attendance, index) => {
                            const isCurrentOpen = isOpen && activeAttendanceId === attendance._id;
                            const formattedDate = new Date(attendance.createdAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            });

                            return (
                                <Fragment key={attendance._id || index}>
                                    {/* Accordion Trigger Panel Row */}
                                    <div 
                                        onClick={() => handleArrowOpen(attendance._id, index)}
                                        className={`flex items-center justify-between bg-[#090f1c] border rounded-xl p-4 cursor-pointer select-none transition-all duration-200 ${
                                            isCurrentOpen 
                                                ? "border-blue-600/50 shadow-lg shadow-blue-950/20 bg-[#0d1527]" 
                                                : "border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40"
                                        }`}
                                    >
                                        <div className="flex items-center gap-4 min-w-0 flex-1">
                                            <div className="p-1 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400">
                                                <ChevronRight 
                                                    className={`w-4 h-4 transition-transform duration-300 transform ${
                                                        isCurrentOpen ? "rotate-90 text-blue-400" : "rotate-0"
                                                    }`} 
                                                />
                                            </div>
                                            <div className="min-w-0 flex-1 grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 items-center">
                                                <h1 className="font-semibold text-white text-sm sm:text-base truncate">
                                                    {attendance.subjectId?.subjectName}
                                                </h1>
                                                <div>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                                                        Semester {attendance.semester}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 font-medium">
                                                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                                    {formattedDate}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Attendance Summary Count Badge */}
                                        <div className="ml-4 text-right hidden sm:block">
                                            <span className="text-xs text-slate-500 block">Present</span>
                                            <span className="text-sm font-bold text-emerald-400 font-mono">
                                                {attendance?.studentIds?.length || 0} Students
                                            </span>
                                        </div>
                                    </div>

                                    {/* Expanded Detail Dropdown Container */}
                                    {isCurrentOpen && (
                                        <div className="mx-2 sm:mx-6 -mt-1 mb-4 bg-[#050a14] border-x border-b border-slate-800/80 rounded-b-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="p-2 bg-slate-900/30 border-b border-slate-800/60 px-4 flex justify-between items-center">
                                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                    Verified Attendance Roster
                                                </span>
                                                <span className="text-xs font-mono text-slate-500 sm:hidden">
                                                    Total: {attendance?.studentIds?.length || 0}
                                                </span>
                                            </div>
                                            <div className="overflow-x-auto max-h-80 overflow-y-auto">
                                                <table className="w-full text-left border-collapse">
                                                    <thead>
                                                        <tr className="border-b border-slate-800/50 bg-slate-900/10 text-xs font-medium text-slate-500 uppercase tracking-tight">
                                                            <th className="px-4 py-2 w-12 text-center">#</th>
                                                            <th className="px-4 py-2">Student Name</th>
                                                            <th className="px-4 py-2 text-right">Roll No.</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-800/40 text-xs sm:text-sm text-slate-300">
                                                        {attendance?.studentIds && attendance.studentIds.length > 0 ? (
                                                            attendance.studentIds.map((student, innerIndex) => (
                                                                <tr key={student._id || innerIndex} className="hover:bg-slate-900/20 transition-colors">
                                                                    <td className="px-4 py-2.5 text-center font-mono text-slate-500">
                                                                        {innerIndex + 1}
                                                                    </td>
                                                                    <td className="px-4 py-2.5 font-medium text-slate-200">
                                                                        {student.userId?.name}
                                                                    </td>
                                                                    <td className="px-4 py-2.5 text-right font-mono text-slate-400">
                                                                        {student.rollNo}
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="3" className="px-4 py-6 text-center text-slate-500 italic">
                                                                    No students registered present for this session.
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </Fragment>
                            );
                        })
                    ) : (
                        /* Empty Data State */
                        <div className="text-center py-16 bg-[#090f1c] border border-slate-800/80 rounded-2xl mt-4">
                            <div className="flex flex-col items-center justify-center gap-3">
                                <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-slate-500">
                                    <Inbox className="w-8 h-8" />
                                </div>
                                <h3 className="text-sm font-medium text-slate-300">No History Records Available</h3>
                                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                                    {query.trim() !== "" 
                                        ? "No logs match your current search constraints." 
                                        : "You haven't dispatched or logged any student attendance workflows during this semester timeline."}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AttendenceHistory;