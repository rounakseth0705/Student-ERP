// import { useContext } from "react";
// import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
// import { useEffect } from "react";
// import removeIcon from "../assets/removeIcon.svg";
// import homeIcon from "../assets/homeIcon.svg";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Teachers = () => {
//     const { teachers, getTeachers, deleteTeacher } = useContext(AdminDashboardContext);
//     const navigate = useNavigate();
//     const [query, setQuery] = useState("");
//     const [result, setResult] = useState([]);
//     const handleGetTeachers = async () => {
//         await getTeachers();
//     }
//     const handleDeleteTeacher = async (teacherId,employeeId) => {
//         await deleteTeacher(teacherId,employeeId);
//     }
//     useEffect(() => {
//         handleGetTeachers();
//     },[]);
//     useEffect(() => {
//         const filteredTeachers = teachers.filter((teacher) => teacher.userId.name.toLowerCase().includes(query.trim().toLowerCase()) || teacher.teacherId.includes(query.trim()) || teacher.employeeId.includes(query.trim()) || teacher.courseId.courseName.toLowerCase().includes(query.trim().toLowerCase()));
//         setResult(filteredTeachers);
//     },[query]);
//     return(
//         <div className="bg-blue-100 min-h-screen">
//             <div className="flex justify-between items-center px-[2vw] py-[2vh] sm:px-5 sm:py-6 lg:py-4">
//                 <img onClick={() => navigate("/admin-dashboard")} src={homeIcon} alt="homeIcon" className="w-5 h-5 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
//                 <h1 className="font-semibold sm:text-3xl lg:text-4xl">LIST OF TEACHERS</h1>
//                 <button className="bg-blue-500 text-white cursor-pointer p-1 rounded text-xs sm:text-base">Create Teacher</button>
//             </div>
//             <div className="flex flex-col items-center">
//                 <input onChange={(event) => setQuery(event.target.value)} value={query} type="text" placeholder="search teacher" className="my-2 px-5 py-2 bg-gray-300 outline-0 rounded-full w-[70vw] text-sm sm:text-base sm:my-4 sm:w-100 sm:py-4 md:px-7 md:w-110 lg:py-5 lg:w-150 lg:my-5"/>
//                 <div className="bg-gray-100 shadow-2xl rounded w-[97vw] py-3 my-2 sm:py-5 sm:px-2 sm:my-4 sm:w-[95vw] md:px-3 lg:my-2 lg:px-4 xl:px-5">
//                     <div className="grid grid-cols-4 gap-x-1 gap-y-3 mb-3 mx-auto font-semibold text-blue-950 text-xs sm:text-base sm:gap-x-2 lg:gap-3 lg:mb-4 lg:text-2xl">
//                         <h1 className="flex justify-center">NAME</h1>
//                         <h1 className="flex justify-center">COURSE</h1>
//                         <h1 className="flex justify-center">TEACHER ID</h1>
//                         <h1 className="flex justify-center">ACTION</h1>
//                     </div>
//                     <hr />
//                     { query.trim() === "" && teachers.length > 0 ?
//                         teachers.map((teacher,index) => (
//                             <div key={index} className="grid grid-cols-4 gap-1 my-2 text-xs sm:text-base">
//                                 <h1 className="flex justify-center">{teacher.userId.name}</h1>
//                                 <h1 className="flex justify-center">{teacher.courseId.courseName}</h1>
//                                 <h1 className="flex justify-center">{teacher.teacherId}</h1>
//                                 <div className="flex justify-center">
//                                     <img onClick={() =>  handleDeleteTeacher(teacher.teacherId,teacher.employeeId)} src={removeIcon} alt="removeIcon" className="w-4 h-4 cursor-pointer hover:opacity-60 transition-all duration-400 ease-in-out sm:w-5 sm:h-5"/>
//                                 </div>
//                             </div>
//                         )) : query.trim() !== "" && result.length > 0 ?
//                         result.map((teacher,index) => (
//                             <div key={index} className="grid grid-cols-4 gap-1 my-2 text-xs sm:text-base">
//                                 <h1 className="flex justify-center">{teacher.userId.name}</h1>
//                                 <h1 className="flex justify-center">{teacher.courseId.courseName}</h1>
//                                 <h1 className="flex justify-center">{teacher.teacherId}</h1>
//                                 <div className="flex justify-center">
//                                     <img onClick={() =>  handleDeleteTeacher(teacher.teacherId,teacher.employeeId)} src={removeIcon} alt="removeIcon" className="w-4 h-4 cursor-pointer hover:opacity-60 transition-all duration-400 ease-in-out sm:w-5 sm:h-5"/>
//                                 </div>
//                             </div>
//                         )) : <div className="text-center">No teacher found</div>
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Teachers;

import { useContext, useEffect, useState } from "react";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
import { useNavigate } from "react-router-dom";
import { Home, UserPlus, Trash2, Search } from "lucide-react";

const Teachers = () => {
    const { teachers, getTeachers, deleteTeacher } = useContext(AdminDashboardContext);
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);

    const handleGetTeachers = async () => {
        await getTeachers();
    };

    const handleDeleteTeacher = async (teacherId, employeeId) => {
        // Keeps your exact structural logic execution intact
        await deleteTeacher(teacherId, employeeId);
    };

    useEffect(() => {
        handleGetTeachers();
    }, []);

    useEffect(() => {
        const filteredTeachers = teachers.filter(
            (teacher) =>
                teacher.userId.name.toLowerCase().includes(query.trim().toLowerCase()) ||
                teacher.teacherId.includes(query.trim()) ||
                teacher.employeeId.includes(query.trim()) ||
                teacher.courseId.courseName.toLowerCase().includes(query.trim().toLowerCase())
        );
        setResult(filteredTeachers);
    }, [query, teachers]); // Added teachers dependency safely to stay synced with state mutations

    // Helper logic assignment matching your exact filtering rules to clean up render views
    const visibleTeachers = query.trim() === "" ? teachers : result;

    return (
        <div className="bg-slate-950 min-h-screen text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-blue-600 selection:text-white">
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* Responsive Header Deck */}
                <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-900/40 backdrop-blur-md border border-slate-800/60 p-4 rounded-2xl gap-4 shadow-xl">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button 
                            onClick={() => navigate("/admin-dashboard")}
                            className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none border border-slate-800/40 shadow-inner shrink-0"
                            aria-label="Navigate Home"
                        >
                            <Home className="w-5 h-5" />
                        </button>
                        <h1 className="font-bold text-lg sm:text-xl lg:text-2xl tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent truncate">
                            LIST OF TEACHERS
                        </h1>
                    </div>
                    
                    <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl text-sm cursor-pointer hover:bg-blue-500 shadow-lg shadow-blue-600/10 active:scale-98 transition-all duration-300 focus:outline-none">
                        <UserPlus className="w-4 h-4" />
                        <span>Create Teacher</span>
                    </button>
                </div>

                {/* Central Workspace Controls */}
                <div className="flex flex-col items-center space-y-4">
                    
                    {/* Dark Glass Search Inputs */}
                    <div className="w-full max-w-xl flex items-center gap-3 bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl px-4 py-3 focus-within:border-blue-500/50 focus-within:shadow-lg focus-within:shadow-blue-500/[0.02] transition-all duration-300">
                        <Search className="w-5 h-5 text-slate-500 shrink-0" />
                        <input 
                            onChange={(event) => setQuery(event.target.value)} 
                            value={query}
                            type="text" 
                            placeholder="Search by name, ID, or course..." 
                            className="w-full bg-transparent text-slate-200 placeholder-slate-500 text-sm sm:text-base outline-none font-medium"
                        />
                    </div>

                    {/* Main Responsive Table Wrapper */}
                    <div className="w-full bg-slate-900/20 backdrop-blur-xl border border-slate-900 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                                
                                {/* Structural Table Headers */}
                                <thead>
                                    <tr className="border-b border-slate-800/60 bg-slate-900/40 text-slate-400 font-semibold tracking-wider text-xs uppercase">
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Course</th>
                                        <th className="px-6 py-4">Teacher ID</th>
                                        <th className="px-6 py-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                
                                {/* Dynamic Data Mapping Stream */}
                                <tbody className="divide-y divide-slate-800/40 text-slate-300">
                                    {visibleTeachers.length > 0 ? (
                                        visibleTeachers.map((teacher, index) => (
                                            <tr 
                                                key={index} 
                                                className="hover:bg-slate-900/30 transition-colors duration-200 group"
                                            >
                                                <td className="px-6 py-4 font-medium text-slate-200 group-hover:text-white max-w-[200px] truncate">
                                                    {teacher.userId?.name || "N/A"}
                                                </td>
                                                <td className="px-6 py-4 max-w-[180px] truncate">
                                                    <span className="px-2.5 py-1 bg-slate-800/60 border border-slate-700/30 text-slate-300 text-xs rounded-md font-medium">
                                                        {teacher.courseId?.courseName || "N/A"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-mono text-xs text-slate-400 tracking-tight">
                                                    {teacher.teacherId}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center">
                                                        <button 
                                                            onClick={() => handleDeleteTeacher(teacher.teacherId, teacher.employeeId)}
                                                            className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all duration-300 cursor-pointer focus:outline-none"
                                                            title="Delete Teacher Node"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        /* Edge case validation fallback interface */
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-sm text-slate-500 font-medium">
                                                No teacher records found matching that query criteria.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Teachers;