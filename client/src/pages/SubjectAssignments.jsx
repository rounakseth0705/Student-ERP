import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/AuthContext.jsx";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import leftLongArrow from "../assets/leftLongArrow.svg";

const SubjectAssignments = () => {
    const { subjectId, subjectName, subjectCode } = useParams();
    const { userIdentity } = useContext(UserContext);
    const { assignments, getSubjectAssignments } = useContext(TeacherDashboardContext);
    const navigate = useNavigate();
    const handleGetSubjectAssignments = async () => {
        await getSubjectAssignments(subjectId);
    }
    useEffect(() => {
        handleGetSubjectAssignments();
    },[])
    return(
        <div>
            <img onClick={() => navigate("/teacher-dashboard/assignments")} src={leftLongArrow} alt="leftArrow" className="absolute left-10 top-5 w-10 h-10 cursor-pointer"/>
            <h1 className="text-center mt-5 text-3xl font-semibold text-blue-950">{subjectName} ({subjectCode})</h1>
        </div>
    )
}

export default SubjectAssignments;