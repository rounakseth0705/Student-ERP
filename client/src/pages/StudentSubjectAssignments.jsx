import { useNavigate, useParams } from "react-router-dom";
import leftLongArrow from "../assets/leftLongArrow.svg";
import { useContext } from "react";
import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
import { UserContext } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import fileOpenIcon from "../assets/fileOpenIcon.svg";
import downloadIcon from "../assets/downloadIcon.svg";
import { useState } from "react";
import { useRef } from "react";

const StudentSubjectAssignments = () => {
    const { subjectId, subjectName, subjectCode } = useParams();
    const { userIdentity } = useContext(UserContext);
    const { assignments, getAssignments, uploadAssignment, getAssignmentUploads, assignmentUploads } = useContext(StudentDashboardContext);
    const navigate = useNavigate();
    const [assignmentUploadFile, setAssignmentUploadFile] = useState();
    const date = useRef(new Date());
    const handleGetAssignments = async () => {
        await getAssignments(subjectId,userIdentity.courseId._id,userIdentity.semester);
    }
    const handleGetAssignmentUploads = async () => {
        await getAssignmentUploads(subjectId);
    }
    const handleUploadAssignment = async (subjectId,assignmentId) => {
        await uploadAssignment(subjectId,assignmentId,assignmentUploadFile);
    }
    useEffect(() => {
        handleGetAssignments();
        handleGetAssignmentUploads();
    },[]);
    return(
        <>
            <img onClick={() => navigate("/student-dashboard/assignments")} src={leftLongArrow} alt="leftArrow" className="absolute left-10 top-4 w-10 h-10 cursor-pointer"/>
            <h1 className="text-center mt-5 text-3xl font-semibold text-blue-950">{subjectName} ({subjectCode})</h1>
            <div className="mt-10 mx-10 sm:mx-15 md:mx-6 lg:mx-10 xl:mx-20 2xl:mx-40">
                { assignments.length > 0 ?
                    assignments.map((assignment,index) => {
                        const status = assignmentUploads.length > 0 && assignmentUploads.some(assignmentUpload => assignmentUpload.assignmentId === assignment._id);
                        return(
                            <div key={index} className="flex justify-between items-center my-5 py-3 bg-blue-200 rounded shadow-lg">
                                <h1 className="sm:px-3 md:px-3 lg:px-6 xl:px-10">{assignment.assignmentName}</h1>
                                <h1 className="sm:px-3 md:px-3 lg:px-6 xl:px-10">{new Date(assignment.assignmentSubmitDate).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
                                <span className="sm:px-3 md:px-3 lg:px-6 xl:px-10 cursor-pointer">
                                    <img src={fileOpenIcon} alt="fileOpenIcon" className="w-5 h-5"/>
                                </span>
                                <span className="sm:px-3 md:px-3 lg:px-6 xl:px-10 cursor-pointer">
                                    <a href={assignment.assignmentDownloadUrl} download>
                                        <img src={downloadIcon} alt="downloadIcon" className="w-5 h-5"/>
                                    </a>
                                </span>
                                { !(date.current > new Date(assignment.assignmentSubmitDate)) &&
                                    <span className="sm:mx-3 md:mx-3 lg:mx-6 xl:mx-10">
                                        <input onChange={(event) => setAssignmentUploadFile(event.target.files[0])} type="file" className="bg-gray-200 w-55 px-2 py-1 rounded cursor-pointer"/>
                                    </span>
                                }
                                <span>
                                    { date.current > new Date(assignment.assignmentSubmitDate) ?
                                        <h1>Due date is over!</h1> :
                                        <button onClick={() => handleUploadAssignment(assignment.assignmentSubjectId,assignment._id)} className="bg-green-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-green-400 transition-all duration-400 ease-in-out">{status ? "Update File" : "Upload File"}</button>
                                    }
                                </span>
                                <h1 className="sm:mx-3 md:mx-3 lg:mx-6 xl:mx-10 py-1 px-2 rounded">{status ? "Submitted" : "Not Submitted"}</h1>
                            </div>
                        )
                    }) : <h1 className="text-center">The assignments haven't been provided by the teacher.</h1>
                }
            </div>
        </>
    )
}

export default StudentSubjectAssignments;