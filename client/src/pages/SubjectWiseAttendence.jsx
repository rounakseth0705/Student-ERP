import { useNavigate } from "react-router-dom";
import leftLongArrow from "../assets/leftLongArrow.svg";
import { useEffect } from "react";
import { useContext } from "react";
import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
import { UserContext } from "../context/AuthContext.jsx";
import { useState } from "react";

const SubjectWiseAttendence = () => {
    const { userIdentity } = useContext(UserContext);
    const { subjects, getSubjects, getSubjectWiseAttendance } = useContext(StudentDashboardContext);
    const navigate = useNavigate();
    const [subjectIds, setSubjectIds] = useState([]);
    const handleGetSubjects = async () => {
        await getSubjects(userIdentity.courseId._id,userIdentity.semester);
    }
    const handleGetSubjectWiseAttendance = async () => {
        await getSubjectWiseAttendance(subjectIds);
    }
    useEffect(() => {
        handleGetSubjects();
        const arrayOfubjectIds = subjects.map(subject => subject._id);
        setSubjectIds(arrayOfubjectIds);
        // handleGetSubjectWiseAttendance();
    },[]);
    return(
        <>
            <img onClick={() => navigate("/student-dashboard/attendance")} src={leftLongArrow} alt="ArrowIcon" className="absolute left-15 top-5 w-10 h-10 cursor-pointer"/>
            <h1 className="text-center mt-5 text-blue-950 text-4xl font-semibold">Subject Wise Attendance</h1>
            <div className="mt-5 mx-30">
                {
                    subjects.map((subject,index) => (
                        <div key={index} className="bg-gray-50 shadow-lg my-5 py-2 px-3">
                            <h1 className="text-2xl text-center my-2 font-semibold">{subject.subjectName}</h1>
                            <span className="flex justify-between items-center text-blue-600 mt-3">
                                <h1 className="px-5">Course Code</h1>
                                <h1 className="px-5">Attended/Delivered</h1>
                                <h1 className="px-5">Percentage</h1>
                            </span>
                            <span className="flex justify-between items-center my-1">
                                <h1 className="px-5">{subject.subjectCode}</h1>
                                <h1 className="px-5">0/{subject.classesDelivered}</h1>
                                <h1 className="px-5">33.33%</h1>
                            </span>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default SubjectWiseAttendence;