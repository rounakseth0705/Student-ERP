import { useNavigate, useParams } from "react-router-dom";
import leftLongArrow from "../assets/leftLongArrow.svg";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import editIcon from "../assets/editIcon.svg";
import fileOpenIcon from "../assets/fileOpenIcon.svg";
import downloadIcon from "../assets/downloadIcon.svg";
import removeIcon from "../assets/removeIcon.svg";
import checkIcon from "../assets/checkIcon.svg";
import TeacherCreateButton from "../components/TeacherCreateButton.jsx";

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
    const handleInputBoxClosing = async () => {
        setIsEditing(false);
        setActiveIndex(null);
        await updateNotesName();
    }
    useEffect(() => {
        handleGetNotes();
    },[]);
    return(
        <>
            <img onClick={() => navigate("/teacher-dashboard/notes")} src={leftLongArrow} alt="leftArrow" className="absolute left-10 top-4 w-10 h-10 cursor-pointer"/>
            <h1 className="text-center mt-5 text-3xl font-semibold text-blue-950">{subjectName} ({subjectCode})</h1>
            <div className="mt-10 mx-40">
                {
                    notes.map((note,index) => (
                        <React.Fragment key={index}>
                            <div className="flex justify-between items-center my-5 py-3 bg-blue-200 rounded shadow-lg">
                                <span className="flex justify-center items-center gap-3 px-20">
                                    { isEditing && activeIndex === index ?
                                        <input onChange={(event) => setNotesUpdatedName(event.target.value)} value={notesUpdatedName} type="text" className="w-27 rounded shadow-lg outline-0 bg-gray-200"/> :
                                        <h1>{note.notesName}</h1>
                                    }
                                    { isEditing && activeIndex === index ?
                                        <img onClick={handleInputBoxClosing} src={checkIcon} alt="checkIcon" className="w-4 h-4 cursor-pointer"/> :
                                        <img onClick={() => handleInputBoxOpening(index)} src={editIcon} alt="editIcon" className="w-4 h-4 cursor-pointer"/>
                                    }
                                </span>
                                <h1 className="px-20">{new Date(note.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
                                <span className="px-20 cursor-pointer">
                                    <img src={fileOpenIcon} alt="fileOpenIcon" className="w-5 h-5"/>
                                </span>
                                <span className="px-20 cursor-pointer">
                                    <a href={note.noteUrl} download>
                                        <img src={downloadIcon} alt="downloadIcon" className="w-5 h-5"/>
                                    </a>
                                </span>
                                <span className="px-20 cursor-pointer">
                                    <img onClick={() => handleDeleteNotes(note._id)} src={removeIcon} alt="removeIcon" className="w-5 h-5 hover:opacity-60"/>
                                </span>
                            </div>
                        </React.Fragment>
                    ))
                }
                { isUploading &&
                    <div className="flex justify-evenly items-center bg-blue-300 py-3 rounded shadow-lg">
                        <input onChange={(event) => setNotesName(event.target.value)} value={notesName} type="text" placeholder="enter notes name" className="mx-5 rounded py-1 px-3 outline-0 bg-gray-200"/>
                        <input onChange={(event) => setNotesFile(event.target.files[0])} type="file" className="mx-5 rounded py-1 px-3 outline-0 bg-gray-200"/>
                    </div>
                }
                <TeacherCreateButton create="Notes" isUploading={isUploading} setIsUploading={setIsUploading} name={notesName} subjectId={subjectId} file={notesFile}/>
            </div>
        </>
    )
}

export default SubjectNotes;