import { useContext } from "react";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import toast from "react-hot-toast";

const TeacherSubjects = ({ isMarkingAttendance=false }) => {
    const { subjects } = useContext(TeacherDashboardContext);
    const navigate = useNavigate();
    const day = useRef(new Date().toLocaleDateString("en-US", { weekday: "short" }));
    const handleNavigate = (subjectId,subjectName,subjectCode) => {
        if (isMarkingAttendance) {
            day.current === "Sat" || day.current === "Sun" ? toast.error("Cannot mark attendance") : navigate(`${subjectId}/${subjectName}/${subjectCode}`);
        } else {
            navigate(`${subjectId}/${subjectName}/${subjectCode}`);
        }
    }
    return(
        <div className="grid grid-cols-1 gap-8 mt-8 mx-10 sm:mt-12 sm:grid-cols-2 sm:mx-12 sm:gap-5 md:gap-10 md:mx-20 lg:mx-40 xl:mx-50">
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