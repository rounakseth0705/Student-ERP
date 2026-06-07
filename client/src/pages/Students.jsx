import { useContext, useEffect, useState } from "react";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
import removeIcon from "../assets/removeIcon.svg";
import homeIcon from "../assets/homeIcon.svg";
import { useNavigate } from "react-router-dom";

const Students = () => {
    const { students, getStudents, deleteStudent } = useContext(AdminDashboardContext);
    const navigate = useNavigate();
    const [result, setResult] = useState([]);
    const [query, setQuery] = useState("");
    const handleGetStudents = async () => {
        await getStudents();
    }
    const handleDeleteStudent = async (studentId,rollNo) => {
        await deleteStudent(studentId,rollNo);
    }
    useEffect(() => {
        handleGetStudents();
    },[]);
    useEffect(() => {
        const filteredStudents = students.filter(student => student.userId.name.toLowerCase().includes(query.trim().toLowerCase()) || student.studentId.includes(query.trim()) || student.rollNo.includes(query.trim()) || student.courseId.courseName.toLowerCase().includes(query.trim().toLowerCase()));
        setResult(filteredStudents);
    },[query]);
    return(
        <div className="bg-blue-100 min-h-screen">
            <div className="flex justify-between items-center px-[2vw] py-[2vh] sm:px-5 sm:py-6 lg:py-4">
                <img onClick={() => navigate("/admin-dashboard")} src={homeIcon} alt="homeIcon" className="w-5 h-5 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
                <h1 className="font-semibold sm:text-3xl lg:text-4xl">LIST OF STUDENTS</h1>
                <button className="bg-blue-500 text-white text-xs cursor-pointer rounded p-1 sm:text-base">Create Student</button>
            </div>
            <div className="flex flex-col items-center">
                <input onChange={(event) => setQuery(event.target.value)} value={query} type="text" placeholder="search student" className="bg-gray-300 mt-5 py-3 px-5 w-[70vw] rounded-full outline-0 text-sm sm:text-base sm:w-[60vw] md:w-[50vw] md:py-5"/>
                <div className="bg-gray-100 mt-5 w-screen rounded shadow-lg pb-1 sm:w-[98vw] md:w-[97vw] lg:w-[95vw] xl:w-[90vw]">
                    <div className="grid grid-cols-5 py-3 font-semibold text-xs sm:text-base">
                        <h1 className="flex justify-center items-center">Name</h1>
                        <h1 className="flex justify-center items-center">Student ID</h1>
                        <h1 className="flex justify-center items-center">Course</h1>
                        <h1 className="flex justify-center items-center">Semester</h1>
                        <h1 className="flex justify-center items-center">Action</h1>
                    </div>
                    <hr className="mb-3"/>
                    { students.length > 0 && query.trim() === "" ?
                        students.map(student => {
                            const attendance = student.classesAttended != 0 && student.courseId.classesDelivered[student.semester-1] ? Number(((student.classesAttended/student.courseId.classesDelivered[student.semester-1])*100).toFixed(2)) : 0;
                            return(
                                <div key={student.studentId} className="grid grid-cols-5 my-1 text-xs sm:text-sm lg:text-base">
                                    <h1 className="flex justify-center items-center">{student.userId.name}</h1>
                                    <h1 className="flex justify-center items-center">{student.studentId}</h1>
                                    <h1 className="flex justify-center items-center">{student.courseId.courseName}</h1>
                                    <h1 className="flex justify-center items-center">{student.semester}</h1>
                                    <div className="flex justify-center items-center hover:opacity-60 cursor-pointer">
                                        <img onClick={() => handleDeleteStudent(student.studentId,student.rollNo)} src={removeIcon} alt="removeIcon" className="w-4 h-4 sm:w-5 sm:h-5"/>
                                    </div>
                                </div>
                            )
                        }) : result.length > 0 && query.trim() !== "" ?
                        result.map(student => {
                            const attendance = student.classesAttended != 0 && student.courseId.classesDelivered[student.semester-1] ? Number(((student.classesAttended/student.courseId.classesDelivered[student.semester-1])*100).toFixed(2)) : 0;
                            return(
                                <div key={student.studentId} className="grid grid-cols-5 my-1 text-xs sm:text-base">
                                    <h1 className="flex justify-center items-center">{student.userId.name}</h1>
                                    <h1 className="flex justify-center items-center">{student.studentId}</h1>
                                    <h1 className="flex justify-center items-center">{student.courseId.courseName}</h1>
                                    <h1 className="flex justify-center items-center">{student.semester}</h1>
                                    <div className="flex justify-center items-center hover:opacity-60 cursor-pointer">
                                        <img onClick={() => handleDeleteStudent(student.studentId,student.rollNo)} src={removeIcon} alt="removeIcon" className="w-4 h-4 sm:w-5 sm:h-5"/>
                                    </div>
                                </div>
                            )
                        }) : <div>No student found</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Students;