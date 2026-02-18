import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/AuthContext.jsx";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import leftLongArrow from "../assets/leftLongArrow.svg";
import downloadIcon from "../assets/downloadIcon.svg";
import fileOpenIcon from "../assets/fileOpenIcon.svg";
import rightArrowBlack from "../assets/rightArrowBlack.svg";
import editIcon from "../assets/editIcon.svg";
import checkIcon from "../assets/checkIcon.svg";
import removeIcon from "../assets/removeIcon.svg";
import TeacherCreateButton from "../components/TeacherCreateButton.jsx";

const SubjectAssignments = () => {
    const { subjectId, subjectName, subjectCode } = useParams();
    const { userIdentity } = useContext(UserContext);
    const { assignments, getSubjectAssignments, updateAssignmentSubmitDate, deleteAssignment } = useContext(TeacherDashboardContext);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [assignmentUpdatedSubmitDate, setAssignmentUpdatedSubmitDate] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();
    const handleGetSubjectAssignments = async () => {
        await getSubjectAssignments(userIdentity.courseId._id,subjectId);
    }
    const handleArrowOpen = (index) => {
        setActiveIndex(index);
        setIsOpen(prev => !prev);
    }
    const handleInputBoxOpening = (index) => {
        setActiveIndex(index);
        setIsEditing(true);
    }
    const handleInputBoxClosing = async (assignmentId) => {
        setActiveIndex(null);
        setIsEditing(false);
        setAssignmentUpdatedSubmitDate("");
        await updateAssignmentSubmitDate(assignmentId,assignmentUpdatedSubmitDate);
    }
    const handleDeleteAssignment = async (assignmentId) => {
        await deleteAssignment(assignmentId);
    }
    useEffect(() => {
        handleGetSubjectAssignments();
    },[])
    return(
        <div>
            <img onClick={() => navigate("/teacher-dashboard/assignments")} src={leftLongArrow} alt="leftArrow" className="absolute left-10 top-4 w-10 h-10 cursor-pointer"/>
            <h1 className="text-center mt-5 text-3xl font-semibold text-blue-950">{subjectName} ({subjectCode})</h1>
            <div className="mt-10 mx-30">
                {
                    assignments.map((assignment,index) => (
                        <>
                            <div key={index} className="flex justify-between items-center my-5 py-3 bg-blue-200 rounded shadow-lg">
                                <span className="cursor-pointer px-7">
                                    <img onClick={() => handleArrowOpen(index)} src={rightArrowBlack} alt="rightArrowBlack" className={`w-5 h-5 duration-300 ${activeIndex === index && isOpen ? "rotate-90" : "rotate-0"}`}/>
                                </span>
                                <h1 className="px-7">{assignment.assignmentName}</h1>
                                <h1 className="px-7">{new Date(assignment.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
                                <span className="flex justify-center items-center gap-3 px-7">
                                    { isEditing && activeIndex === index ?
                                        <input onChange={(event) => setAssignmentUpdatedSubmitDate(event.target.value)} value={assignmentUpdatedSubmitDate} type="text" className="w-27 rounded bg-gray-200 outline-0"/> :
                                        <h1 className="">{new Date(assignment.assignmentSubmitDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
                                    }
                                    { isEditing && activeIndex === index ?
                                        <img onClick={() => handleInputBoxClosing(assignment._id)} src={checkIcon} alt="checkIcon" className="w-4 h-4 cursor-pointer"/> :
                                        <img onClick={() => handleInputBoxOpening(index)} src={editIcon} alt="editIcon" className="w-4 h-4 cursor-pointer"/>
                                    }
                                </span>
                                <span className="px-7 cursor-pointer">
                                    <img src={fileOpenIcon} alt="fileOpenIcon" className="w-5 h-5"/>
                                </span>
                                <span className="px-7 cursor-pointer">
                                    <a href={assignment.assignmentUrl} download>
                                        <img src={downloadIcon} alt="downloadIcon" className="w-5 h-5"/>
                                    </a>
                                </span>
                                <span className="px-7 cursor-pointer">
                                    <img onClick={() => handleDeleteAssignment(assignment._id)} src={removeIcon} alt="removeIcon" className="w-5 h-5 hover:opacity-60"/>
                                </span>
                            </div>
                            { isOpen &&
                                <div className="my-2"></div>
                            }
                            { isUploading &&
                                <div className="flex justify-between items-center bg-blue-300"></div>
                            }
                            <TeacherCreateButton create="Assignment" isUploading={isUploading}/>
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default SubjectAssignments;