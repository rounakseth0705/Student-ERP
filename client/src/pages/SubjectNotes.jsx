// import { useNavigate, useParams } from "react-router-dom";
// import leftArrowBlack from "../assets/leftArrowBlack.svg";
// import React, { useContext, useEffect, useState } from "react";
// import { UserContext } from "../context/AuthContext.jsx";
// import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
// import editIcon from "../assets/editIcon.svg";
// import fileOpenIcon from "../assets/fileOpenIcon.svg";
// import downloadIcon from "../assets/downloadIcon.svg";
// import removeIcon from "../assets/removeIcon.svg";
// import checkIcon from "../assets/checkIcon.svg";
// import TeacherCreateButton from "../components/TeacherCreateButton.jsx";

// const SubjectNotes = () => {
//     const { subjectId, subjectName, subjectCode } = useParams();
//     const { userIdentity } = useContext(UserContext);
//     const { notes, getSubjectNotes, deleteNotes, updateNotesName } = useContext(TeacherDashboardContext);
//     const navigate = useNavigate();
//     const [isEditing, setIsEditing] = useState(false);
//     const [activeIndex, setActiveIndex] = useState(null);
//     const [notesUpdatedName, setNotesUpdatedName] = useState("");
//     const [isUploading, setIsUploading] = useState(false);
//     const [notesName, setNotesName] = useState("");
//     const [notesFile, setNotesFile] = useState(null);
//     const handleGetNotes = async () => {
//         await getSubjectNotes(userIdentity.courseId._id,subjectId);
//     }
//     const handleDeleteNotes = async (notesId) => {
//         await deleteNotes(notesId);
//     }
//     const handleInputBoxOpening = (index) => {
//         setIsEditing(true);
//         setActiveIndex(index);
//     }
//     const handleInputBoxClosing = async (notesId) => {
//         setIsEditing(false);
//         setActiveIndex(null);
//         await updateNotesName(notesId,notesUpdatedName);
//     }
//     useEffect(() => {
//         handleGetNotes();
//     },[]);
//     return(
//         <>
//             <div className="flex justify-between items-center p-4 sm:p-5 lg:py-4 lg:px-6">
//                 <img onClick={() => navigate("/teacher-dashboard/notes")} src={leftArrowBlack} alt="leftArrow" className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
//                 <h1 className="font-semibold text-blue-950 sm:text-2xl lg:text-3xl">{subjectName} ({subjectCode})</h1>
//                 <button onClick={() => navigate(`/teacher-dashboard/about-${userIdentity.courseId.courseName.toLowerCase()}`)} className="bg-blue-400 text-white rounded p-1 cursor-pointer text-xs sm:text-base">Check Schedule</button>
//             </div>
//             <div className="my-10 mx-[3vw] sm:mx-8 md:mx-15 lg:mx-20 xl:mx-45">
//                 {
//                     notes.map((note,index) => (
//                         <React.Fragment key={index}>
//                             <div className="flex justify-between items-center my-5 py-3 bg-blue-200 rounded shadow-lg">
//                                 <span className="flex justify-center items-center gap-2 mx-[5vw] sm:gap-3 sm:mx-8 lg:mx-16">
//                                     { isEditing && activeIndex === index ?
//                                         <input onChange={(event) => setNotesUpdatedName(event.target.value)} value={notesUpdatedName} type="text" className="rounded shadow-lg outline-0 bg-gray-200 px-1 text-xs w-[20vw] sm:text-base sm:w-[22vw] md:w-[20vw] lg:w-[12vw]"/> :
//                                         <h1 className="text-xs sm:text-base">{note.notesName}</h1>
//                                     }
//                                     { isEditing && activeIndex === index ?
//                                         <img onClick={() => handleInputBoxClosing(note._id)} src={checkIcon} alt="checkIcon" className="w-3 h-3 cursor-pointer sm:w-4 sm:h-4"/> :
//                                         <img onClick={() => handleInputBoxOpening(index)} src={editIcon} alt="editIcon" className="w-3 h-3 cursor-pointer sm:w-4 sm:h-4"/>
//                                     }
//                                 </span>
//                                 <h1 className="mx-[5vw] text-xs sm:text-base sm:mx-8 lg:mx-16">{new Date(note.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
//                                 {/* <span className="px-20 cursor-pointer">
//                                     <img src={fileOpenIcon} alt="fileOpenIcon" className="w-5 h-5"/>
//                                 </span> */}
//                                 <span className="mx-[5vw] cursor-pointer sm:mx-8 lg:mx-16">
//                                     <a href={note.notesDownloadUrl} download>
//                                         <img src={downloadIcon} alt="downloadIcon" className="w-4 h-4 sm:w-5 sm:h-5"/>
//                                     </a>
//                                 </span>
//                                 <span className="mx-[5vw] cursor-pointer sm:mx-8 lg:mx-16">
//                                     <img onClick={() => handleDeleteNotes(note._id)} src={removeIcon} alt="removeIcon" className="w-4 h-4 hover:opacity-60 sm:w-5 sm:h-5"/>
//                                 </span>
//                             </div>
//                         </React.Fragment>
//                     ))
//                 }
//                 { isUploading &&
//                     <div className="flex justify-between items-center bg-blue-300 py-3 rounded shadow-lg">
//                         <input onChange={(event) => setNotesName(event.target.value)} value={notesName} type="text" placeholder="enter notes name" className="mx-5 rounded py-1 px-3 outline-0 bg-gray-200 text-xs w-[33vw] sm:text-base sm:w-[25vw] md:w-[23vw] lg:w-[20vw] xl:w-[15vw]"/>
//                         <input onChange={(event) => setNotesFile(event.target.files[0])} type="file" className="mx-5 rounded py-1 px-3 outline-0 bg-gray-200 text-xs w-[33vw] sm:w-[30vw] sm:text-base md:w-[23vw] lg:w-[20vw] xl:w-[15vw]"/>
//                     </div>
//                 }
//                 <TeacherCreateButton create="Notes" isUploading={isUploading} setIsUploading={setIsUploading} name={notesName} subjectId={subjectId} file={notesFile}/>
//             </div>
//         </>
//     )
// }

// export default SubjectNotes;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/AuthContext.jsx";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import TeacherCreateButton from "../components/TeacherCreateButton.jsx";
// Premium Lucide Icons Ecosystem
import { 
    ArrowLeft, 
    Edit2, 
    Check, 
    Download, 
    Trash2, 
    Calendar, 
    FileUp 
} from "lucide-react";

const SubjectNotes = () => {
    const { subjectId, subjectName, subjectCode } = useParams();
    const { userIdentity } = useContext(UserContext);
    const { notes, getSubjectNotes, deleteNotes, updateNotesName } = useContext(TeacherDashboardContext);
    const navigate = useNavigate();
    
    const [isEditing, setIsEditing] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [notesUpdatedName, setNotesUpdatedName] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [notesName, setNotesName] = useState("");
    const [notesFile, setNotesFile] = useState(null);

    const handleGetNotes = async () => {
        if (userIdentity?.courseId?._id) {
            await getSubjectNotes(userIdentity.courseId._id, subjectId);
        }
    };

    const handleDeleteNotes = async (notesId) => {
        if (window.confirm("Are you sure you want to delete these study notes?")) {
            await deleteNotes(notesId);
        }
    };

    const handleInputBoxOpening = (index, currentName) => {
        setIsEditing(true);
        setActiveIndex(index);
        setNotesUpdatedName(currentName);
    };

    const handleInputBoxClosing = async (notesId) => {
        setIsEditing(false);
        setActiveIndex(null);
        await updateNotesName(notesId, notesUpdatedName);
        setNotesUpdatedName("");
    };

    useEffect(() => {
        handleGetNotes();
    }, []);

    return (
        <div className="bg-[#030712] text-slate-100 min-h-screen font-sans antialiased selection:bg-blue-600 selection:text-white pb-16">
            
            {/* Header Toolbar Panel - FORCED SINGLE ROW USING flex-nowrap */}
            <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 border-b border-slate-800 pb-5">
                <div className="flex flex-row flex-nowrap items-center justify-between gap-3 sm:gap-4">
                    
                    {/* Left Wing Navigation and Information Cluster */}
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <button 
                            onClick={() => navigate("/teacher-dashboard/notes")}
                            className="p-2 sm:p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors group flex-shrink-0 flex items-center justify-center"
                            aria-label="Back to notes"
                        >
                            <ArrowLeft className="w-4 h-4 sm:w-5 h-5 text-slate-300 group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <div className="min-w-0">
                            <span className="hidden sm:block text-xs font-semibold uppercase tracking-wider text-blue-500">Repository Console</span>
                            <h1 className="text-sm sm:text-2xl font-bold text-white tracking-tight truncate">
                                {subjectName} <span className="text-slate-500 font-mono text-xs sm:text-lg font-medium">({subjectCode})</span>
                            </h1>
                        </div>
                    </div>
                    
                    {/* Right Wing Context Action Control */}
                    <button 
                        onClick={() => navigate(`/teacher-dashboard/about-${userIdentity?.courseId?.courseName?.toLowerCase()}`)} 
                        className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-blue-950/40 focus:outline-none whitespace-nowrap flex-shrink-0"
                    >
                        Check Schedule
                    </button>
                </div>
            </div>

            {/* Core Working Area List Container */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-4">
                {notes.map((note, index) => (
                    <React.Fragment key={note._id || index}>
                        {/* Note Item Grid Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#090f1c] border border-slate-800/80 hover:border-slate-700 rounded-xl p-4 transition-all duration-200">
                            
                            {/* Left Meta Group: Title/Inputs and Timestamp Indicators */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 flex-1 min-w-0">
                                
                                {/* Segment 1: Title Input Editing Window */}
                                <div className="flex items-center gap-2 min-w-0 sm:w-1/2">
                                    {isEditing && activeIndex === index ? (
                                        <div className="flex items-center gap-1.5 w-full">
                                            <input 
                                                onChange={(event) => setNotesUpdatedName(event.target.value)} 
                                                value={notesUpdatedName} 
                                                type="text" 
                                                className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded-md text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                                                autoFocus
                                            />
                                            <button 
                                                onClick={() => handleInputBoxClosing(note._id)} 
                                                className="p-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-emerald-400 hover:bg-emerald-500/20 flex-shrink-0"
                                            >
                                                <Check className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <h3 className="font-semibold text-white text-sm sm:text-base truncate">{note.notesName}</h3>
                                            <button 
                                                onClick={() => handleInputBoxOpening(index, note.notesName)} 
                                                className="p-1 text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0"
                                                title="Edit Notes Name"
                                            >
                                                <Edit2 className="w-3 h-3" />
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Segment 2: Creation Timestamp */}
                                <div className="flex items-center gap-1.5 text-xs text-slate-400 whitespace-nowrap">
                                    <Calendar className="w-3.5 h-3.5 text-slate-600" />
                                    <span>Uploaded: {new Date(note.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
                                </div>
                            </div>

                            {/* Right Action Controls Panel */}
                            <div className="flex items-center gap-2 border-t border-slate-800/60 pt-3 sm:pt-0 sm:border-t-0 justify-end flex-shrink-0">
                                <a 
                                    href={note.notesDownloadUrl} 
                                    download
                                    className="p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 text-slate-300 hover:text-white transition-colors"
                                    title="Download Document"
                                >
                                    <Download className="w-4 h-4" />
                                </a>
                                <button 
                                    onClick={() => handleDeleteNotes(note._id)} 
                                    className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500 border border-rose-500/20 hover:border-transparent text-rose-400 hover:text-white transition-all"
                                    title="Delete Document"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </React.Fragment>
                ))}

                {/* Inline Creation Shell Overlay */}
                {isUploading && (
                    <div className="bg-[#090f1c] border border-blue-600/30 p-4 rounded-xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4 items-center animate-in fade-in zoom-in-95 duration-150">
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block">Notes Heading Title</label>
                            <input 
                                onChange={(event) => setNotesName(event.target.value)} 
                                value={notesName} 
                                type="text" 
                                placeholder="e.g., Lecture 4: Architecture Archetypes" 
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block">Source Document Payload</label>
                            <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-lg overflow-hidden pr-2">
                                <input 
                                    onChange={(event) => setNotesFile(event.target.files[0])} 
                                    type="file" 
                                    className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:border-0 file:text-xs file:font-medium file:bg-slate-800 file:text-slate-300 hover:file:bg-slate-700 cursor-pointer focus:outline-none"
                                />
                                <FileUp className="w-4 h-4 text-slate-600 flex-shrink-0" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Document Factory Action Injector Button */}
                <div className="pt-2">
                    <TeacherCreateButton 
                        create="Notes" 
                        isUploading={isUploading} 
                        setIsUploading={setIsUploading} 
                        name={notesName} 
                        setName={setNotesName}
                        subjectId={subjectId} 
                        file={notesFile}
                    />
                </div>
            </div>
        </div>
    );
};

export default SubjectNotes;