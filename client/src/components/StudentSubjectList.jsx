// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
// import { useEffect } from "react";
// import { UserContext } from "../context/AuthContext.jsx";

// const StudentSubjectList = ({ isNavigate=false }) => {
//     const { userIdentity } = useContext(UserContext);
//     const { subjects, getSubjects } = useContext(StudentDashboardContext);
//     const navigate = useNavigate();
//     const handleGetSubjects = async () => {
//         await getSubjects(userIdentity.courseId._id,userIdentity.semester);
//     }
//     useEffect(() => {
//         handleGetSubjects();
//     },[]);
//     return(
//         <div className="grid grid-cols-1 gap-8 mt-8 mx-10 sm:mt-15 sm:grid-cols-2 sm:mx-12 sm:gap-5 md:gap-10 md:mx-20 lg:mx-40 xl:mx-50">
//             {
//                 subjects.map((subject,index) => (
//                     <div key={index} onClick={() => isNavigate && navigate(`${subject._id}/${subject.subjectName}/${subject.subjectCode}`)} className={`flex flex-col justify-center items-center py-5 bg-blue-200 text-blue-950 font-semibold rounded shadow-lg ${isNavigate && "cursor-pointer"} hover:scale-106 hover:shadow-blue-100 transition-all ease-in-out duration-700 text-xs sm:text-base`}>
//                         <h1>Subject: {subject.subjectName}</h1>
//                         <h1>Subject Code: {subject.subjectCode}</h1>
//                         { !isNavigate && <h1>Teacher: {subject.teacherId.userId.name}</h1> }
//                         <h1>Semester: {subject.semester}</h1>
//                     </div>
//                 ))
//             }
//         </div>
//     )
// }

// export default StudentSubjectList;

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
import { UserContext } from "../context/AuthContext.jsx";
import { BookOpen, Hash, User, Layers } from "lucide-react";

const StudentSubjectList = ({ isNavigate = false }) => {
    const { userIdentity } = useContext(UserContext);
    const { subjects, getSubjects } = useContext(StudentDashboardContext);
    const navigate = useNavigate();

    const handleGetSubjects = async () => {
        await getSubjects(userIdentity.courseId._id, userIdentity.semester);
    };

    useEffect(() => {
        handleGetSubjects();
    }, []);

    return (
        <div className="w-full font-sans selection:bg-blue-600 selection:text-white px-4 sm:px-6 lg:px-8">
            {/* Optimized grid structural containment tailored to match our 2-column rule */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mt-6 sm:mt-10">
                {subjects.map((subject, index) => (
                    <div
                        key={index}
                        onClick={() =>
                            isNavigate &&
                            navigate(`${subject._id}/${subject.subjectName}/${subject.subjectCode}`)
                        }
                        className={`relative group flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-slate-900/30 backdrop-blur-xl border border-slate-800/80 shadow-xl transition-all duration-300 ${
                            isNavigate
                                ? "cursor-pointer hover:border-blue-500/40 hover:bg-blue-500/[0.02] hover:shadow-blue-500/[0.02] transform hover:-translate-y-1"
                                : ""
                        }`}
                    >
                        {/* Upper Details Block: Title & Badges */}
                        <div className="space-y-3.5">
                            
                            {/* Subject Header */}
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500/20 transition-colors shrink-0">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Subject Name</p>
                                    <h1 className="text-slate-200 font-bold text-sm sm:text-base tracking-wide group-hover:text-white transition-colors truncate mt-0.5">
                                        {subject.subjectName}
                                    </h1>
                                </div>
                            </div>

                            {/* Metadata Grid */}
                            <div className="grid grid-cols-2 gap-3 pt-1">
                                {/* Subject Code */}
                                <div className="flex items-center gap-2 bg-slate-950/40 border border-slate-900 px-3 py-2 rounded-xl">
                                    <Hash className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-[9px] uppercase tracking-wider text-slate-500 font-medium">Code</p>
                                        <p className="font-mono text-xs font-semibold text-slate-300 truncate mt-0.5">
                                            {subject.subjectCode}
                                        </p>
                                    </div>
                                </div>

                                {/* Semester Data */}
                                <div className="flex items-center gap-2 bg-slate-950/40 border border-slate-900 px-3 py-2 rounded-xl">
                                    <Layers className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-[9px] uppercase tracking-wider text-slate-500 font-medium">Semester</p>
                                        <p className="text-xs font-bold text-slate-300 truncate mt-0.5">
                                            Sem {subject.semester}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Lower Dynamic Conditional Node Section */}
                        {!isNavigate && subject.teacherId?.userId?.name && (
                            <div className="mt-4 pt-3.5 border-t border-slate-800/40 flex items-center gap-2 text-xs font-medium text-slate-400">
                                <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                <span className="truncate">
                                    Instructor: <span className="text-slate-300 font-semibold">{subject.teacherId.userId.name}</span>
                                </span>
                            </div>
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentSubjectList;