import { useNavigate, useParams } from "react-router-dom";
import leftLongArrow from "../assets/leftLongArrow.svg";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import editIcon from "../assets/editIcon.svg";
import fileOpenIcon from "../assets/fileOpenIcon.svg";
import downloadIcon from "../assets/downloadIcon.svg";
import removeIcon from "../assets/removeIcon.svg";

const SubjectNotes = () => {
    const { subjectId, subjectName, subjectCode } = useParams();
    const { userIdentity } = useContext(UserContext);
    const { notes, getSubjectNotes, deleteNotes } = useContext(TeacherDashboardContext);
    const navigate = useNavigate();
    const handleGetNotes = async () => {
        await getSubjectNotes(userIdentity.courseId._id,subjectId);
    }
    const handleDeleteNotes = async (notesId) => {
        await deleteNotes(notesId);
    }
    useEffect(() => {
        handleGetNotes();
    },[]);
    return(
        <div>
            <img onClick={() => navigate("/teacher-dashboard/notes")} src={leftLongArrow} alt="leftArrow" className="absolute left-10 top-4 w-10 h-10 cursor-pointer"/>
            <h1 className="text-center mt-5 text-3xl font-semibold text-blue-950">{subjectName} ({subjectCode})</h1>
            <div className="mt-10 mx-30">
                {
                    notes.map((note,index) => (
                        <React.Fragment key={index}>
                            <div className="flex justify-between items-center my-5 py-3 bg-blue-200 rounded shadow-lg">
                                <span className="flex justify-center items-center gap-3 px-7">
                                    <h1>{note.notesName}</h1>
                                    <img src={editIcon} alt="editIcon" className="w-4 h-4 cursor-pointer"/>
                                </span>
                                <h1>{new Date(note.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
                                <span className="px-7 cursor-pointer">
                                    <img src={fileOpenIcon} alt="fileOpenIcon" className="w-5 h-5"/>
                                </span>
                                <span className="px-7 cursor-pointer">
                                    <a href={note.noteUrl} download>
                                        <img src={downloadIcon} alt="downloadIcon" className="w-5 h-5"/>
                                    </a>
                                </span>
                                <span className="px-7 cursor-pointer">
                                    <img onClick={() => handleDeleteNotes(note._id)} src={removeIcon} alt="removeIcon" className="w-5 h-5 hover:opacity-60"/>
                                </span>
                            </div>
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    )
}

export default SubjectNotes;