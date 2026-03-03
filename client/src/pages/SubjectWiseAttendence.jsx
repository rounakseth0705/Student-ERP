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
    useEffect(() => {
        handleGetSubjects();
        const arrayOfubjectIds = subjects.map(subject => subject._id);
        setSubjectIds(arrayOfubjectIds);
    },[]);
    return(
        <>
            <img onClick={() => navigate("/student-dashboard/attendance")} src={leftLongArrow} alt="ArrowIcon" className="absolute left-3 top-5 w-6 h-6 cursor-pointer sm:left-8 sm:w-8 sm:h-8 md:w-10 md:h-10 md:left-15"/>
            <h1 className="text-center mt-5 text-blue-950 font-semibold sm:text-2xl md:text-3xl lg:text-4xl">Subject Wise Attendance</h1>
            <div className="mt-5 mx-3 sm:mx-10 md:mx-20 lg:mx-25 xl:mx-30">
                {
                    subjects.map((subject,index) => {
                        const subjectAttendance = userIdentity?.subjectWiseAttendance?.find(subjectAttendance => subjectAttendance.subjectId === subject._id);
                        const classesAttended = subjectAttendance ? subjectAttendance.classesAttended : 0;
                        return(
                        <div key={index} className="bg-gray-50 shadow-lg my-5 py-2 px-1 sm:px-3">
                            <h1 className="text-center my-2 font-semibold sm:text-2xl">{subject.subjectName}</h1>
                            <span className="flex justify-between items-center text-sm text-blue-600 mt-3 sm:text-base">
                                <h1 className="sm:px-5">Subject Code</h1>
                                <h1 className="sm:px-5">Attended/Delivered</h1>
                                <h1 className="sm:px-5">Percentage</h1>
                            </span>
                            <span className="flex justify-between items-center my-1 text-sm sm:text-base">
                                <h1 className="sm:px-5">{subject.subjectCode}</h1>
                                <h1 className="sm:px-5">{classesAttended}/{subject.classesDelivered}</h1>
                                <h1 className="sm:px-5">{ classesAttended ? ((classesAttended/subject.classesDelivered) * 100) : 0}%</h1>
                            </span>
                        </div>
                    )})
                }
            </div>
        </>
    )
}

export default SubjectWiseAttendence;