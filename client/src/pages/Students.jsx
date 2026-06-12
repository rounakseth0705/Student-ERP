// import { useContext, useEffect, useState } from "react";
// import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
// import removeIcon from "../assets/removeIcon.svg";
// import homeIcon from "../assets/homeIcon.svg";
// import { useNavigate } from "react-router-dom";

// const Students = () => {
//     const { students, getStudents, deleteStudent } = useContext(AdminDashboardContext);
//     const navigate = useNavigate();
//     const [result, setResult] = useState([]);
//     const [query, setQuery] = useState("");
//     const handleGetStudents = async () => {
//         await getStudents();
//     }
//     const handleDeleteStudent = async (studentId,rollNo) => {
//         await deleteStudent(studentId,rollNo);
//     }
//     useEffect(() => {
//         handleGetStudents();
//     },[]);
//     useEffect(() => {
//         const filteredStudents = students.filter(student => student.userId.name.toLowerCase().includes(query.trim().toLowerCase()) || student.studentId.includes(query.trim()) || student.rollNo.includes(query.trim()) || student.courseId.courseName.toLowerCase().includes(query.trim().toLowerCase()));
//         setResult(filteredStudents);
//     },[query]);
//     return(
//         <div className="bg-blue-100 min-h-screen">
//             <div className="flex justify-between items-center px-[2vw] py-[2vh] sm:px-5 sm:py-6 lg:py-4">
//                 <img onClick={() => navigate("/admin-dashboard")} src={homeIcon} alt="homeIcon" className="w-5 h-5 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
//                 <h1 className="font-semibold sm:text-3xl lg:text-4xl">LIST OF STUDENTS</h1>
//                 <button className="bg-blue-500 text-white text-xs cursor-pointer rounded p-1 sm:text-base">Create Student</button>
//             </div>
//             <div className="flex flex-col items-center">
//                 <input onChange={(event) => setQuery(event.target.value)} value={query} type="text" placeholder="search student" className="bg-gray-300 mt-5 py-3 px-5 w-[70vw] rounded-full outline-0 text-sm sm:text-base sm:w-[60vw] md:w-[50vw] md:py-5"/>
//                 <div className="bg-gray-100 mt-5 w-screen rounded shadow-lg pb-1 sm:w-[98vw] md:w-[97vw] lg:w-[95vw] xl:w-[90vw]">
//                     <div className="grid grid-cols-5 py-3 font-semibold text-xs sm:text-base">
//                         <h1 className="flex justify-center items-center">Name</h1>
//                         <h1 className="flex justify-center items-center">Student ID</h1>
//                         <h1 className="flex justify-center items-center">Course</h1>
//                         <h1 className="flex justify-center items-center">Semester</h1>
//                         <h1 className="flex justify-center items-center">Action</h1>
//                     </div>
//                     <hr className="mb-3"/>
//                     { students.length > 0 && query.trim() === "" ?
//                         students.map(student => {
//                             const attendance = student.classesAttended != 0 && student.courseId.classesDelivered[student.semester-1] ? Number(((student.classesAttended/student.courseId.classesDelivered[student.semester-1])*100).toFixed(2)) : 0;
//                             return(
//                                 <div key={student.studentId} className="grid grid-cols-5 my-1 text-xs sm:text-sm lg:text-base">
//                                     <h1 className="flex justify-center items-center">{student.userId.name}</h1>
//                                     <h1 className="flex justify-center items-center">{student.studentId}</h1>
//                                     <h1 className="flex justify-center items-center">{student.courseId.courseName}</h1>
//                                     <h1 className="flex justify-center items-center">{student.semester}</h1>
//                                     <div className="flex justify-center items-center hover:opacity-60 cursor-pointer">
//                                         <img onClick={() => handleDeleteStudent(student.studentId,student.rollNo)} src={removeIcon} alt="removeIcon" className="w-4 h-4 sm:w-5 sm:h-5"/>
//                                     </div>
//                                 </div>
//                             )
//                         }) : result.length > 0 && query.trim() !== "" ?
//                         result.map(student => {
//                             const attendance = student.classesAttended != 0 && student.courseId.classesDelivered[student.semester-1] ? Number(((student.classesAttended/student.courseId.classesDelivered[student.semester-1])*100).toFixed(2)) : 0;
//                             return(
//                                 <div key={student.studentId} className="grid grid-cols-5 my-1 text-xs sm:text-base">
//                                     <h1 className="flex justify-center items-center">{student.userId.name}</h1>
//                                     <h1 className="flex justify-center items-center">{student.studentId}</h1>
//                                     <h1 className="flex justify-center items-center">{student.courseId.courseName}</h1>
//                                     <h1 className="flex justify-center items-center">{student.semester}</h1>
//                                     <div className="flex justify-center items-center hover:opacity-60 cursor-pointer">
//                                         <img onClick={() => handleDeleteStudent(student.studentId,student.rollNo)} src={removeIcon} alt="removeIcon" className="w-4 h-4 sm:w-5 sm:h-5"/>
//                                     </div>
//                                 </div>
//                             )
//                         }) : <div>No student found</div>
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Students;

import { useContext, useEffect, useState } from "react";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
import { useNavigate } from "react-router-dom";
import { Home, UserPlus, Trash2, Search } from "lucide-react";

const Students = () => {
    const { students, getStudents, deleteStudent } = useContext(AdminDashboardContext);
    const navigate = useNavigate();
    const [result, setResult] = useState([]);
    const [query, setQuery] = useState("");

    const handleGetStudents = async () => {
        await getStudents();
    };

    const handleDeleteStudent = async (studentId, rollNo) => {
        await deleteStudent(studentId, rollNo);
    };

    useEffect(() => {
        handleGetStudents();
    }, []);

    useEffect(() => {
        const filteredStudents = students.filter(
            (student) =>
                student.userId.name.toLowerCase().includes(query.trim().toLowerCase()) ||
                student.studentId.includes(query.trim()) ||
                student.rollNo.includes(query.trim()) ||
                student.courseId.courseName.toLowerCase().includes(query.trim().toLowerCase())
        );
        setResult(filteredStudents);
    }, [query, students]);

    // Consolidates rendering view using your exact logical requirements
    const visibleStudents = query.trim() === "" ? students : result;

    return (
        <div className="bg-slate-950 min-h-screen text-slate-100 font-sans p-3 sm:p-6 lg:p-8 selection:bg-blue-600 selection:text-white">
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* Modern Dynamic Header Row */}
                <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-900/40 backdrop-blur-md border border-slate-800/60 p-4 rounded-2xl gap-4 shadow-xl">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button 
                            onClick={() => navigate("/admin-dashboard")}
                            className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none border border-slate-800/40 shadow-inner shrink-0"
                            aria-label="Go Home"
                        >
                            <Home className="w-5 h-5" />
                        </button>
                        <h1 className="font-bold text-lg sm:text-xl lg:text-2xl tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent truncate">
                            LIST OF STUDENTS
                        </h1>
                    </div>
                    
                    <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl text-sm cursor-pointer hover:bg-blue-500 shadow-lg shadow-blue-600/10 active:scale-98 transition-all duration-300 focus:outline-none">
                        <UserPlus className="w-4 h-4" />
                        <span>Create Student</span>
                    </button>
                </div>

                {/* Central Filtration Actions */}
                <div className="flex flex-col items-center space-y-4">
                    
                    {/* Glassmorphic Search Input Bar */}
                    <div className="w-full max-w-xl flex items-center gap-3 bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl px-4 py-3 focus-within:border-blue-500/50 focus-within:shadow-lg focus-within:shadow-blue-500/[0.02] transition-all duration-300">
                        <Search className="w-5 h-5 text-slate-500 shrink-0" />
                        <input 
                            onChange={(event) => setQuery(event.target.value)} 
                            value={query}
                            type="text" 
                            placeholder="Search by name, ID, course, or roll number..." 
                            className="w-full bg-transparent text-slate-200 placeholder-slate-500 text-sm sm:text-base outline-none font-medium"
                        />
                    </div>

                    {/* Responsive Dynamic Data Table Layer */}
                    <div className="w-full bg-slate-900/20 backdrop-blur-xl border border-slate-900 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px] border-collapse text-left text-sm">
                                
                                <thead>
                                    <tr className="border-b border-slate-800/60 bg-slate-900/40 text-slate-400 font-semibold tracking-wider text-xs uppercase">
                                        <th className="px-6 py-4">Name</th>
                                        <th className="px-6 py-4">Student ID</th>
                                        <th className="px-6 py-4">Course</th>
                                        <th className="px-6 py-4">Semester</th>
                                        <th className="px-6 py-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                
                                <tbody className="divide-y divide-slate-800/40 text-slate-300">
                                    {visibleStudents.length > 0 ? (
                                        visibleStudents.map((student) => {
                                            // Evaluates your exactly embedded background calculations securely
                                            const attendance = student.classesAttended !== 0 && student.courseId.classesDelivered[student.semester - 1] 
                                                ? Number(((student.classesAttended / student.courseId.classesDelivered[student.semester - 1]) * 100).toFixed(2)) 
                                                : 0;

                                            return (
                                                <tr 
                                                    key={student.studentId} 
                                                    className="hover:bg-slate-900/30 transition-colors duration-200 group"
                                                >
                                                    <td className="px-6 py-4 font-medium text-slate-200 group-hover:text-white max-w-[180px] truncate">
                                                        {student.userId?.name || "N/A"}
                                                    </td>
                                                    <td className="px-6 py-4 font-mono text-xs text-slate-400 tracking-tight">
                                                        {student.studentId}
                                                    </td>
                                                    <td className="px-6 py-4 max-w-[180px] truncate">
                                                        <span className="px-2.5 py-1 bg-slate-800/60 border border-slate-700/30 text-slate-300 text-xs rounded-md font-medium">
                                                            {student.courseId?.courseName || "N/A"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 font-medium">
                                                        <span className="text-slate-400 text-xs mr-1">Sem</span>
                                                        {student.semester}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex justify-center">
                                                            <button 
                                                                onClick={() => handleDeleteStudent(student.studentId, student.rollNo)}
                                                                className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all duration-300 cursor-pointer focus:outline-none"
                                                                title="Remove Student Record"
                                                            >
                                                                <Trash2 className="w-4.5 h-4.5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-sm text-slate-500 font-medium">
                                                No student records found matching that query criteria.
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

export default Students;