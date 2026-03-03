import { useNavigate, useParams } from "react-router-dom";
import leftLongArrow from "../assets/leftLongArrow.svg";
import { useContext, useEffect, useState } from "react";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import { useRef } from "react";

const MarkSubjectAttendence = () => {
    const { subjectId, subjectName, subjectCode } = useParams();
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
        <div className="flex flex-col items-center">
            <img onClick={() => navigate("/teacher-dashboard/mark-attendence")} src={leftLongArrow} alt="leftArrow" className="absolute left-3 top-5.5 w-6 h-6 cursor-pointer sm:w-8 sm:h-8 sm:left-5 md:w-10 md:h-10 md:top-4 md:left-10"/>
            <h1 className="text-center mt-5 text-2xl font-semibold text-blue-950 sm:text-3xl">{subjectName} ({subjectCode})</h1>
            <div className="mt-7 bg-blue-200 rounded shadow-lg w-[90vw] pb-2 sm:w-[85vw] lg:w-[80vw]">
                <div className="grid grid-cols-3 py-2 font-semibold sm:text-2xl">
                    <h1 className="flex justify-center items-center">Name</h1>
                    <h1 className="flex justify-center items-center">Roll no.</h1>
                    <h1 className="flex justify-center items-center">Attendence</h1>
                </div>
                <hr className="mb-3"/>
                {
                    studentsForAttendence.map((student,index) => (
                        <div key={index} className="grid grid-cols-3 mt-2 text-xs sm:text-sm md:text-base">
                            <h1 className="flex justify-center items-center">{student.userId.name}</h1>
                            <h1 className="flex justify-center items-center">{student.rollNo}</h1>
                            <input checked={studentIds.includes(student._id)} onChange={() => handleMarkStudent(student._id)} type="checkbox" className="flex justify-center items-center"/>
                        </div>
                    ))
                }
            </div>
            <button onClick={handleMarkAttendence} className="bg-red-500 w-42 text-white rounded py-2 px-2 mt-6 cursor-pointer hover:bg-red-400 transition-all duration-400 ease-in-out sm:px-3 md:px-4">Submit Attendence</button>
        </div>
    )
}

export default MarkSubjectAttendence;