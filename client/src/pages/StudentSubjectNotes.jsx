import { useNavigate, useParams } from "react-router-dom";
import leftArrowBlack from "../assets/leftArrowBlack.svg";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
import { useEffect } from "react";
import fileOpenIcon from "../assets/fileOpenIcon.svg";
import downloadIcon from "../assets/downloadIcon.svg";
import CurrentTime from "../components/CurrentTime.jsx";

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
            <div className="flex justify-between items-center px-[2vw] py-[2vh] sm:px-5 sm:py-6 lg:py-4">
                <img onClick={() => navigate("/student-dashboard/notes")} src={leftArrowBlack} alt="leftArrow" className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
                <h1 className="font-semibold text-blue-950 sm:text-2xl lg:text-3xl">{subjectName} ({subjectCode})</h1>
                <CurrentTime/>
            </div>
            <div className="mt-[1vh] mb-[3vh] mx-5 sm:mx-15 md:mx-20 lg:mx-30 xl:mx-35">
                { notes.length > 0 ?
                    notes.map((note,index) => (
                        <div key={index} className="flex justify-between items-center my-5 py-3 bg-blue-200 rounded shadow-lg">
                            <h1 className="text-sm mx-3 sm:text-base sm:mx-5 md:mx-10 lg:mx-15 xl:mx-20">{note.notesName}</h1>
                            <h1 className="text-sm mx-3 sm:text-base sm:mx-5 md:mx-10 lg:mx-15 xl:mx-20">{new Date(note.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
                            <span className="mx-3 sm:mx-5 md:mx-10 lg:mx-15 xl:mx-20 cursor-pointer">
                                <img src={fileOpenIcon} alt="fileOpenIcon" className="w-4 h-4 sm:w-5 sm:h-5"/>
                            </span>
                            <span className="mx-3 sm:mx-5 md:mx-10 lg:mx-15 xl:mx-20 cursor-pointer">
                                <a href={note.notesDownloadUrl} download>
                                    <img src={downloadIcon} alt="downloadIcon" className="w-4 h-4 sm:w-5 sm:h-5"/>
                                </a>
                            </span>
                        </div>
                    )) : <h1 className="text-center">The notes haven't been provided by the teacher.</h1>
                }
            </div>
        </>
    )
}

export default StudentSubjectNotes;