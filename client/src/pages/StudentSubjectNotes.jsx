// import { useNavigate, useParams } from "react-router-dom";
// import leftArrowBlack from "../assets/leftArrowBlack.svg";
// import { useContext } from "react";
// import { UserContext } from "../context/AuthContext.jsx";
// import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
// import { useEffect } from "react";
// import fileOpenIcon from "../assets/fileOpenIcon.svg";
// import downloadIcon from "../assets/downloadIcon.svg";
// import CurrentTime from "../components/CurrentTime.jsx";

// const StudentSubjectNotes = () => {
//     const { subjectId, subjectName, subjectCode } = useParams();
//     const { userIdentity } = useContext(UserContext);
//     const { notes, getNotes } = useContext(StudentDashboardContext);
//     const navigate = useNavigate();
//     const handleGetNotes = async () => {
//         await getNotes(subjectId,userIdentity.courseId._id,userIdentity.semester);
//     }
//     useEffect(() => {
//         handleGetNotes();
//     },[]);
//     return(
//         <>
//             <div className="flex justify-between items-center px-[2vw] py-[2vh] sm:px-5 sm:py-6 lg:py-4">
//                 <img onClick={() => navigate("/student-dashboard/notes")} src={leftArrowBlack} alt="leftArrow" className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
//                 <h1 className="font-semibold text-blue-950 sm:text-2xl lg:text-3xl">{subjectName} ({subjectCode})</h1>
//                 <h1></h1>
//             </div>
//             <div className="mt-[1vh] mb-[3vh] mx-5 sm:mx-15 md:mx-20 lg:mx-30 xl:mx-35">
//                 { notes.length > 0 ?
//                     notes.map((note,index) => (
//                         <div key={index} className="flex justify-between items-center my-5 py-3 bg-blue-200 rounded shadow-lg">
//                             <h1 className="text-sm mx-3 sm:text-base sm:mx-5 md:mx-10 lg:mx-15 xl:mx-20">{note.notesName}</h1>
//                             <h1 className="text-sm mx-3 sm:text-base sm:mx-5 md:mx-10 lg:mx-15 xl:mx-20">{new Date(note.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
//                             <span className="mx-3 sm:mx-5 md:mx-10 lg:mx-15 xl:mx-20 cursor-pointer">
//                                 <img src={fileOpenIcon} alt="fileOpenIcon" className="w-4 h-4 sm:w-5 sm:h-5"/>
//                             </span>
//                             <span className="mx-3 sm:mx-5 md:mx-10 lg:mx-15 xl:mx-20 cursor-pointer">
//                                 <a href={note.notesDownloadUrl} download>
//                                     <img src={downloadIcon} alt="downloadIcon" className="w-4 h-4 sm:w-5 sm:h-5"/>
//                                 </a>
//                             </span>
//                         </div>
//                     )) : <h1 className="text-center">The notes haven't been provided by the teacher.</h1>
//                 }
//             </div>
//         </>
//     )
// }

// export default StudentSubjectNotes;

import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
import CurrentTime from "../components/CurrentTime.jsx";
// Premium Lucide Icons Ecosystem
import { ArrowLeft, FileText, Download, Eye, FileArchive } from "lucide-react";

const StudentSubjectNotes = () => {
    const { subjectId, subjectName, subjectCode } = useParams();
    const { userIdentity } = useContext(UserContext);
    const { notes, getNotes } = useContext(StudentDashboardContext);
    const navigate = useNavigate();

    const handleGetNotes = async () => {
        await getNotes(subjectId, userIdentity.courseId._id, userIdentity.semester);
    }

    useEffect(() => {
        handleGetNotes();
    }, []);

    return (
        <div className="bg-slate-950 text-slate-300 min-h-screen font-sans antialiased selection:bg-blue-600 selection:text-white pb-16">
            
            {/* Header Navigation Bar Panel - FORCED SINGLE ROW */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-900/60 shadow-xl mb-8">
                <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 flex flex-row flex-nowrap items-center justify-between gap-4">
                    
                    {/* Left Actions: Back Button */}
                    <button 
                        onClick={() => navigate("/student-dashboard/notes")}
                        className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none border border-slate-800/40 shadow-inner shrink-0 flex items-center justify-center"
                        aria-label="Back to notes directory"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    
                    {/* Centered Component Title */}
                    <h1 className="text-base font-bold tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent sm:text-xl md:text-2xl text-center truncate max-w-xs sm:max-w-md md:max-w-xl">
                        {subjectName} <span className="text-slate-500 font-mono text-xs sm:text-sm font-medium ml-1">({subjectCode})</span>
                    </h1>
                    
                    {/* Structural Balance Node Placeholder */}
                    <div className="w-10 h-10 pointer-events-none opacity-0 shrink-0" aria-hidden="true" />
                </div>
            </div>

            {/* Core Notes Repository Content Grid */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                {notes.length > 0 ? (
                    <div className="space-y-3">
                        {notes.map((note, index) => (
                            <div 
                                key={index} 
                                className="bg-[#090f1c] border border-slate-900 hover:border-slate-800/80 p-4 sm:p-5 rounded-2xl shadow-xl transition-all duration-300 flex flex-row items-center justify-between gap-4 group"
                            >
                                {/* Left Side: Icon Stack and Core Title Info */}
                                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                                    <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0 hidden sm:block">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-sm sm:text-base font-bold text-slate-200 tracking-tight truncate group-hover:text-white transition-colors">
                                            {note.notesName}
                                        </h3>
                                        <p className="text-[11px] sm:text-xs font-mono font-medium text-slate-500 mt-0.5">
                                            Published: {new Date(note.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                                        </p>
                                    </div>
                                </div>

                                {/* Right Side: Inline Action Button Clustered Row */}
                                <div className="flex items-center gap-2 shrink-0">
                                    
                                    {/* View Action Placeholder - Using standard lucide file preview vector asset replacement mapping style */}
                                    <button 
                                        className="p-2.5 bg-slate-950 border border-slate-900 hover:border-slate-800 text-slate-400 hover:text-slate-200 rounded-xl transition-all active:scale-95 cursor-pointer focus:outline-none"
                                        title="View Document Details"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>

                                    {/* Action Link: Download Resource Link Anchor */}
                                    <a 
                                        href={note.notesDownloadUrl} 
                                        download
                                        className="p-2.5 bg-slate-950 border border-slate-900 hover:border-slate-800 text-slate-400 hover:text-blue-400 rounded-xl transition-all active:scale-95 cursor-pointer focus:outline-none flex items-center justify-center"
                                        title="Download Notes File"
                                    >
                                        <Download className="w-4 h-4" />
                                    </a>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center p-12 bg-[#090f1c] border border-slate-900 rounded-2xl shadow-xl">
                        <FileArchive className="w-10 h-10 text-slate-600 mb-3" />
                        <h2 className="text-slate-400 font-semibold text-sm sm:text-base">No Materials Distributed</h2>
                        <p className="text-xs text-slate-600 max-w-xs mt-1">
                            The academic instructor has not uploaded or authorized study materials for this subject container ledger yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentSubjectNotes;