import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AdminDashboardContext } from "../context/AdminDashboardContext";

const AssignSubjectToLecture = () => {
    const { courseId, semester, day, classTime } = useParams();
    const { scheduleClass } = useContext(AdminDashboardContext);
    const [subjectName, setSubjectName] = useState("");
    const [subjectCode, setSubjectCode] = useState("");
    const handleAssignSubject = async (event) => {
        event.preventDefault();
        await scheduleClass(subjectName,subjectCode,courseId,semester,day,classTime);
    }
    return(
        <div className="h-screen w-screen flex flex-col items-center">
            <h1 className="text-blue-900 text-4xl mt-20 font-semibold">Assign Subject</h1>
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
                <button onClick={(event) => handleAssignSubject(event)} className="py-2 px-5 my-3 rounded-full bg-white text-blue-950 cursor-pointer">Schedule class</button>
            </form>
        </div>
    )
}

export default AssignSubjectToLecture;