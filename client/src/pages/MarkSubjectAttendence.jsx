import { useNavigate, useParams } from "react-router-dom";
import leftLongArrow from "../assets/leftLongArrow.svg";
import { useContext, useEffect, useState } from "react";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";

const MarkSubjectAttendence = () => {
    const { subjectId, subjectName, subjectCode } = useParams();
    const { getStudentsForAttendence, studentsForAttendence, markAttendence } = useContext(TeacherDashboardContext);
    const navigate = useNavigate();
    const [studentIds, setStudentIds] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [day, setDay] = useState(new Date().toLocaleDateString("en-US", { weekday: "short" }));
    const handleGetStudentsForAttendence = async () => {
        await getStudentsForAttendence(subjectId);
    }
    const handleMarkAttendence = async () => {
        await markAttendence(subjectId,studentIds,day);
    }
    useEffect(() => {
        handleGetStudentsForAttendence();
    },[]);
    return(
        <div className="flex flex-col items-center">
            <img onClick={() => navigate("/teacher-dashboard/mark-attendence")} src={leftLongArrow} alt="leftArrow" className="absolute left-10 top-4 w-10 h-10 cursor-pointer"/>
            <h1 className="text-center mt-5 text-3xl font-semibold text-blue-950">{subjectName} ({subjectCode})</h1>
            <div className="mt-7 mx-30 bg-blue-200 rounded shadow-lg w-[80vw] pb-2">
                <div className="grid grid-cols-3 py-2 text-2xl font-semibold">
                    <h1 className="flex justify-center items-center">Name</h1>
                    <h1 className="flex justify-center items-center">Roll no.</h1>
                    <h1 className="flex justify-center items-center">Attendence</h1>
                </div>
                <hr className="mb-3"/>
                {
                    studentsForAttendence.map((student,index) => (
                        <div key={index} className="grid grid-cols-3 mt-2">
                            <h1 className="flex justify-center items-center">{student.userId.name}</h1>
                            <h1 className="flex justify-center items-center">{student.rollNo}</h1>
                            <input checked={activeIndex === index && isChecked} onChange={(event) => {
                                setIsChecked(event.target.checked);
                                setActiveIndex(index);
                                isChecked && setStudentIds(prev => [...prev,student._id]);
                            }} type="checkbox" className="flex justify-center items-center"/>
                        </div>
                    ))
                }
            </div>
            <button onClick={handleMarkAttendence} className="bg-red-500 w-42 text-white rounded py-2 px-4 mt-6 cursor-pointer hover:bg-red-400 transition-all duration-400 ease-in-out">Submit Attendence</button>
        </div>
    )
}

export default MarkSubjectAttendence;