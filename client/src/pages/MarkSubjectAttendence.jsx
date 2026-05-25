import { useNavigate, useParams } from "react-router-dom";
import leftArrowBlack from "../assets/leftArrowBlack.svg";
import { useContext, useEffect, useState } from "react";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import { useRef } from "react";
import { UserContext } from "../context/AuthContext.jsx";

const MarkSubjectAttendence = () => {
    const { subjectId, subjectName, subjectCode } = useParams();
    const { userIdentity } = useContext(UserContext);
    const { getStudentsForAttendence, studentsForAttendence, markAttendence } = useContext(TeacherDashboardContext);
    const navigate = useNavigate();
    const [studentIds, setStudentIds] = useState([]);
    const day = useRef(new Date().toLocaleDateString("en-US", { weekday: "short" }));
    const handleGetStudentsForAttendence = async () => {
        await getStudentsForAttendence(subjectId);
    }
    const handleMarkAttendence = async () => {
        await markAttendence(subjectId,studentIds,day.current);
    }
    const handleMarkStudent = (id) => {
        setStudentIds(prev => prev.includes(id) ? prev.filter(studentId => studentId !== id) : [...prev,id]);
    }
    useEffect(() => {
        handleGetStudentsForAttendence();
    },[]);
    return(
        <>
            <div className="flex justify-between items-center py-4 px-3 sm:px-4 sm:py-5 lg:p-5">
                <img onClick={() => navigate("/teacher-dashboard/mark-attendence")} src={leftArrowBlack} alt="leftArrow" className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
                <h1 className="font-semibold text-blue-950 sm:text-2xl lg:text-3xl">{subjectName} ({subjectCode})</h1>
                <button onClick={() => navigate(`/teacher-dashboard/about-${userIdentity.courseId.courseName.toLowerCase()}`)} className="bg-blue-400 text-white text-xs rounded p-1 cursor-pointer sm:text-base">Check Schedule</button>
            </div>
            <div className="mt-4 mx-auto bg-blue-200 rounded shadow-lg w-[90vw] pb-2 sm:w-[85vw] sm:mt-7 lg:w-[80vw]">
                <div className="grid grid-cols-3 py-2 font-semibold sm:text-2xl">
                    <h1 className="flex justify-center items-center">Name</h1>
                    <h1 className="flex justify-center items-center">Roll no.</h1>
                    <h1 className="flex justify-center items-center">Attendence</h1>
                </div>
                <hr className="mb-3"/>
                {
                    studentsForAttendence.map((student,index) => (
                        <div key={index} className="grid grid-cols-3 mt-2 text-xs sm:text-base">
                            <h1 className="flex justify-center items-center">{student.userId.name}</h1>
                            <h1 className="flex justify-center items-center">{student.rollNo}</h1>
                            <input checked={studentIds.includes(student._id)} onChange={() => handleMarkStudent(student._id)} type="checkbox" className="flex justify-center items-center"/>
                        </div>
                    ))
                }
            </div>
            <button onClick={handleMarkAttendence} className="bg-red-500 text-white rounded py-2 px-2 my-6 mx-auto cursor-pointer hover:bg-red-400 transition-all duration-400 ease-in-out text-xs sm:px-3 sm:text-base md:px-4">Submit Attendence</button>
        </>
    )
}

export default MarkSubjectAttendence;