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
        <div className="flex flex-col justify-center items-center">
            <img onClick={() => navigate("/admin-dashboard")} src={homeIcon} alt="homeIcon" className="absolute left-15 top-5 w-10 h-10 cursor-pointer"/>
            <h1 className="text-2xl font-semibold mt-5 sm:text-2xl md:text-4xl">LIST OF STUDENTS</h1>
            <input onChange={(event) => setQuery(event.target.value)} value={query} type="text" placeholder="search student" className="bg-gray-300 mt-5 py-3 px-5 w-[65vw] rounded-full outline-0 sm:w-[60vw] md:w-[50vw] md:py-5"/>
            <div className="bg-blue-100 mt-5 w-[90vw] rounded shadow-lg pb-1">
                <div className="grid grid-cols-7 py-3 font-semibold">
                    <h1 className="flex justify-center items-center">Name</h1>
                    <h1 className="flex justify-center items-center">Student ID</h1>
                    <h1 className="flex justify-center items-center">Course</h1>
                    <h1 className="flex justify-center items-center">Roll No.</h1>
                    <h1 className="flex justify-center items-center">Semester</h1>
                    <h1 className="flex justify-center items-center">Attendence</h1>
                    <h1 className="flex justify-center items-center">Action</h1>
                </div>
                <hr className="mb-3"/>
                { students.length > 0 && query.trim() === "" ?
                    students.map(student => (
                        <div key={student.studentId} className="grid grid-cols-7 my-1">
                            <h1 className="flex justify-center items-center">{student.userId.name}</h1>
                            <h1 className="flex justify-center items-center">{student.studentId}</h1>
                            <h1 className="flex justify-center items-center">{student.courseId.courseName}</h1>
                            <h1 className="flex justify-center items-center">{student.rollNo}</h1>
                            <h1 className="flex justify-center items-center">{student.semester}</h1>
                            <h1 className="flex justify-center items-center">{student.attendence}%</h1>
                            <div className="flex justify-center items-center hover:opacity-60 cursor-pointer">
                                <img onClick={() => handleDeleteStudent(student.studentId,student.rollNo)} src={removeIcon} alt="removeIcon" className="w-5 h-5"/>
                            </div>
                        </div>
                    )) : result.length > 0 && query.trim() !== "" ?
                    result.map(student => (
                        <div key={student.studentId} className="grid grid-cols-7 my-1">
                            <h1 className="flex justify-center items-center">{student.userId.name}</h1>
                            <h1 className="flex justify-center items-center">{student.studentId}</h1>
                            <h1 className="flex justify-center items-center">{student.courseId.courseName}</h1>
                            <h1 className="flex justify-center items-center">{student.rollNo}</h1>
                            <h1 className="flex justify-center items-center">{student.semester}</h1>
                            <h1 className="flex justify-center items-center">{student.attendence}%</h1>
                            <div className="flex justify-center items-center hover:opacity-60 cursor-pointer">
                                <img onClick={() => handleDeleteStudent(student.studentId,student.rollNo)} src={removeIcon} alt="removeIcon" className="w-5 h-5"/>
                            </div>
                        </div>
                    )) : <div>No student found</div>
                }
            </div>
        </div>
    )
}

export default Students;