import { useNavigate, useParams } from "react-router-dom";
import leftLongArrow from "../assets/leftLongArrow.svg";
import { useContext } from "react";
import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
import { UserContext } from "../context/AuthContext";
import { useEffect } from "react";

const StudentSubjectAssignments = () => {
    const { subjectId, subjectName, subjectCode } = useParams();
    const { userIdentity } = useContext(UserContext);
    const { assignments, getAssignments } = useContext(StudentDashboardContext);
    const navigate = useNavigate();
    const handleGetAssignments = async () => {
        await getAssignments(subjectId,userIdentity.courseId._id,userIdentity.semester);
    }
    useEffect(() => {
        handleGetAssignments();
    },[]);
    return(
        <>
            <img onClick={() => navigate("/student-dashboard/assignments")} src={leftLongArrow} alt="leftArrow" className="absolute left-10 top-4 w-10 h-10 cursor-pointer"/>
            <h1 className="text-center mt-5 text-3xl font-semibold text-blue-950">{subjectName} ({subjectCode})</h1>
            <div className="mt-10 mx-40">
                { assignments.length > 0 ?
                    assignments.map((assignment,index) => (
                        <div key={index} className="flex justify-between items-center my-5 py-3 bg-blue-200 rounded shadow-lg">
                            <h1>{assignment.assignmentName}</h1>
                            <h1>{new Date(assignment.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
                            <span className="px-20 cursor-pointer">
                                <img src={fileOpenIcon} alt="fileOpenIcon" className="w-5 h-5"/>
                            </span>
                            <span className="px-20 cursor-pointer">
                                <a href={note.noteUrl} download>
                                    <img src={downloadIcon} alt="downloadIcon" className="w-5 h-5"/>
                                </a>
                            </span>
                            <span>
                                <button>Upload</button>
                            </span>
                        </div>
                    )) : <h1 className="text-center">The assignments haven't been provided by the teacher.</h1>
                }
            </div>
        </>
    )
}

export default StudentSubjectAssignments;