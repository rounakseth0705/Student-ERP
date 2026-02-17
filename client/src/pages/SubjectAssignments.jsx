import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/AuthContext.jsx";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import leftLongArrow from "../assets/leftLongArrow.svg";
import downloadIcon from "../assets/downloadIcon.svg";
import fileOpenIcon from "../assets/fileOpenIcon.svg";
import rightArrowBlack from "../assets/rightArrowBlack.svg";
import downArrowBlack from "../assets/downArrowBlack.svg";

const SubjectAssignments = () => {
    const { subjectId, subjectName, subjectCode } = useParams();
    const { userIdentity } = useContext(UserContext);
    const { assignments, getSubjectAssignments } = useContext(TeacherDashboardContext);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const handleGetSubjectAssignments = async () => {
        await getSubjectAssignments(userIdentity.courseId._id,subjectId);
    }
    useEffect(() => {
        handleGetSubjectAssignments();
    },[])
    return(
        <div>
            <img onClick={() => navigate("/teacher-dashboard/assignments")} src={leftLongArrow} alt="leftArrow" className="absolute left-10 top-5 w-10 h-10 cursor-pointer"/>
            <h1 className="text-center mt-5 text-3xl font-semibold text-blue-950">{subjectName} ({subjectCode})</h1>
            <div className="mt-5 mx-40">
                {
                    assignments.map((assignment,index) => (
                        <div key={index} className="flex justify-between items-center my-5 py-5 bg-blue-200 text-2xl rounded shadow-lg">
                            <span className="cursor-pointer px-7">
                                { !isOpen ?
                                    <img onClick={() => setIsOpen(true)} src={rightArrowBlack} alt="rightArrowBlack" className="w-5 h-5"/> :
                                    <img onClick={() => setIsOpen(false)} src={downArrowBlack} alt="downArrowBlack" className="w-5 h-5"/>
                                }
                            </span>
                            <h1 className="px-7">{assignment.assignmentName}</h1>
                            <span className="px-7 cursor-pointer">
                                <img src={fileOpenIcon} alt="fileOpenIcon" className="w-7 h-7"/>
                            </span>
                            <span className="px-7 cursor-pointer">
                                <img src={downloadIcon} alt="downloadIcon" className="w-7 h-7"/>
                            </span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SubjectAssignments;