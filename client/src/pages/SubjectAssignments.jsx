import React, { useContext, useEffect, useState } from "react";
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
    const { assignments, getSubjectAssignments, updateAssignmentName, updateAssignmentSubmitDate, deleteAssignment } = useContext(TeacherDashboardContext);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isNameEditing, setIsNameEditing] = useState(false);
    const [isSubmitDateEditing, setIsSubmitDateEditing] = useState("");
    const [assignmentUpdatedName, setAssignmentUpdatedName] = useState("");
    const [assignmentUpdatedSubmitDate, setAssignmentUpdatedSubmitDate] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [assignmentName, setAssignmentName] = useState("");
    const [assignmentSubmitDate, setAssignmentSubmitDate] = useState("");
    const [assignmentFile, setAssignmentFile] = useState(null);
    const navigate = useNavigate();
    const handleGetSubjectAssignments = async () => {
        await getSubjectAssignments(userIdentity.courseId._id,subjectId);
    }
    const handleArrowOpen = (index) => {
        setActiveIndex(index);
        setIsOpen(prev => !prev);
    }
    const handleAssignmentNameInputBoxOpening = (index) => {
        setActiveIndex(index);
        setIsNameEditing(true);
    }
    const handleAssignmentSubmitDateInputBoxOpening = (index) => {
        setActiveIndex(index);
        setIsSubmitDateEditing(true);
    }
    const handleAssignmentNameInputBoxClosing = async (assignmentId) => {
        setActiveIndex(null);
        setIsNameEditing(false);
        setAssignmentUpdatedName("");
        await updateAssignmentName(assignmentId,assignmentUpdatedName);
    }
    const handleAssignmentSubmitDateInputBoxClosing = async (assignmentId) => {
        setActiveIndex(null);
        setIsSubmitDateEditing(false);
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
        <>
            <img onClick={() => navigate("/teacher-dashboard/assignments")} src={leftLongArrow} alt="leftArrow" className="absolute left-10 top-4 w-10 h-10 cursor-pointer"/>
            <h1 className="text-center mt-5 text-3xl font-semibold text-blue-950">{subjectName} ({subjectCode})</h1>
            <div className="mt-10 mx-30">
                {
                    assignments.map((assignment,index) => (
                        <React.Fragment key={index}>
                            <div className="flex justify-between items-center my-5 py-3 bg-blue-200 rounded shadow-lg">
                                <span className="cursor-pointer px-7">
                                    <img onClick={() => handleArrowOpen(index)} src={rightArrowBlack} alt="rightArrowBlack" className={`w-5 h-5 duration-300 ${activeIndex === index && isOpen ? "rotate-90" : "rotate-0"}`}/>
                                </span>
                                <span className="flex justify-center items-center gap-3 px-7">
                                    { isNameEditing && activeIndex === index ?
                                        <input onChange={(event) => setAssignmentUpdatedName(event.target.value)} value={assignmentUpdatedName} type="text" className="w-27 rounded bg-gray-200 outline-0"/>
                                        : <h1>{assignment.assignmentName}</h1>
                                    }
                                    { isNameEditing && activeIndex === index ?
                                        <img onClick={() => handleAssignmentNameInputBoxClosing(assignment._id)} src={checkIcon} alt="checkIcon" className="w-4 h-4 cursor-pointer"/> :
                                        <img onClick={() => handleAssignmentNameInputBoxOpening(index)} src={editIcon} alt="editIcon" className="w-4 h-4 cursor-pointer"/>
                                    }
                                </span>
                                <h1 className="px-7">{new Date(assignment.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
                                <span className="flex justify-center items-center gap-3 px-7">
                                    { isSubmitDateEditing && activeIndex === index ?
                                        <input onChange={(event) => setAssignmentUpdatedSubmitDate(event.target.value)} value={assignmentUpdatedSubmitDate} type="date" className="w-35 px-2 rounded bg-gray-200 outline-0"/> :
                                        <h1>{new Date(assignment.assignmentSubmitDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
                                    }
                                    { isSubmitDateEditing && activeIndex === index ?
                                        <img onClick={() => handleAssignmentSubmitDateInputBoxClosing(assignment._id)} src={checkIcon} alt="checkIcon" className="w-4 h-4 cursor-pointer"/> :
                                        <img onClick={() => handleAssignmentSubmitDateInputBoxOpening(index)} src={editIcon} alt="editIcon" className="w-4 h-4 cursor-pointer"/>
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
                                <div className="my-2">
                                    
                                </div>
                            }
                        </React.Fragment>
                    ))
                }
                { isUploading &&
                    <div className="flex justify-between items-center bg-blue-300 py-3 rounded shadow-lg">
                        <input onChange={(event) => setAssignmentName(event.target.value)} value={assignmentName} type="text" placeholder="enter assignment name" className="mx-5 rounded py-1 px-3 outline-0 bg-gray-200"/>
                        <input onChange={(event) => setAssignmentSubmitDate(event.target.value)} value={assignmentSubmitDate} type="date" className="mx-5 rounded py-1 px-3 outline-0 bg-gray-200"/>
                        <input onChange={(event) => setAssignmentFile(event.target.files[0])} type="file" className="mx-5 rounded py-1 px-3 outline-0 bg-gray-200"/>
                    </div>
                }
                <TeacherCreateButton create="Assignment" isUploading={isUploading} setIsUploading={setIsUploading} name={assignmentName} setName={setAssignmentName} subjectId={subjectId} submitDate={assignmentSubmitDate} setSubmitDate={setAssignmentSubmitDate} file={assignmentFile}/>
            </div>
        </>
    )
}

export default SubjectAssignments;