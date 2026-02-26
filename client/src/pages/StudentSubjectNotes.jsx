import { useNavigate, useParams } from "react-router-dom";
import leftLongArrow from "../assets/leftLongArrow.svg";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
import { useEffect } from "react";
import fileOpenIcon from "../assets/fileOpenIcon.svg";
import downloadIcon from "../assets/downloadIcon.svg";

const StudentSubjectNotes = () => {
    const { subjectId, subjectName, subjectCode } = useParams();
    const { userIdentity } = useContext(UserContext);
    const { notes, getNotes } = useContext(StudentDashboardContext);
    const navigate = useNavigate();
    const handleGetNotes = async () => {
        await getNotes(subjectId,userIdentity.courseId._id,userIdentity.semester);
    }
    useEffect(() => {
        handleGetNotes();
    },[]);
    return(
        <>
            <img onClick={() => navigate("/student-dashboard/notes")} src={leftLongArrow} alt="leftArrow" className="absolute left-10 top-4 w-10 h-10 cursor-pointer"/>
            <h1 className="text-center mt-5 text-3xl font-semibold text-blue-950">{subjectName} ({subjectCode})</h1>
            <div className="mt-10 mx-40">
                { notes.length > 0 ?
                    notes.map((note,index) => (
                        <div key={index} className="flex justify-between items-center my-5 py-3 bg-blue-200 rounded shadow-lg">
                            <h1 className="px-20">{note.notesName}</h1>
                            <h1 className="px-20">{new Date(note.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
                            <span className="px-20 cursor-pointer">
                                <img src={fileOpenIcon} alt="fileOpenIcon" className="w-5 h-5"/>
                            </span>
                            <span className="px-20 cursor-pointer">
                                <a href={note.noteUrl} download>
                                    <img src={downloadIcon} alt="downloadIcon" className="w-5 h-5"/>
                                </a>
                            </span>
                        </div>
                    )) : <h1 className="text-center font-semibold text-2xl">The notes haven't been provided by the teacher.</h1>
                }
            </div>
        </>
    )
}

export default StudentSubjectNotes;