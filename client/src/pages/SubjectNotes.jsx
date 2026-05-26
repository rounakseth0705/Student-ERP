import { useNavigate, useParams } from "react-router-dom";
import leftArrowBlack from "../assets/leftArrowBlack.svg";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import editIcon from "../assets/editIcon.svg";
import fileOpenIcon from "../assets/fileOpenIcon.svg";
import downloadIcon from "../assets/downloadIcon.svg";
import removeIcon from "../assets/removeIcon.svg";
import checkIcon from "../assets/checkIcon.svg";
import TeacherCreateButton from "../components/TeacherCreateButton.jsx";
import CurrentTime from "../components/CurrentTime.jsx";

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
        await getSubjectNotes(userIdentity.courseId._id,subjectId);
    }
    const handleDeleteNotes = async (notesId) => {
        await deleteNotes(notesId);
    }
    const handleInputBoxOpening = (index) => {
        setIsEditing(true);
        setActiveIndex(index);
    }
    const handleInputBoxClosing = async (notesId) => {
        setIsEditing(false);
        setActiveIndex(null);
        await updateNotesName(notesId,notesUpdatedName);
    }
    useEffect(() => {
        handleGetNotes();
    },[]);
    return(
        <>
            <div className="flex justify-between items-center p-4 sm:p-5 lg:py-4 lg:px-6">
                <img onClick={() => navigate("/teacher-dashboard/notes")} src={leftArrowBlack} alt="leftArrow" className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
                <h1 className="font-semibold text-blue-950 sm:text-2xl lg:text-3xl">{subjectName} ({subjectCode})</h1>
                <button className="bg-blue-400 text-white rounded p-1 cursor-pointer text-xs sm:text-base">Check Schedule</button>
            </div>
            <div className="my-10 mx-[3vw] sm:mx-8 md:mx-15 lg:mx-20 xl:mx-45">
                {
                    notes.map((note,index) => (
                        <React.Fragment key={index}>
                            <div className="flex justify-between items-center my-5 py-3 bg-blue-200 rounded shadow-lg">
                                <span className="flex justify-center items-center gap-2 mx-[5vw] sm:gap-3 sm:mx-8 lg:mx-16">
                                    { isEditing && activeIndex === index ?
                                        <input onChange={(event) => setNotesUpdatedName(event.target.value)} value={notesUpdatedName} type="text" className="rounded shadow-lg outline-0 bg-gray-200 px-1 text-xs w-[20vw] sm:text-base sm:w-[22vw] md:w-[20vw] lg:w-[12vw]"/> :
                                        <h1 className="text-xs sm:text-base">{note.notesName}</h1>
                                    }
                                    { isEditing && activeIndex === index ?
                                        <img onClick={() => handleInputBoxClosing(note._id)} src={checkIcon} alt="checkIcon" className="w-3 h-3 cursor-pointer sm:w-4 sm:h-4"/> :
                                        <img onClick={() => handleInputBoxOpening(index)} src={editIcon} alt="editIcon" className="w-3 h-3 cursor-pointer sm:w-4 sm:h-4"/>
                                    }
                                </span>
                                <h1 className="mx-[5vw] text-xs sm:text-base sm:mx-8 lg:mx-16">{new Date(note.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
                                {/* <span className="px-20 cursor-pointer">
                                    <img src={fileOpenIcon} alt="fileOpenIcon" className="w-5 h-5"/>
                                </span> */}
                                <span className="mx-[5vw] cursor-pointer sm:mx-8 lg:mx-16">
                                    <a href={note.notesDownloadUrl} download>
                                        <img src={downloadIcon} alt="downloadIcon" className="w-4 h-4 sm:w-5 sm:h-5"/>
                                    </a>
                                </span>
                                <span className="mx-[5vw] cursor-pointer sm:mx-8 lg:mx-16">
                                    <img onClick={() => handleDeleteNotes(note._id)} src={removeIcon} alt="removeIcon" className="w-4 h-4 hover:opacity-60 sm:w-5 sm:h-5"/>
                                </span>
                            </div>
                        </React.Fragment>
                    ))
                }
                { isUploading &&
                    <div className="flex justify-between items-center bg-blue-300 py-3 rounded shadow-lg">
                        <input onChange={(event) => setNotesName(event.target.value)} value={notesName} type="text" placeholder="enter notes name" className="mx-5 rounded py-1 px-3 outline-0 bg-gray-200 text-xs w-[33vw] sm:text-base sm:w-[25vw] md:w-[23vw] lg:w-[20vw] xl:w-[15vw]"/>
                        <input onChange={(event) => setNotesFile(event.target.files[0])} type="file" className="mx-5 rounded py-1 px-3 outline-0 bg-gray-200 text-xs w-[33vw] sm:w-[30vw] sm:text-base md:w-[23vw] lg:w-[20vw] xl:w-[15vw]"/>
                    </div>
                }
                <TeacherCreateButton create="Notes" isUploading={isUploading} setIsUploading={setIsUploading} name={notesName} subjectId={subjectId} file={notesFile}/>
            </div>
        </>
    )
}

export default SubjectNotes;