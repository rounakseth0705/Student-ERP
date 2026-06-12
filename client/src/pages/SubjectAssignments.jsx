// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { UserContext } from "../context/AuthContext.jsx";
// import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
// import leftArrowBlack from "../assets/leftArrowBlack.svg";
// import downloadIcon from "../assets/downloadIcon.svg";
// import fileOpenIcon from "../assets/fileOpenIcon.svg";
// import rightArrowBlack from "../assets/rightArrowBlack.svg";
// import editIcon from "../assets/editIcon.svg";
// import checkIcon from "../assets/checkIcon.svg";
// import removeIcon from "../assets/removeIcon.svg";
// import TeacherCreateButton from "../components/TeacherCreateButton.jsx";

// const SubjectAssignments = () => {
//     const { subjectId, subjectName, subjectCode } = useParams();
//     const { userIdentity } = useContext(UserContext);
//     const { assignments, getSubjectAssignments, updateAssignmentName, updateAssignmentSubmitDate, deleteAssignment, getAssignmentUploads, assignmentUploads } = useContext(TeacherDashboardContext);
//     const [isOpen, setIsOpen] = useState(false);
//     const [activeIndex, setActiveIndex] = useState(null);
//     const [isNameEditing, setIsNameEditing] = useState(false);
//     const [isSubmitDateEditing, setIsSubmitDateEditing] = useState("");
//     const [assignmentUpdatedName, setAssignmentUpdatedName] = useState("");
//     const [assignmentUpdatedSubmitDate, setAssignmentUpdatedSubmitDate] = useState("");
//     const [isUploading, setIsUploading] = useState(false);
//     const [assignmentName, setAssignmentName] = useState("");
//     const [assignmentSubmitDate, setAssignmentSubmitDate] = useState("");
//     const [assignmentFile, setAssignmentFile] = useState(null);
//     const navigate = useNavigate();
//     const handleGetSubjectAssignments = async () => {
//         await getSubjectAssignments(userIdentity.courseId._id,subjectId);
//     }
//     const handleArrowOpen = async (index,assignmentId) => {
//         setActiveIndex(index);
//         setIsOpen(prev => !prev);
//         if (!isOpen) {
//             await getAssignmentUploads(assignmentId);
//         }
//     }
//     const handleAssignmentNameInputBoxOpening = (index) => {
//         setActiveIndex(index);
//         setIsNameEditing(true);
//     }
//     const handleAssignmentSubmitDateInputBoxOpening = (index) => {
//         setActiveIndex(index);
//         setIsSubmitDateEditing(true);
//     }
//     const handleAssignmentNameInputBoxClosing = async (assignmentId) => {
//         setActiveIndex(null);
//         setIsNameEditing(false);
//         setAssignmentUpdatedName("");
//         await updateAssignmentName(assignmentId,assignmentUpdatedName);
//     }
//     const handleAssignmentSubmitDateInputBoxClosing = async (assignmentId) => {
//         setActiveIndex(null);
//         setIsSubmitDateEditing(false);
//         setAssignmentUpdatedSubmitDate("");
//         await updateAssignmentSubmitDate(assignmentId,assignmentUpdatedSubmitDate);
//     }
//     const handleDeleteAssignment = async (assignmentId) => {
//         await deleteAssignment(assignmentId);
//     }
//     useEffect(() => {
//         handleGetSubjectAssignments();
//     },[])
//     return(
//         <>
//             <div className="flex justify-between items-center p-4 sm:p-5 lg:py-4 lg:px-6">
//                 <img onClick={() => navigate("/teacher-dashboard/assignments")} src={leftArrowBlack} alt="leftArrow" className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
//                 <h1 className="font-semibold text-blue-950 sm:text-2xl lg:text-3xl">{subjectName} ({subjectCode})</h1>
//                 <button onClick={() => navigate(`/teacher-dashboard/about-${userIdentity.courseId.courseName.toLowerCase()}`)} className="bg-blue-400 text-white rounded p-1 cursor-pointer text-xs sm:text-base">Check Schedule</button>
//             </div>
//             <div className="my-10 mx-3 sm:mx-7 md:mx-10 lg:mx-15 xl:mx-30">
//                 {
//                     assignments.map((assignment,index) => (
//                         <React.Fragment key={index}>
//                             <div className="flex flex-wrap justify-center items-center gap-6 my-5 py-3 bg-blue-200 rounded shadow-lg sm:justify-between lg:gap-0">
//                                 <span className="cursor-pointer mx-2 sm:mx-3 md:px-4 lg:mx-7">
//                                     <img onClick={() => handleArrowOpen(index,assignment._id)} src={rightArrowBlack} alt="rightArrowBlack" className={`w-4 h-4 duration-300 ${activeIndex === index && isOpen ? "rotate-90" : "rotate-0"} md:w-5 md:h-5`}/>
//                                 </span>
//                                 <span className="flex justify-center items-center gap-1 mx-2 sm:mx-3 md:mx-4 lg:mx-7 lg:gap-3">
//                                     { isNameEditing && activeIndex === index ?
//                                         <input onChange={(event) => setAssignmentUpdatedName(event.target.value)} value={assignmentUpdatedName} type="text" className="w-20 rounded bg-gray-200 text-xs outline-0 sm:text-base lg:w-25 xl:w-27"/>
//                                         : <h1 className="text-xs sm:text-base">{assignment.assignmentName}</h1>
//                                     }
//                                     { isNameEditing && activeIndex === index ?
//                                         <img onClick={() => handleAssignmentNameInputBoxClosing(assignment._id)} src={checkIcon} alt="checkIcon" className="w-4 h-4 cursor-pointer"/> :
//                                         <img onClick={() => handleAssignmentNameInputBoxOpening(index)} src={editIcon} alt="editIcon" className="w-3 h-3 cursor-pointer md:w-4 md:h-4"/>
//                                     }
//                                 </span>
//                                 <h1 className="text-xs mx-2 sm:mx-3 sm:text-base md:mx-4 lg:mx-7">{new Date(assignment.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
//                                 <span className="flex justify-center items-center gap-1 mx-2 sm:mx-3 md:mx-4 lg:mx-7 lg:gap-3">
//                                     { isSubmitDateEditing && activeIndex === index ?
//                                         <input onChange={(event) => setAssignmentUpdatedSubmitDate(event.target.value)} value={assignmentUpdatedSubmitDate} type="date" className="w-35 text-xs px-2 rounded bg-gray-200 outline-0 sm:text-base"/> :
//                                         <h1 className="text-xs sm:text-base">{new Date(assignment.assignmentSubmitDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
//                                     }
//                                     { isSubmitDateEditing && activeIndex === index ?
//                                         <img onClick={() => handleAssignmentSubmitDateInputBoxClosing(assignment._id)} src={checkIcon} alt="checkIcon" className="w-4 h-4 cursor-pointer"/> :
//                                         <img onClick={() => handleAssignmentSubmitDateInputBoxOpening(index)} src={editIcon} alt="editIcon" className="w-3 h-3 cursor-pointer md:w-4 md:h-4"/>
//                                     }
//                                 </span>
//                                 {/* <span className="mx-2 sm:mx-3 md:mx-4 lg:mx-7 cursor-pointer">
//                                     <img src={fileOpenIcon} alt="fileOpenIcon" className="w-4 h-4 md:w-5 md:h-5"/>
//                                 </span> */}
//                                 <span className="mx-2 sm:mx-3 md:mx-4 lg:mx-7 cursor-pointer">
//                                     <a href={assignment.assignmentDownloadUrl} download>
//                                         <img src={downloadIcon} alt="downloadIcon" className="w-4 h-4 md:w-5 md:h-5"/>
//                                     </a>
//                                 </span>
//                                 <span className="mx-2 sm:mx-3 md:mx-4 lg:mx-7 cursor-pointer">
//                                     <img onClick={() => handleDeleteAssignment(assignment._id)} src={removeIcon} alt="removeIcon" className="w-4 h-4 hover:opacity-60 md:w-5 md:h-5"/>
//                                 </span>
//                             </div>
//                             { (isOpen && activeIndex === index) &&
//                                 <div className="bg-blue-300 mx-6 py-3 rounded sm:mx-10 md:mx-15">
//                                     { assignmentUploads.length > 0 ?
//                                         assignmentUploads.map((assignmentUpload,index) => (
//                                             <div key={index} className="flex justify-around items-center py-2">
//                                                 <h1 className="text-xs sm:text-base">{index+1}.</h1>
//                                                 <h1 className="text-xs sm:text-base">{assignmentUpload.studentId.userId.name}</h1>
//                                                 <h1 className="text-xs sm:text-base">{assignmentUpload.studentId.rollNo}</h1>
//                                                 {/* <span className="mx-2 sm:mx-3 md:mx-4 lg:mx-7 cursor-pointer">
//                                                         <img src={fileOpenIcon} alt="fileOpenIcon" className="w-5 h-5"/>
//                                                 </span> */}
//                                                 <span className="mx-2 sm:mx-3 md:mx-4 lg:mx-7 cursor-pointer">
//                                                     <a href={assignmentUpload.assignmentUploadDownloadUrl} download>
//                                                         <img src={downloadIcon} alt="downloadIcon" className="w-4 h-4 sm:w-5 sm:h-5"/>
//                                                     </a>
//                                                 </span>
//                                             </div>
//                                         )) : <div className="text-center text-xs sm:text-base">No Assignment Uploads</div>
//                                     }
//                                 </div>
//                             }
//                         </React.Fragment>
//                     ))
//                 }
//                 { isUploading &&
//                     <div className="flex justify-between items-center bg-blue-300 py-3 rounded shadow-lg">
//                         <input onChange={(event) => setAssignmentName(event.target.value)} value={assignmentName} type="text" placeholder="enter name" className="ml-[2vw] rounded py-1 px-[1vw] outline-0 bg-gray-200 w-[22vw] text-xs sm:text-base sm:w-[22vw] sm:ml-[3vw] sm:px-3 lg:w-[15vw]"/>
//                         <input onChange={(event) => setAssignmentSubmitDate(event.target.value)} value={assignmentSubmitDate} type="date" className="rounded py-1 px-[1vw] outline-0 bg-gray-200 text-xs w-[25vw] sm:px-3 sm:text-base sm:w-[20vw] md:w-[17vw] lg:w-[13.5vw] xl:w-[11vw]"/>
//                         <input onChange={(event) => setAssignmentFile(event.target.files[0])} type="file" className="mr-[2vw] rounded py-1 px-[1vw] outline-0 bg-gray-200 text-xs w-[23vw] sm:px-3 sm:mr-[3vw] sm:text-base sm:w-[30vw] md:w-[25vw] lg:w-[16vw] xl:w-[15vw]"/>
//                     </div>
//                 }
//                 <TeacherCreateButton create="Assignment" isUploading={isUploading} setIsUploading={setIsUploading} name={assignmentName} setName={setAssignmentName} subjectId={subjectId} submitDate={assignmentSubmitDate} setSubmitDate={setAssignmentSubmitDate} file={assignmentFile}/>
//             </div>
//         </>
//     )
// }

// export default SubjectAssignments;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/AuthContext.jsx";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import TeacherCreateButton from "../components/TeacherCreateButton.jsx";
// Premium Lucide Icons Ecosystem
import { 
    ArrowLeft, 
    ChevronRight, 
    Edit2, 
    Check, 
    Download, 
    Trash2, 
    Calendar, 
    CalendarDays, 
    FilePlus, 
    Inbox 
} from "lucide-react";

const SubjectAssignments = () => {
    const { subjectId, subjectName, subjectCode } = useParams();
    const { userIdentity } = useContext(UserContext);
    const { 
        assignments, 
        getSubjectAssignments, 
        updateAssignmentName, 
        updateAssignmentSubmitDate, 
        deleteAssignment, 
        getAssignmentUploads, 
        assignmentUploads 
    } = useContext(TeacherDashboardContext);

    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isNameEditing, setIsNameEditing] = useState(false);
    const [isSubmitDateEditing, setIsSubmitDateEditing] = useState(false);
    const [assignmentUpdatedName, setAssignmentUpdatedName] = useState("");
    const [assignmentUpdatedSubmitDate, setAssignmentUpdatedSubmitDate] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [assignmentName, setAssignmentName] = useState("");
    const [assignmentSubmitDate, setAssignmentSubmitDate] = useState("");
    const [assignmentFile, setAssignmentFile] = useState(null);
    const navigate = useNavigate();

    const handleGetSubjectAssignments = async () => {
        if (userIdentity?.courseId?._id) {
            await getSubjectAssignments(userIdentity.courseId._id, subjectId);
        }
    };

    const handleArrowOpen = async (index, assignmentId) => {
        if (activeIndex === index && isOpen) {
            setIsOpen(false);
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
            setIsOpen(true);
            await getAssignmentUploads(assignmentId);
        }
    };

    const handleAssignmentNameInputBoxOpening = (index, currentName) => {
        setActiveIndex(index);
        setAssignmentUpdatedName(currentName);
        setIsNameEditing(true);
    };

    const handleAssignmentSubmitDateInputBoxOpening = (index, currentDate) => {
        setActiveIndex(index);
        const parsedDate = currentDate ? new Date(currentDate).toISOString().split('T')[0] : "";
        setAssignmentUpdatedSubmitDate(parsedDate);
        setIsSubmitDateEditing(true);
    };

    const handleAssignmentNameInputBoxClosing = async (assignmentId) => {
        setIsNameEditing(false);
        await updateAssignmentName(assignmentId, assignmentUpdatedName);
        setAssignmentUpdatedName("");
        setActiveIndex(null);
    };

    const handleAssignmentSubmitDateInputBoxClosing = async (assignmentId) => {
        setIsSubmitDateEditing(false);
        await updateAssignmentSubmitDate(assignmentId, assignmentUpdatedSubmitDate);
        setAssignmentUpdatedSubmitDate("");
        setActiveIndex(null);
    };

    const handleDeleteAssignment = async (assignmentId) => {
        if (window.confirm("Are you sure you want to delete this assignment?")) {
            await deleteAssignment(assignmentId);
        }
    };

    useEffect(() => {
        handleGetSubjectAssignments();
    }, []);

    return (
        <div className="bg-[#030712] text-slate-100 min-h-screen font-sans antialiased selection:bg-blue-600 selection:text-white pb-16">
            
            {/* Header Toolbar Panel - FORCED SINGLE ROW USING flex-nowrap */}
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 border-b border-slate-800 pb-5">
                <div className="flex flex-row flex-nowrap items-center justify-between gap-3 sm:gap-4">
                    
                    {/* Left side alignment layer */}
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <button 
                            onClick={() => navigate("/teacher-dashboard/assignments")}
                            className="p-2 sm:p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors group flex-shrink-0 flex items-center justify-center"
                            aria-label="Back to assignments"
                        >
                            <ArrowLeft className="w-4 h-4 sm:w-5 h-5 text-slate-300 group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <div className="min-w-0">
                            <span className="hidden sm:block text-xs font-semibold uppercase tracking-wider text-blue-500">Subject Console</span>
                            <h1 className="text-sm sm:text-2xl font-bold text-white tracking-tight truncate">
                                {subjectName} <span className="text-slate-500 font-mono text-xs sm:text-lg font-medium">({subjectCode})</span>
                            </h1>
                        </div>
                    </div>
                    
                    {/* Schedule Button locked in the exact horizontal row configuration */}
                    <button 
                        onClick={() => navigate(`/teacher-dashboard/about-${userIdentity?.courseId?.courseName?.toLowerCase()}`)} 
                        className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-blue-950/40 focus:outline-none whitespace-nowrap flex-shrink-0"
                    >
                        Check Schedule
                    </button>
                </div>
            </div>

            {/* Core Working Area Container - RESTORED TO ORIGINAL DESIGN */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-4">
                {assignments.map((assignment, index) => {
                    const isCurrentOpen = isOpen && activeIndex === index;
                    
                    return (
                        <React.Fragment key={assignment._id || index}>
                            {/* Accordion Row Wrapper */}
                            <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#090f1c] border rounded-xl p-4 transition-all duration-200 ${
                                isCurrentOpen ? "border-blue-600/50 bg-[#0d1527]" : "border-slate-800/80 hover:border-slate-700"
                            }`}>
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <button 
                                        onClick={() => handleArrowOpen(index, assignment._id)}
                                        className="p-1.5 rounded-lg bg-slate-950/40 border border-slate-800 text-slate-400 hover:text-blue-400"
                                    >
                                        <ChevronRight className={`w-4 h-4 transition-transform duration-300 transform ${isCurrentOpen ? "rotate-90 text-blue-400" : ""}`} />
                                    </button>

                                    <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                                        <div className="flex items-center gap-2 min-w-0">
                                            {isNameEditing && activeIndex === index ? (
                                                <div className="flex items-center gap-1.5 w-full">
                                                    <input 
                                                        onChange={(event) => setAssignmentUpdatedName(event.target.value)} 
                                                        value={assignmentUpdatedName} 
                                                        type="text" 
                                                        className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded-md text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                    <button onClick={() => handleAssignmentNameInputBoxClosing(assignment._id)} className="p-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-emerald-400 hover:bg-emerald-500/20">
                                                        <Check className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <h3 className="font-semibold text-white text-sm sm:text-base truncate">{assignment.assignmentName}</h3>
                                                    <button onClick={() => handleAssignmentNameInputBoxOpening(index, assignment.assignmentName)} className="p-1 text-slate-500 hover:text-slate-300 transition-colors">
                                                        <Edit2 className="w-3 h-3" />
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                            <Calendar className="w-3.5 h-3.5 text-slate-600" />
                                            <span>Issued: {new Date(assignment.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                                            {isSubmitDateEditing && activeIndex === index ? (
                                                <div className="flex items-center gap-1.5 w-full">
                                                    <input 
                                                        onChange={(event) => setAssignmentUpdatedSubmitDate(event.target.value)} 
                                                        value={assignmentUpdatedSubmitDate} 
                                                        type="date" 
                                                        className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded-md text-xs text-white focus:outline-none focus:border-blue-500"
                                                    />
                                                    <button onClick={() => handleAssignmentSubmitDateInputBoxClosing(assignment._id)} className="p-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-emerald-400 hover:bg-emerald-500/20">
                                                        <Check className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                                                        <CalendarDays className="w-3.5 h-3.5 text-amber-500/80" />
                                                        <span>Due: {new Date(assignment.assignmentSubmitDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
                                                    </div>
                                                    <button onClick={() => handleAssignmentSubmitDateInputBoxOpening(index, assignment.assignmentSubmitDate)} className="p-1 text-slate-500 hover:text-slate-300 transition-colors">
                                                        <Edit2 className="w-3 h-3" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 border-t border-slate-800/60 pt-3 md:pt-0 md:border-t-0 justify-end">
                                    <a 
                                        href={assignment.assignmentDownloadUrl} 
                                        download
                                        className="p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 text-slate-300 hover:text-white transition-colors"
                                        title="Download Reference Attachment"
                                    >
                                        <Download className="w-4 h-4" />
                                    </a>
                                    <button 
                                        onClick={() => handleDeleteAssignment(assignment._id)} 
                                        className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 hover:border-transparent text-rose-400 hover:text-white transition-all"
                                        title="Delete Assignment Blueprint"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Dropdown Embedded Active Submission Roster List */}
                            {isCurrentOpen && (
                                <div className="mx-2 sm:mx-6 -mt-2 bg-[#050a14] border-x border-b border-slate-800 rounded-b-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="p-3 bg-slate-900/40 border-b border-slate-800/60 px-4 flex justify-between items-center">
                                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Student Upload Metrics</span>
                                        <span className="text-xs font-mono text-slate-500">Collected: {assignmentUploads.length}</span>
                                    </div>
                                    <div className="overflow-x-auto max-h-72">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-slate-800 bg-slate-900/10 text-xs font-medium text-slate-500 uppercase tracking-tight">
                                                    <th className="px-4 py-2 w-12 text-center">#</th>
                                                    <th className="px-4 py-2">Student Identity</th>
                                                    <th className="px-4 py-2">Roll No.</th>
                                                    <th className="px-4 py-2 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-800/40 text-xs sm:text-sm text-slate-300">
                                                {assignmentUploads.length > 0 ? (
                                                    assignmentUploads.map((upload, innerIndex) => (
                                                        <tr key={upload._id || innerIndex} className="hover:bg-slate-900/20 transition-colors">
                                                            <td className="px-4 py-2 text-center font-mono text-slate-500">{innerIndex + 1}</td>
                                                            <td className="px-4 py-2 font-medium text-slate-200">{upload.studentId?.userId?.name}</td>
                                                            <td className="px-4 py-2 font-mono text-slate-400">{upload.studentId?.rollNo}</td>
                                                            <td className="px-4 py-2 text-right">
                                                                <a 
                                                                    href={upload.assignmentUploadDownloadUrl} 
                                                                    download
                                                                    className="inline-flex items-center justify-center p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-blue-400 border border-slate-800 transition-colors"
                                                                >
                                                                    <Download className="w-3.5 h-3.5" />
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="4" className="px-4 py-8 text-center text-slate-500 text-xs">
                                                            <div className="flex flex-col items-center justify-center gap-1.5">
                                                                <Inbox className="w-5 h-5 text-slate-600" />
                                                                <span>No files compiled or turned in by students yet.</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}

                {/* Insertion Builder Shell Input Overlay Card */}
                {isUploading && (
                    <div className="bg-[#090f1c] border border-blue-600/30 p-4 rounded-xl shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-3 items-center animate-in fade-in zoom-in-95 duration-150">
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Assignment Title</label>
                            <input 
                                onChange={(event) => setAssignmentName(event.target.value)} 
                                value={assignmentName} 
                                type="text" 
                                placeholder="e.g., Final System Draft" 
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Deadline Timeline</label>
                            <input 
                                onChange={(event) => setAssignmentSubmitDate(event.target.value)} 
                                value={assignmentSubmitDate} 
                                type="date" 
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 text-slate-400"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Source Payload File</label>
                            <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-lg overflow-hidden pr-2">
                                <input 
                                    onChange={(event) => setAssignmentFile(event.target.files[0])} 
                                    type="file" 
                                    className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:border-0 file:text-xs file:font-medium file:bg-slate-800 file:text-slate-300 hover:file:bg-slate-700 cursor-pointer focus:outline-none"
                                />
                                <FilePlus className="w-4 h-4 text-slate-600 flex-shrink-0" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Submission Management Builder Button */}
                <div className="pt-2">
                    <TeacherCreateButton 
                        create="Assignment" 
                        isUploading={isUploading} 
                        setIsUploading={setIsUploading} 
                        name={assignmentName} 
                        setName={setAssignmentName} 
                        subjectId={subjectId} 
                        submitDate={assignmentSubmitDate} 
                        setSubmitDate={setAssignmentSubmitDate} 
                        file={assignmentFile}
                    />
                </div>
            </div>
        </div>
    );
};

export default SubjectAssignments;