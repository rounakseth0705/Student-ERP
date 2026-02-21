import { useContext } from "react";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import { useNavigate } from "react-router-dom";

const TeacherSubjects = ({ isAttendencePage=false }) => {
    const { subjects } = useContext(TeacherDashboardContext);
    const navigate = useNavigate();
    const handleNavigate = (subjectId,subjectName,subjectCode) => {
        if (isAttendencePage) {
            navigate(`${subjectId}`);
        } else {
            navigate(`${subjectId}/${subjectName}/${subjectCode}`);
        }
    }
    return(
        <div className="grid grid-cols-2 gap-10 mt-15 mx-50">
            {
                subjects.map((subject,index) => (
                    <div key={index} onClick={() => handleNavigate(subject._id,subject.subjectName,subject.subjectCode)} className="flex flex-col justify-center items-center py-5 bg-blue-200 text-blue-950 font-semibold rounded shadow-lg cursor-pointer hover:bg-blue-100 hover:text-blue-900 transition-all ease-in-out duration-400">
                        <h1>Subject: {subject.subjectName}</h1>
                        <h1>Code: {subject.subjectCode}</h1>
                        <h1>Semester: {subject.semester}</h1>
                    </div>
                ))
            }
        </div>
    )
}

export default TeacherSubjects;