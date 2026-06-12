// import { useNavigate, useParams } from "react-router-dom";
// import leftArrowBlack from "../assets/leftArrowBlack.svg";
// import { useContext } from "react";
// import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
// import { UserContext } from "../context/AuthContext.jsx";
// import { useEffect } from "react";
// // import fileOpenIcon from "../assets/fileOpenIcon.svg";
// import downloadIcon from "../assets/downloadIcon.svg";
// import { useState } from "react";
// import { useRef } from "react";
// import CurrentTime from "../components/CurrentTime.jsx";

// const StudentSubjectAssignments = () => {
//     const { subjectId, subjectName, subjectCode } = useParams();
//     const { userIdentity } = useContext(UserContext);
//     const { assignments, getAssignments, uploadAssignment, getAssignmentUploads, assignmentUploads } = useContext(StudentDashboardContext);
//     const navigate = useNavigate();
//     const [assignmentUploadFile, setAssignmentUploadFile] = useState();
//     const date = useRef(new Date());
//     const handleGetAssignments = async () => {
//         await getAssignments(subjectId,userIdentity.courseId._id,userIdentity.semester);
//     }
//     const handleGetAssignmentUploads = async () => {
//         await getAssignmentUploads(subjectId);
//     }
//     const handleUploadAssignment = async (subjectId,assignmentId) => {
//         await uploadAssignment(subjectId,assignmentId,assignmentUploadFile);
//     }
//     useEffect(() => {
//         handleGetAssignments();
//         handleGetAssignmentUploads();
//     },[]);
//     return(
//         <>
//             <div className="flex justify-between items-center px-[2vw] py-[2vh] sm:px-5 sm:py-6 lg:py-4">
//                 <img onClick={() => navigate("/student-dashboard/assignments")} src={leftArrowBlack} alt="leftArrow" className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
//                 <h1 className="font-semibold text-blue-950 sm:text-2xl lg:text-3xl">{subjectName} ({subjectCode})</h1>
//                 <h1></h1>
//             </div>
//             <div className="mt-[1vh] mb-[3vh] mx-2 sm:mx-6 md:mx-6 lg:mx-10 xl:mx-20 2xl:mx-40">
//                 { assignments.length > 0 ?
//                     assignments.map((assignment,index) => {
//                         const status = assignmentUploads.length > 0 && assignmentUploads.some(assignmentUpload => assignmentUpload.assignmentId === assignment._id);
//                         return(
//                             <div key={index} className="flex flex-wrap justify-center items-center gap-5 my-5 py-3 bg-blue-200 rounded shadow-lg sm:justify-between sm:gap-0">
//                                 <h1 className="text-xs mx-2 sm:mx-3 sm:text-base md:mx-3 lg:mx-6 xl:mx-10">{assignment.assignmentName}</h1>
//                                 <h1 className="text-xs mx-2 sm:mx-3 sm:text-base md:mx-3 lg:mx-6 xl:mx-10">{new Date(assignment.assignmentSubmitDate).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
//                                 {/* <span className="mx-2 sm:mx-3 md:mx-3 lg:mx-6 xl:mx-10 cursor-pointer">
//                                     <img src={fileOpenIcon} alt="fileOpenIcon" className="w-4 h-4 md:w-5 md:h-5"/>
//                                 </span> */}
//                                 <span className="px-2 sm:px-3 md:px-3 lg:px-6 xl:px-10 cursor-pointer">
//                                     <a href={assignment.assignmentDownloadUrl} download>
//                                         <img src={downloadIcon} alt="downloadIcon" className="w-4 h-4 sm:w-5 sm:h-5"/>
//                                     </a>
//                                 </span>
//                                 { !(date.current > new Date(assignment.assignmentSubmitDate)) &&
//                                     <span className="sm:mx-3 md:mx-3 lg:mx-6 xl:mx-10">
//                                         <input onChange={(event) => setAssignmentUploadFile(event.target.files[0])} type="file" className="bg-gray-200 text-xs w-39 px-1 py-1 rounded cursor-pointer sm:text-base md:px-2 md:w-55"/>
//                                     </span>
//                                 }
//                                 <span>
//                                     { date.current > new Date(assignment.assignmentSubmitDate) ?
//                                         <h1 className="text-xs sm:text-base">Due date is over!</h1> :
//                                         (   assignmentUploadFile && 
//                                             <button onClick={() => handleUploadAssignment(assignment.assignmentSubjectId,assignment._id)} className="bg-green-500 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-green-400 transition-all duration-400 ease-in-out sm:text-base md:px-3">{status ? "Update File" : "Upload File"}</button>
//                                         )
//                                     }
//                                 </span>
//                                 <h1 className="text-xs sm:mx-3 sm:text-base md:mx-3 lg:mx-6 xl:mx-10 py-1 px-2">{status ? "Submitted" : "Not Submitted"}</h1>
//                             </div>
//                         )
//                     }) : <h1 className="text-center">The assignments haven't been provided by the teacher.</h1>
//                 }
//             </div>
//         </>
//     )
// }

// export default StudentSubjectAssignments;

import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
import { UserContext } from "../context/AuthContext.jsx";
import CurrentTime from "../components/CurrentTime.jsx";
// Premium Lucide Icons Ecosystem
import { ArrowLeft, Download, Upload, CheckCircle2, AlertCircle, FileUp, FolderOpen } from "lucide-react";

const StudentSubjectAssignments = () => {
    const { subjectId, subjectName, subjectCode } = useParams();
    const { userIdentity } = useContext(UserContext);
    const { assignments, getAssignments, uploadAssignment, getAssignmentUploads, assignmentUploads } = useContext(StudentDashboardContext);
    const navigate = useNavigate();
    const [assignmentUploadFile, setAssignmentUploadFile] = useState();
    const date = useRef(new Date());

    const handleGetAssignments = async () => {
        await getAssignments(subjectId, userIdentity.courseId._id, userIdentity.semester);
    }
    const handleGetAssignmentUploads = async () => {
        await getAssignmentUploads(subjectId);
    }
    const handleUploadAssignment = async (subjectId, assignmentId) => {
        await uploadAssignment(subjectId, assignmentId, assignmentUploadFile);
    }

    useEffect(() => {
        handleGetAssignments();
        handleGetAssignmentUploads();
    }, []);

    return (
        <div className="bg-slate-950 text-slate-300 min-h-screen font-sans antialiased selection:bg-blue-600 selection:text-white pb-16">
            
            {/* Header Navigation Bar Panel - FORCED SINGLE ROW */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-900/60 shadow-xl mb-8">
                <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 flex flex-row flex-nowrap items-center justify-between gap-4">
                    
                    {/* Left Actions: Back Button */}
                    <button 
                        onClick={() => navigate("/student-dashboard/assignments")}
                        className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none border border-slate-800/40 shadow-inner shrink-0 flex items-center justify-center"
                        aria-label="Back to assignments course folder"
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

            {/* Core Task Tracker Layout Area */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {assignments.length > 0 ? (
                    <div className="space-y-4">
                        {assignments.map((assignment, index) => {
                            const isOverdue = date.current > new Date(assignment.assignmentSubmitDate);
                            const status = assignmentUploads.length > 0 && assignmentUploads.some(
                                assignmentUpload => assignmentUpload.assignmentId === assignment._id
                            );

                            return (
                                <div 
                                    key={index} 
                                    className="bg-[#090f1c] border border-slate-900 hover:border-slate-800/80 p-5 rounded-2xl shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5 group"
                                >
                                    {/* Task Core Details Left Column */}
                                    <div className="flex items-start gap-4 min-w-0 flex-1">
                                        <div className={`p-3 rounded-xl border shrink-0 hidden sm:block ${
                                            status 
                                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                                                : isOverdue 
                                                    ? "bg-slate-900 border-slate-800 text-slate-500" 
                                                    : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                                        }`}>
                                            <FolderOpen className="w-5 h-5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-sm sm:text-base font-bold text-slate-200 tracking-tight leading-snug group-hover:text-white transition-colors truncate">
                                                {assignment.assignmentName}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-slate-500 font-medium">
                                                <span className="font-mono">
                                                    Due: {new Date(assignment.assignmentSubmitDate).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                                                </span>
                                                <span className="text-slate-700 hidden sm:inline">•</span>
                                                <span className={`inline-flex items-center gap-1 font-semibold ${status ? "text-emerald-400" : "text-amber-500"}`}>
                                                    {status ? (
                                                        <>
                                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                                            <span>Submitted</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <AlertCircle className="w-3.5 h-3.5" />
                                                            <span>Pending Actions</span>
                                                        </>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Task Actions Control Panel Right Block */}
                                    <div className="flex flex-wrap items-center gap-3 pt-3 md:pt-0 border-t border-slate-900 md:border-none shrink-0 justify-between sm:justify-start">
                                        
                                        {/* Resource Repository Download Link Trigger */}
                                        <a 
                                            href={assignment.assignmentDownloadUrl} 
                                            download
                                            className="inline-flex items-center justify-center p-2.5 bg-slate-950 border border-slate-900 hover:border-slate-800 text-slate-400 hover:text-blue-400 rounded-xl transition-all active:scale-95 cursor-pointer focus:outline-none"
                                            title="Download Task Reference File"
                                        >
                                            <Download className="w-4 h-4" />
                                        </a>

                                        {/* Dynamic State Interaction Logic Cluster */}
                                        <div className="flex items-center gap-3 ml-auto sm:ml-0">
                                            {!isOverdue && (
                                                <div className="relative inline-flex items-center group/file">
                                                    <label className="inline-flex items-center gap-2 px-3 py-2 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-slate-200 text-xs sm:text-sm font-semibold rounded-xl border border-slate-900 hover:border-slate-800 transition-all cursor-pointer">
                                                        <FileUp className="w-3.5 h-3.5 text-slate-500 group-hover/file:text-blue-400" />
                                                        <span className="max-w-[110px] sm:max-w-[140px] truncate">
                                                            {assignmentUploadFile ? assignmentUploadFile.name : "Choose File"}
                                                        </span>
                                                    </label>
                                                    <input 
                                                        onChange={(event) => setAssignmentUploadFile(event.target.files[0])} 
                                                        type="file" 
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pin-events-none"
                                                    />
                                                </div>
                                            )}

                                            {isOverdue ? (
                                                <span className="inline-flex items-center px-3 py-2 bg-rose-500/5 text-rose-400 border border-rose-500/10 rounded-xl text-xs sm:text-sm font-mono font-bold tracking-tight">
                                                    Due window closed!
                                                </span>
                                            ) : (
                                                assignmentUploadFile && (
                                                    <button 
                                                        onClick={() => handleUploadAssignment(assignment.assignmentSubjectId, assignment._id)} 
                                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl cursor-pointer active:scale-95 shadow-md shadow-emerald-950/40 transition-all focus:outline-none"
                                                    >
                                                        <Upload className="w-3.5 h-3.5" />
                                                        <span>{status ? "Update File" : "Upload File"}</span>
                                                    </button>
                                                )
                                            )}
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center p-12 bg-[#090f1c] border border-slate-900 rounded-2xl shadow-xl">
                        <AlertCircle className="w-10 h-10 text-slate-600 mb-3" />
                        <h2 className="text-slate-400 font-semibold text-sm sm:text-base">No Tasks Dispatched</h2>
                        <p className="text-xs text-slate-600 max-w-xs mt-1">
                            The academic instructor hasn't provided records or uploaded any homework assignments for this module yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentSubjectAssignments;