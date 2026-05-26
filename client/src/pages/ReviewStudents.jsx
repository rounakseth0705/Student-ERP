import { useContext, useEffect } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import leftArrowBlack from "../assets/leftArrowBlack.svg";

const ReviewStudents = () => {
    const { userIdentity } = useContext(UserContext);
    const { students, getCourseStudents } = useContext(TeacherDashboardContext);
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);
    const handleGetCourseStudents = async () => {
        await getCourseStudents(userIdentity.courseId._id);
    }
    useEffect(() => {
        handleGetCourseStudents();
    },[])
    useEffect(() => {
        const filteredStudents = students.filter(student => student.userId.name.toLowerCase().includes(query.trim().toLowerCase()) || student.studentId.includes(query.trim()) || student.rollNo.includes(query.trim()));
        setResult(filteredStudents);
    },[query])
    return(
        <div className="bg-blue-100 min-h-screen">
            <div className="flex justify-between items-center px-[2vw] py-[2vh] sm:px-5 sm:py-6 lg:py-4">
                <img onClick={() => navigate("/teacher-dashboard")} src={leftArrowBlack} alt="leftArrowIcon" className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
                <h1 className="text-blue-950 font-semibold sm:text-2xl lg:text-3xl">List of Students in {userIdentity.courseId.courseName}</h1>
                <h1></h1>
            </div>
            <div className="flex flex-col items-center">
                <input onChange={(event) => setQuery(event.target.value)} value={query} type="text" placeholder="search student" className="mt-5 py-2 px-5 bg-gray-300 rounded-full outline-0 w-[70vw] text-xs sm:text-base sm:py-3 sm:w-100 sm:px-7 lg:w-150 lg:py-4"/>
                <div className="bg-blue-50 rounded shadow-2xl mt-5 w-screen sm:w-[90vw]">
                    <div className="grid grid-cols-4 py-2 text-blue-950 font-semibold text-sm sm:text-base md:text-2xl">
                        <h1 className="flex justify-center items-center">Name</h1>
                        <h1 className="flex justify-center items-center">Roll No.</h1>
                        <h1 className="flex justify-center items-center">Semester</h1>
                        <h1 className="flex justify-center items-center">Attendence</h1>
                    </div>
                    <hr className="mb-2"/>
                    { query.trim() === "" && students.length > 0 ?
                        students.map(student => {
                            const attendance = student.classesAttended !== 0 && student.courseId.classesDelivered[student.semester-1] ? Number(((student.classesAttended/student.courseId.classesDelivered[student.semester-1])*100).toFixed(2)) : 0;
                            return(
                                <div key={student._id} className="grid grid-cols-4 my-1 text-xs sm:text-base">
                                    <h1 className="flex justify-center items-center">{student.userId.name}</h1>
                                    <h1 className="flex justify-center items-center">{student.rollNo}</h1>
                                    <h1 className="flex justify-center items-center">{student.semester}</h1>
                                    <h1 className="flex justify-center items-center">{attendance}%</h1>
                                </div>
                            )
                        }) : query.trim() !== "" && result.length > 0 ?
                        result.map(student => {
                            const attendance = student.classesAttended !== 0 && student.courseId.classesDelivered[student.semester-1] ? Number(((student.classesAttended/student.courseId.classesDelivered[student.semester-1])*100).toFixed(2)) : 0;
                            return(
                                <div key={student._id} className="grid grid-cols-4 my-1 text-xs sm:text-base">
                                    <h1 className="flex justify-center items-center">{student.userId.name}</h1>
                                    <h1 className="flex justify-center items-center">{student.rollNo}</h1>
                                    <h1 className="flex justify-center items-center">{student.semester}</h1>
                                    <h1 className="flex justify-center items-center">{attendance}%</h1>
                                </div>
                            )
                        }) : <div className="text-xs text-center sm:text-base">No students found</div>
                    }
                </div>
            </div>
        </div>
    )
} 

export default ReviewStudents;