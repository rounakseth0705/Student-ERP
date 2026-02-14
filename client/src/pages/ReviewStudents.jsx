import { useContext, useEffect } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/homeIcon.svg";

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
        <div className="flex flex-col justify-center items-center">
            <img onClick={() => navigate("/teacher-dashboard")} src={homeIcon} alt="homeIcon" className="absolute left-10 top-6 w-8 h-8 cursor-pointer"/>
            <h1 className="mt-5 text-blue-950 text-2xl font-semibold sm:text-3xl md:text-4xl">List of Students in {userIdentity.courseId.courseName}</h1>
            <input onChange={(event) => setQuery(event.target.value)} value={query} type="text" placeholder="search student" className="mt-5 py-3 px-5 bg-gray-300 rounded-full outline-0 w-80 md:py-5 sm:w-110 md:w-150"/>
            <div className="bg-blue-50 rounded shadow-2xl mt-5 w-[95vw] sm:w-[90vw]">
                <div className="grid grid-cols-5 py-2 text-blue-950 font-semibold text-sm sm:text-base md:text-2xl">
                    <h1 className="flex justify-center items-center">Name</h1>
                    <h1 className="flex justify-center items-center">ID</h1>
                    <h1 className="flex justify-center items-center">Roll No.</h1>
                    <h1 className="flex justify-center items-center">Semester</h1>
                    <h1 className="flex justify-center items-center">Attendence</h1>
                </div>
                <hr className="mb-2"/>
                { query.trim() === "" && students.length > 0 ?
                    students.map(student => (
                        <div key={student._id} className="grid grid-cols-5 my-1 text-sm sm:text-base">
                            <h1 className="flex justify-center items-center">{student.userId.name}</h1>
                            <h1 className="flex justify-center items-center">{student.studentId}</h1>
                            <h1 className="flex justify-center items-center">{student.rollNo}</h1>
                            <h1 className="flex justify-center items-center">{student.semester}</h1>
                            <h1 className="flex justify-center items-center">{student.attendence}%</h1>
                        </div>
                    )) : query.trim() !== "" && result.length > 0 ?
                    result.map(student => (
                        <div key={student._id} className="grid grid-cols-5 my-1 text-xs sm:text-base">
                            <h1 className="flex justify-center items-center">{student.userId.name}</h1>
                            <h1 className="flex justify-center items-center">{student.studentId}</h1>
                            <h1 className="flex justify-center items-center">{student.rollNo}</h1>
                            <h1 className="flex justify-center items-center">{student.semester}</h1>
                            <h1 className="flex justify-center items-center">{student.attendence}%</h1>
                        </div>
                    )) : <div>No students found</div>
                }
            </div>
        </div>
    )
} 

export default ReviewStudents;