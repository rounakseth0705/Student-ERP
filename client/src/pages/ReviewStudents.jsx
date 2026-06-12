// import { useContext, useEffect } from "react";
// import { UserContext } from "../context/AuthContext.jsx";
// import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import leftArrowBlack from "../assets/leftArrowBlack.svg";

// const ReviewStudents = () => {
//     const { userIdentity } = useContext(UserContext);
//     const { students, getCourseStudents } = useContext(TeacherDashboardContext);
//     const navigate = useNavigate();
//     const [query, setQuery] = useState("");
//     const [result, setResult] = useState([]);
//     const handleGetCourseStudents = async () => {
//         await getCourseStudents(userIdentity.courseId._id);
//     }
//     useEffect(() => {
//         handleGetCourseStudents();
//     },[])
//     useEffect(() => {
//         const filteredStudents = students.filter(student => student.userId.name.toLowerCase().includes(query.trim().toLowerCase()) || student.studentId.includes(query.trim()) || student.rollNo.includes(query.trim()));
//         setResult(filteredStudents);
//     },[query])
//     return(
//         <div className="bg-blue-100 min-h-screen">
//             <div className="flex justify-between items-center px-[2vw] py-[2vh] sm:px-5 sm:py-6 lg:py-4">
//                 <img onClick={() => navigate("/teacher-dashboard")} src={leftArrowBlack} alt="leftArrowIcon" className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
//                 <h1 className="text-blue-950 font-semibold sm:text-2xl lg:text-3xl">List of Students in {userIdentity.courseId.courseName}</h1>
//                 <h1></h1>
//             </div>
//             <div className="flex flex-col items-center">
//                 <input onChange={(event) => setQuery(event.target.value)} value={query} type="text" placeholder="search student" className="mt-5 py-2 px-5 bg-gray-300 rounded-full outline-0 w-[70vw] text-xs sm:text-base sm:py-3 sm:w-100 sm:px-7 lg:w-150 lg:py-4"/>
//                 <div className="bg-blue-50 rounded shadow-2xl mt-5 w-screen sm:w-[90vw]">
//                     <div className="grid grid-cols-4 py-2 text-blue-950 font-semibold text-sm sm:text-base md:text-2xl">
//                         <h1 className="flex justify-center items-center">Name</h1>
//                         <h1 className="flex justify-center items-center">Roll No.</h1>
//                         <h1 className="flex justify-center items-center">Semester</h1>
//                         <h1 className="flex justify-center items-center">Attendence</h1>
//                     </div>
//                     <hr className="mb-2"/>
//                     { query.trim() === "" && students.length > 0 ?
//                         students.map(student => {
//                             const attendance = student.classesAttended !== 0 && student.courseId.classesDelivered[student.semester-1] ? Number(((student.classesAttended/student.courseId.classesDelivered[student.semester-1])*100).toFixed(2)) : 0;
//                             return(
//                                 <div key={student._id} className="grid grid-cols-4 my-1 text-xs sm:text-base">
//                                     <h1 className="flex justify-center items-center">{student.userId.name}</h1>
//                                     <h1 className="flex justify-center items-center">{student.rollNo}</h1>
//                                     <h1 className="flex justify-center items-center">{student.semester}</h1>
//                                     <h1 className="flex justify-center items-center">{attendance}%</h1>
//                                 </div>
//                             )
//                         }) : query.trim() !== "" && result.length > 0 ?
//                         result.map(student => {
//                             const attendance = student.classesAttended !== 0 && student.courseId.classesDelivered[student.semester-1] ? Number(((student.classesAttended/student.courseId.classesDelivered[student.semester-1])*100).toFixed(2)) : 0;
//                             return(
//                                 <div key={student._id} className="grid grid-cols-4 my-1 text-xs sm:text-base">
//                                     <h1 className="flex justify-center items-center">{student.userId.name}</h1>
//                                     <h1 className="flex justify-center items-center">{student.rollNo}</h1>
//                                     <h1 className="flex justify-center items-center">{student.semester}</h1>
//                                     <h1 className="flex justify-center items-center">{attendance}%</h1>
//                                 </div>
//                             )
//                         }) : <div className="text-xs text-center sm:text-base">No students found</div>
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// } 

// export default ReviewStudents;

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import { useNavigate } from "react-router-dom";
// Imported Lucide icons
import { ArrowLeft, Search, AlertCircle } from "lucide-react";

const ReviewStudents = () => {
    const { userIdentity } = useContext(UserContext);
    const { students, getCourseStudents } = useContext(TeacherDashboardContext);
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);

    const handleGetCourseStudents = async () => {
        if (userIdentity?.courseId?._id) {
            await getCourseStudents(userIdentity.courseId._id);
        }
    };

    useEffect(() => {
        handleGetCourseStudents();
    }, []);

    useEffect(() => {
        const filteredStudents = students.filter(
            (student) =>
                student.userId?.name?.toLowerCase().includes(query.trim().toLowerCase()) ||
                student.studentId?.includes(query.trim()) ||
                student.rollNo?.includes(query.trim())
        );
        setResult(filteredStudents);
    }, [query, students]);

    const calculateAttendance = (student) => {
        const delivered = student.courseId?.classesDelivered?.[student.semester - 1];
        if (student.classesAttended !== 0 && delivered) {
            return Number(((student.classesAttended / delivered) * 100).toFixed(2));
        }
        return 0;
    };

    const displayStudents = query.trim() === "" ? students : result;

    return (
        <div className="bg-[#030712] text-slate-100 min-h-screen font-sans antialiased selection:bg-blue-600 selection:text-white">
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate("/teacher-dashboard")}
                            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors group flex items-center justify-center"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-slate-300 group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">Course Overview</span>
                            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                                Students in {userIdentity?.courseId?.courseName || "Course"}
                            </h1>
                        </div>
                    </div>

                    {/* Search Input Bar */}
                    <div className="relative w-full sm:w-72 md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-500" />
                        </div>
                        <input 
                            onChange={(event) => setQuery(event.target.value)} 
                            value={query} 
                            type="text" 
                            placeholder="Search by name, ID, or roll no..." 
                            className="block w-full pl-10 pr-4 py-2.5 bg-[#090f1c] border border-slate-800 rounded-xl text-sm placeholder-slate-500 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Table Data View Container */}
                <div className="mt-8 bg-[#090f1c] border border-slate-800/80 rounded-2xl shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-900/50 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    <th className="px-6 py-4.5">Name</th>
                                    <th className="px-6 py-4.5">Roll No.</th>
                                    <th className="px-6 py-4.5">Semester</th>
                                    <th className="px-6 py-4.5 text-right">Attendance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 text-sm text-slate-300">
                                {displayStudents.length > 0 ? (
                                    displayStudents.map((student) => {
                                        const attendance = calculateAttendance(student);
                                        return (
                                            <tr 
                                                key={student._id} 
                                                className="hover:bg-slate-900/40 transition-colors"
                                            >
                                                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                                    {student.userId?.name}
                                                </td>
                                                <td className="px-6 py-4 font-mono text-slate-400 whitespace-nowrap">
                                                    {student.rollNo}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                                                        Sem {student.semester}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right font-semibold whitespace-nowrap">
                                                    <span className={
                                                        attendance >= 75 
                                                            ? "text-emerald-400" 
                                                            : attendance >= 60 
                                                            ? "text-amber-400" 
                                                            : "text-rose-400"
                                                    }>
                                                        {attendance}%
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center text-slate-500 text-base">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <AlertCircle className="w-8 h-8 text-slate-600" />
                                                <span className="text-sm text-slate-400">No students found matching your criteria</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReviewStudents;