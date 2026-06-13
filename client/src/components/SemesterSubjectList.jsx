// import React, { useContext } from "react";
// import { UserContext } from "../context/AuthContext.jsx";
// import editIcon from "../assets/editIcon.svg";
// import removeIcon from "../assets/removeIcon.svg";
// import checkIcon from "../assets/checkIcon.svg";
// import { useNavigate } from "react-router-dom";
// import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";

// const SemesterSubjectList = ({ filteredSubjects, courseId, courseCode, semester }) => {
//     const { userIdentity, isEditing, newTeacherId, temperarySubjectCode, setTemperarySubjectCode, setNewTeacherId, setIsEditing } = useContext(UserContext);
//     const { deleteSubject, changeSubjectTeacher } = useContext(AdminDashboardContext);
//     const navigate = useNavigate();
//     const handleEditTeacherId = async (subjectCode,teacherId) => {
//         await changeSubjectTeacher(subjectCode,teacherId,newTeacherId);
//         setTemperarySubjectCode("");
//         setNewTeacherId("");
//         setIsEditing(false);
//     }
//     const handleDeleteSubject = async (subjectId) => {
//         await deleteSubject(subjectId);
//     }
//     return(
//         <>
//             <div className="flex justify-center items-center gap-12 sm:gap-50 md:gap-80 lg:gap-150 xl:gap-200">
//                 { filteredSubjects.length > 0 && <h1 className="text-blue-950 font-semibold p-2 ml-2 sm:text-2xl sm:mx-5">Subjects List</h1> }
//                 { !userIdentity &&
//                     <button onClick={() => navigate(`/admin-dashboard/courses/${courseId}/${courseCode}/${semester}/create-subject`)} className="flex justify-center items-center gap-1 bg-blue-600 text-white text-sm rounded cursor-pointer py-1 px-2 mr-2 hover:bg-blue-500 transition-all duration-400 ease-in-out sm:text-base sm:p-2 sm:mx-5">Add Subject</button>
//                 }
//             </div>
//             { filteredSubjects.length > 0 &&
//                 <div className="mt-5 mb-10 mx-2 bg-blue-50 text-blue-950 text-sm rounded shadow-lg sm:text-base sm:mx-3 md:mx-5 lg:mx-10">
//                     <div className={`grid ${userIdentity ? "grid-cols-3" : "grid-cols-4"} font-semibold py-2 sm:px-2`}>
//                         <h1 className="flex justify-center sm:mx-2 md:mx-2 lg:mx-7">NAME</h1>
//                         <h1 className="flex justify-center sm:mx-2 md:mx-2 lg:mx-7">CODE</h1>
//                         <h1 className="flex justify-center sm:mx-2 md:mx-2 lg:mx-7">TEACHER</h1>
//                         { !userIdentity && <h1 className="flex justify-center sm:mx-2 md:mx-2 lg:mx-7">ACTION</h1> }
//                     </div>
//                     { filteredSubjects.length > 0 &&
//                         filteredSubjects.map((subject,index) => (
//                             <React.Fragment key={index}>
//                                 <hr/>
//                                 <div className={`grid ${userIdentity ? "grid-cols-3" : "grid-cols-4"} p-2`}>
//                                     <h1 className="flex justify-center flex-wrap text-xs sm:text-base sm:mx-2 md:mx-2 lg:mx-7">{subject.subjectName}</h1>
//                                     <h1 className="flex justify-center text-xs sm:text-base sm:mx-2 md:mx-2 lg:mx-7">{subject.subjectCode}</h1>
//                                     <div className="flex justify-center gap-1 sm:gap-2">
//                                         { isEditing && subject.subjectCode===temperarySubjectCode ? <input onChange={(event) => setNewTeacherId(event.target.value)} value={newTeacherId} type="text" className="border rounded px-1 w-20 text-xs sm:text-base sm:w-25 md:w-30"/> : <h1 className="text-xs sm:text-base sm:mx-2 md:mx-2 lg:mx-7">{ userIdentity ? subject.teacherId.userId.name : subject.teacherId.teacherId }</h1> }
//                                         { (isEditing && subject.subjectCode===temperarySubjectCode) && <img onClick={() => handleEditTeacherId(subject.subjectCode,subject.teacherId.teacherId)} src={checkIcon} alt="checkIcon" className="w-5 h-5 cursor-pointer" /> }
//                                     </div>
//                                     { !userIdentity &&
//                                         <div className="flex justify-center gap-1 sm:gap-2 sm:mx-2 md:gap-3 md:mx-2 lg:mx-7">
//                                             <img onClick={() => {
//                                                 setIsEditing(true);
//                                                 setTemperarySubjectCode(subject.subjectCode);
//                                             }} src={editIcon} alt="editIcon" className="w-4 h-4 cursor-pointer hover:opacity-60 transition-all duration-400 ease-in-out sm:w-5 sm:h-5" />
//                                             <img onClick={() => handleDeleteSubject(subject._id)} src={removeIcon} alt="removeIcon" className="w-4 h-4 cursor-pointer hover:opacity-60 transition-all duration-400 ease-in-out sm:w-5 sm:h-5" />
//                                         </div>
//                                     }
//                                 </div>
//                             </React.Fragment>
//                         ))
//                     }
//                 </div>
//             }
//         </>
//     )
// }

// export default SemesterSubjectList;

import React, { useContext } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
// Premium Lucide Icons Ecosystem
import { Plus, Edit2, Trash2, Check, BookOpen, AlertCircle } from "lucide-react";

const SemesterSubjectList = ({ filteredSubjects, courseId, courseCode, semester }) => {
    const { userIdentity, isEditing, newTeacherId, temperarySubjectCode, setTemperarySubjectCode, setNewTeacherId, setIsEditing } = useContext(UserContext);
    const { deleteSubject, changeSubjectTeacher } = useContext(AdminDashboardContext);
    const navigate = useNavigate();

    const handleEditTeacherId = async (subjectCode, teacherId) => {
        await changeSubjectTeacher(subjectCode, teacherId, newTeacherId);
        setTemperarySubjectCode("");
        setNewTeacherId("");
        setIsEditing(false);
    }
    const handleDeleteSubject = async (subjectId) => {
        await deleteSubject(subjectId);
    }

    return (
        <div className="w-full bg-[#090f1c] border border-slate-900 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
            
            {/* Control Bar Cluster Header */}
            <div className="flex flex-row items-center justify-between gap-4 pb-2 border-b border-slate-900/60">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-200 tracking-tight">Curriculum Syllabus</h3>
                </div>
                {!userIdentity && (
                    <button 
                        onClick={() => navigate(`/admin-dashboard/courses/${courseId}/${courseCode}/${semester}/create-subject`)} 
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow transition-all active:scale-95 cursor-pointer focus:outline-none"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Subject</span>
                    </button>
                )}
            </div>

            {/* Dynamic Grid Listing Representation Data Ledger */}
            {filteredSubjects.length > 0 ? (
                <div className="border border-slate-900 rounded-xl overflow-hidden bg-slate-950/30">
                    
                    {/* Responsive Matrix Title Label Row Header */}
                    <div className={`grid ${userIdentity ? "grid-cols-3" : "grid-cols-4"} bg-slate-950/80 px-4 py-3 text-left text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono border-b border-slate-900`}>
                        <div className="text-left">Subject</div>
                        <div className="text-center font-mono">Code</div>
                        <div className="text-center">Instructor</div>
                        {!userIdentity && <div className="text-right pr-2">Action</div>}
                    </div>

                    {/* Matrix Row Nodes Loop */}
                    <div className="divide-y divide-slate-900/60">
                        {filteredSubjects.map((subject, index) => {
                            const isCurrentEditingRow = isEditing && subject.subjectCode === temperarySubjectCode;
                            return (
                                <div key={index} className={`grid ${userIdentity ? "grid-cols-3" : "grid-cols-4"} px-4 py-3.5 items-center hover:bg-slate-900/20 transition-colors`}>
                                    
                                    {/* Column 1: Subject Name */}
                                    <div className="text-xs sm:text-sm font-bold text-slate-200 truncate pr-2">
                                        {subject.subjectName}
                                    </div>
                                    
                                    {/* Column 2: Code Identifier */}
                                    <div className="text-center text-xs font-mono font-semibold text-slate-400">
                                        {subject.subjectCode}
                                    </div>
                                    
                                    {/* Column 3: Instructor Assignment Area */}
                                    <div className="flex items-center justify-center gap-2">
                                        {isCurrentEditingRow ? (
                                            <div className="flex items-center gap-1.5">
                                                <input 
                                                    onChange={(event) => setNewTeacherId(event.target.value)} 
                                                    value={newTeacherId} 
                                                    type="text" 
                                                    className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white w-20 sm:w-28 focus:outline-none focus:border-blue-500 font-mono"
                                                    placeholder="ID Code"
                                                />
                                                <button 
                                                    onClick={() => handleEditTeacherId(subject.subjectCode, subject.teacherId.teacherId)}
                                                    className="p-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-md hover:bg-emerald-600 hover:text-white transition-all cursor-pointer"
                                                >
                                                    <Check className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-xs sm:text-sm text-slate-300 font-medium truncate max-w-[90px] sm:max-w-none">
                                                {userIdentity ? subject.teacherId.userId?.name : subject.teacherId.teacherId}
                                            </span>
                                        )}
                                    </div>

                                    {/* Column 4: Context Mutator Configurations Button Group */}
                                    {!userIdentity && (
                                        <div className="flex flex-row justify-end items-center gap-1.5 sm:gap-2 pr-1">
                                            <button 
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    setTemperarySubjectCode(subject.subjectCode);
                                                }}
                                                className="p-1.5 bg-slate-950 border border-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-800 rounded-lg transition-all active:scale-95 cursor-pointer"
                                                title="Modify Staff Allocation"
                                            >
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteSubject(subject._id)}
                                                className="p-1.5 bg-slate-950 border border-slate-900 text-slate-400 hover:text-rose-400 hover:border-rose-950 rounded-lg transition-all active:scale-95 cursor-pointer"
                                                title="Remove Discipline Module"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    )}

                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center p-6 bg-slate-950/30 border border-slate-900 rounded-xl">
                    <AlertCircle className="w-8 h-8 text-slate-600 mb-2" />
                    <p className="text-xs text-slate-500">No core subjects registered in this configuration module context.</p>
                </div>
            )}
        </div>
    );
}

export default SemesterSubjectList;