import { useNavigate, useParams } from "react-router-dom";
import leftLongArrow from "../assets/leftLongArrow.svg";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";

const SubjectNotes = () => {
    const { subjectId, subjectName, subjectCode } = useParams();
    const { userIdentity } = useContext(UserContext);
    const { notes, getSubjectNotes } = useContext(TeacherDashboardContext);
    const navigate = useNavigate();
    const handleGetNotes = async () => {
        await getSubjectNotes(userIdentity.courseId._id,subjectId);
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
                    notes.map((notes,index) => (
                        <React.Fragment key={index}>
                            <div>
                                <h1>{notes.notesName}</h1>
                                <h1>{new Date(notes.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
                            </div>
                        </React.Fragment>
                    ))
                }
            </div>
        </div>
    )
}

export default SubjectNotes;