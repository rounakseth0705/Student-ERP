import { useContext } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
import leftLongArrow from "../assets/leftLongArrow.svg";

const AssignSubjectToLecture = () => {
    const { courseId, semester, day, classTime, schedule } = useParams();
    const { scheduleClass, updateSchedule } = useContext(AdminDashboardContext);
    const navigate = useNavigate();
    const [subjectName, setSubjectName] = useState("");
    const [subjectCode, setSubjectCode] = useState("");
    const handleAssignSubject = async (event) => {
        event.preventDefault();
        if (schedule === "assignSubject") {
            await scheduleClass(subjectName,subjectCode,courseId,semester,day,classTime);
        } else if (schedule === "updateSchedule") {
            await updateSchedule(subjectName,subjectCode,courseId,semester,day,classTime);
        }
    }
    return(
        <div className="h-screen w-screen flex flex-col items-center">
            <img onClick={() => navigate(`/admin-dashboard/courses/${courseId}`)} src={leftLongArrow} alt="leftArrow" className="absolute left-10 top-5 w-10 h-10 cursor-pointer"/>
            <h1 className="text-blue-900 text-4xl mt-20 font-semibold">{ schedule === "assignSchedule" ? "Assign Schedule" : "Update Schedule" }</h1>
            <h1 className="text-blue-900 text-3xl mt-1 font-semibold">{day} - ({classTime})</h1>
            <form className="m-5 bg-blue-300 py-4 px-5 rounded-2xl shadow-2xl sm:px-20 md:px-30">
                <div>
                    <h1 className="p-1">Subject name</h1>
                    <input onChange={(event) => setSubjectName(event.target.value)} value={subjectName} type="text" placeholder="enter subject name" className="bg-gray-300 w-60 outline-0 rounded-full py-2 px-5 sm:w-80" required/>
                </div>
                <div className="my-3">
                    <h1 className="p-1">Subject code</h1>
                    <input onChange={(event) => setSubjectCode(event.target.value)} value={subjectCode} placeholder="enter subject code" className="bg-gray-300 w-60 outline-0 rounded-full py-2 px-5 sm:w-80" required/>
                </div>
                <button onClick={(event) => handleAssignSubject(event)} className="py-2 px-5 my-3 rounded-full bg-white text-blue-950 cursor-pointer">{ schedule === "assignSchedule" ? "Assign Schedule" : "Update Schedule" }</button>
            </form>
        </div>
    )
}

export default AssignSubjectToLecture;