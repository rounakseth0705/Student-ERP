import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/AuthContext.jsx";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import leftArrowBlack from "../assets/leftArrowBlack.svg";
import downloadIcon from "../assets/downloadIcon.svg";
import fileOpenIcon from "../assets/fileOpenIcon.svg";
import rightArrowBlack from "../assets/rightArrowBlack.svg";
import editIcon from "../assets/editIcon.svg";
import checkIcon from "../assets/checkIcon.svg";
import removeIcon from "../assets/removeIcon.svg";
import TeacherCreateButton from "../components/TeacherCreateButton.jsx";
import CurrentTime from "../components/CurrentTime.jsx";

const SubjectAssignments = () => {
    const { subjectId, subjectName, subjectCode } = useParams();
    const { userIdentity } = useContext(UserContext);
    const { assignments, getSubjectAssignments, updateAssignmentName, updateAssignmentSubmitDate, deleteAssignment, getAssignmentUploads, assignmentUploads } = useContext(TeacherDashboardContext);
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
    const handleArrowOpen = async (index,assignmentId) => {
        setActiveIndex(index);
        setIsOpen(prev => !prev);
        if (!isOpen) {
            await getAssignmentUploads(assignmentId);
        }
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
            <div className="flex justify-between items-center p-4 sm:p-5 lg:py-4 lg:px-6">
                <img onClick={() => navigate("/teacher-dashboard/assignments")} src={leftArrowBlack} alt="leftArrow" className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
                <h1 className="font-semibold text-blue-950 sm:text-2xl lg:text-3xl">{subjectName} ({subjectCode})</h1>
                <CurrentTime />
            </div>
            <div className="mt-10 mx-3 sm:mx-7 md:mx-10 lg:mx-15 xl:mx-30">
                {
                    assignments.map((assignment,index) => (
                        <React.Fragment key={index}>
                            <div className="flex flex-wrap justify-center items-center gap-6 my-5 py-3 bg-blue-200 rounded shadow-lg sm:justify-between lg:gap-0">
                                <span className="cursor-pointer mx-2 sm:mx-3 md:px-4 lg:mx-7">
                                    <img onClick={() => handleArrowOpen(index,assignment._id)} src={rightArrowBlack} alt="rightArrowBlack" className={`w-4 h-4 duration-300 ${activeIndex === index && isOpen ? "rotate-90" : "rotate-0"} md:w-5 md:h-5`}/>
                                </span>
                                <span className="flex justify-center items-center gap-1 mx-2 sm:mx-3 md:mx-4 lg:mx-7 lg:gap-3">
                                    { isNameEditing && activeIndex === index ?
                                        <input onChange={(event) => setAssignmentUpdatedName(event.target.value)} value={assignmentUpdatedName} type="text" className="w-20 rounded bg-gray-200 outline-0 lg:w-25 xl:w-27"/>
                                        : <h1 className="text-xs sm:text-base">{assignment.assignmentName}</h1>
                                    }
                                    { isNameEditing && activeIndex === index ?
                                        <img onClick={() => handleAssignmentNameInputBoxClosing(assignment._id)} src={checkIcon} alt="checkIcon" className="w-4 h-4 cursor-pointer"/> :
                                        <img onClick={() => handleAssignmentNameInputBoxOpening(index)} src={editIcon} alt="editIcon" className="w-3 h-3 cursor-pointer md:w-4 md:h-4"/>
                                    }
                                </span>
                                <h1 className="text-xs mx-2 sm:mx-3 sm:text-base md:mx-4 lg:mx-7">{new Date(assignment.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
                                <span className="flex justify-center items-center gap-1 mx-2 sm:mx-3 md:mx-4 lg:mx-7 lg:gap-3">
                                    { isSubmitDateEditing && activeIndex === index ?
                                        <input onChange={(event) => setAssignmentUpdatedSubmitDate(event.target.value)} value={assignmentUpdatedSubmitDate} type="date" className="w-35 px-2 rounded bg-gray-200 outline-0"/> :
                                        <h1 className="text-xs sm:text-base">{new Date(assignment.assignmentSubmitDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
                                    }
                                    { isSubmitDateEditing && activeIndex === index ?
                                        <img onClick={() => handleAssignmentSubmitDateInputBoxClosing(assignment._id)} src={checkIcon} alt="checkIcon" className="w-4 h-4 cursor-pointer"/> :
                                        <img onClick={() => handleAssignmentSubmitDateInputBoxOpening(index)} src={editIcon} alt="editIcon" className="w-3 h-3 cursor-pointer md:w-4 md:h-4"/>
                                    }
                                </span>
                                {/* <span className="mx-2 sm:mx-3 md:mx-4 lg:mx-7 cursor-pointer">
                                    <img src={fileOpenIcon} alt="fileOpenIcon" className="w-4 h-4 md:w-5 md:h-5"/>
                                </span> */}
                                <span className="mx-2 sm:mx-3 md:mx-4 lg:mx-7 cursor-pointer">
                                    <a href={assignment.assignmentDownloadUrl} download>
                                        <img src={downloadIcon} alt="downloadIcon" className="w-4 h-4 md:w-5 md:h-5"/>
                                    </a>
                                </span>
                                <span className="mx-2 sm:mx-3 md:mx-4 lg:mx-7 cursor-pointer">
                                    <img onClick={() => handleDeleteAssignment(assignment._id)} src={removeIcon} alt="removeIcon" className="w-4 h-4 hover:opacity-60 md:w-5 md:h-5"/>
                                </span>
                            </div>
                            { (isOpen && activeIndex === index) &&
                                <div className="bg-blue-300 mx-6 py-3 rounded sm:mx-10 md:mx-15">
                                    { assignmentUploads.length > 0 ?
                                        assignmentUploads.map((assignmentUpload,index) => (
                                            <div key={index} className="flex justify-around items-center py-2">
                                                <h1 className="text-xs sm:text-base">{index+1}.</h1>
                                                <h1 className="text-xs sm:text-base">{assignmentUpload.studentId.userId.name}</h1>
                                                <h1 className="text-xs sm:text-base">{assignmentUpload.studentId.rollNo}</h1>
                                                {/* <span className="mx-2 sm:mx-3 md:mx-4 lg:mx-7 cursor-pointer">
                                                        <img src={fileOpenIcon} alt="fileOpenIcon" className="w-5 h-5"/>
                                                </span> */}
                                                <span className="mx-2 sm:mx-3 md:mx-4 lg:mx-7 cursor-pointer">
                                                    <a href={assignmentUpload.assignmentUploadDownloadUrl} download>
                                                        <img src={downloadIcon} alt="downloadIcon" className="w-4 h-4 sm:w-5 sm:h-5"/>
                                                    </a>
                                                </span>
                                            </div>
                                        )) : <div className="text-center text-xs sm:text-base">No Assignment Uploads</div>
                                    }
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