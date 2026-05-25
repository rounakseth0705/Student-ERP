import { useNavigate } from "react-router-dom";
import leftArrowBlack from "../assets/leftArrowBlack.svg";
import { useEffect } from "react";
import { useContext } from "react";
import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
import { UserContext } from "../context/AuthContext.jsx";
import { useState } from "react";
import CurrentTime from "../components/CurrentTime.jsx";

const SubjectWiseAttendence = () => {
    const { userIdentity } = useContext(UserContext);
    const { subjects, getSubjects, getSubjectWiseAttendance } = useContext(StudentDashboardContext);
    const navigate = useNavigate();
    const [subjectIds, setSubjectIds] = useState([]);
    const handleGetSubjects = async () => {
        await getSubjects(userIdentity.courseId._id,userIdentity.semester);
    }
    useEffect(() => {
        handleGetSubjects();
        const arrayOfubjectIds = subjects.map(subject => subject._id);
        setSubjectIds(arrayOfubjectIds);
    },[]);
    return(
        <>
            <div className="flex justify-between items-center px-[2vw] py-[2vh] sm:px-5 sm:py-6 lg:py-4">
                <img onClick={() => navigate("/student-dashboard/attendance")} src={leftArrowBlack} alt="ArrowIcon" className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
                <h1 className="text-blue-950 font-semibold sm:text-2xl lg:text-3xl">Subject Wise Attendance</h1>
                <button onClick={() => navigate("/student-dashboard/attendance/day-wise")} className="bg-blue-400 text-white rounded p-1 cursor-pointer text-xs sm:text-base">Day Wise Attendance</button>
            </div>
            <div className="my-5 mx-3 sm:mx-10 md:mx-20 lg:mx-25 xl:mx-30">
                {
                    subjects.map((subject,index) => {
                        const subjectAttendance = userIdentity?.subjectWiseAttendance?.find(subjectAttendance => subjectAttendance.subjectId === subject._id);
                        const classesAttended = subjectAttendance ? subjectAttendance.classesAttended : 0;
                        return(
                            <div key={index} className="bg-gray-50 shadow-lg my-5 py-2 px-1 sm:px-3">
                                <h1 className="text-center my-2 font-semibold sm:text-2xl">{subject.subjectName}</h1>
                                <span className="flex justify-between items-center text-xs text-blue-600 mt-3 sm:text-base">
                                    <h1 className="sm:px-5">Subject Code</h1>
                                    <h1 className="sm:px-5">Attended/Delivered</h1>
                                    <h1 className="sm:px-5">Percentage</h1>
                                </span>
                                <span className="flex justify-between items-center my-1 text-xs sm:text-base">
                                    <h1 className="sm:px-5">{subject.subjectCode}</h1>
                                    <h1 className="sm:px-5">{classesAttended}/{subject.classesDelivered}</h1>
                                    <h1 className="sm:px-5">{ classesAttended ? Number(((classesAttended/subject.classesDelivered) * 100).toFixed(2)) : 0 }%</h1>
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default SubjectWiseAttendence;