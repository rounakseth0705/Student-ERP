// import { useContext } from "react";
// import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
// import { useNavigate } from "react-router-dom";
// import { useRef } from "react";
// import toast from "react-hot-toast";

// const TeacherSubjects = ({ isMarkingAttendance=false }) => {
//     const { subjects } = useContext(TeacherDashboardContext);
//     const navigate = useNavigate();
//     const day = useRef(new Date().toLocaleDateString("en-US", { weekday: "short" }));
//     const handleNavigate = (subjectId,subjectName,subjectCode) => {
//         if (isMarkingAttendance) {
//             day.current === "Sat" || day.current === "Sun" ? toast.error("Cannot mark attendance") : navigate(`${subjectId}/${subjectName}/${subjectCode}`);
//         } else {
//             navigate(`${subjectId}/${subjectName}/${subjectCode}`);
//         }
//     }
//     return(
//         <div className="grid grid-cols-1 gap-8 mt-8 mx-10 sm:mt-12 sm:grid-cols-2 sm:mx-12 sm:gap-5 md:gap-10 md:mx-20 lg:mx-40 xl:mx-50">
//             {
//                 subjects.map((subject,index) => (
//                     <div key={index} onClick={() => handleNavigate(subject._id,subject.subjectName,subject.subjectCode)} className="flex flex-col justify-center items-center py-5 bg-blue-200 text-blue-950 font-semibold rounded shadow-lg cursor-pointer text-xs hover:scale-106 hover:shadow-blue-100 transition-all ease-in-out duration-700 sm:text-base">
//                         <h1>Subject: {subject.subjectName}</h1>
//                         <h1>Code: {subject.subjectCode}</h1>
//                         <h1>Semester: {subject.semester}</h1>
//                     </div>
//                 ))
//             }
//         </div>
//     )
// }

// export default TeacherSubjects;

import { useContext, useRef } from "react";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// Imported Lucide Icons to match Screenshot (271).png layout
import { GraduationCap, ArrowUpRight } from "lucide-react";

const TeacherSubjects = ({ isMarkingAttendance = false }) => {
    const { subjects } = useContext(TeacherDashboardContext);
    const navigate = useNavigate();
    const day = useRef(new Date().toLocaleDateString("en-US", { weekday: "short" }));

    const handleNavigate = (subjectId, subjectName, subjectCode) => {
        if (isMarkingAttendance) {
            day.current === "Sat" || day.current === "Sun" 
                ? toast.error("Cannot mark attendance") 
                : navigate(`${subjectId}/${subjectName}/${subjectCode}`);
        } else {
            navigate(`${subjectId}/${subjectName}/${subjectCode}`);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 selection:bg-blue-600 selection:text-white">
            {/* Grid Container matching the multi-column alignment archetype of the dashboard */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {subjects.map((subject, index) => (
                    <div 
                        key={subject._id || index} 
                        onClick={() => handleNavigate(subject._id, subject.subjectName, subject.subjectCode)} 
                        className="group relative flex flex-col justify-between p-5 bg-[#090f1c]/40 border border-slate-800/60 rounded-2xl cursor-pointer shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-900/50 hover:bg-[#0d1527]/50 select-none"
                    >
                        {/* Upper Details Block */}
                        <div className="space-y-4">
                            {/* Academic Badge Box mirroring Screenshot (271).png icon housing */}
                            <div className="inline-flex items-center justify-center p-2.5 rounded-xl bg-slate-950/40 border border-slate-800 text-slate-400 group-hover:text-blue-400 group-hover:border-blue-900/50 transition-colors">
                                <GraduationCap className="w-5 h-5" />
                            </div>

                            {/* Core Label Block */}
                            <div className="space-y-1.5">
                                <h2 className="text-lg font-bold text-white tracking-wide truncate group-hover:text-blue-400 transition-colors">
                                    {subject.subjectName}
                                </h2>
                                <p className="text-xs font-mono font-medium tracking-wider text-slate-400 uppercase">
                                    Code: {subject.subjectCode}
                                </p>
                            </div>
                        </div>

                        {/* Lower Functional Metadata Footer */}
                        <div className="mt-6 pt-4 border-t border-slate-800/40 flex items-center justify-between text-xs font-semibold tracking-wider uppercase text-slate-500">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-900 border border-slate-800 text-slate-300">
                                Sem {subject.semester}
                            </span>
                            
                            {/* Interactive Action Label */}
                            <span className="flex items-center gap-1 group-hover:text-slate-300 transition-colors text-[11px]">
                                Manage
                                <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-slate-600 group-hover:text-blue-400" />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeacherSubjects;