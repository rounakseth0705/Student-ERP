import { useContext, useEffect, useState } from "react";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";

const Students = () => {
    const { students, getStudents, deleteStudent } = useContext(AdminDashboardContext);
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
        const filteredStudents = students.filter(student => student.name.toLowerCase().includes(query.trim().toLowerCase()) || student.studentId === query.trim() || student.rollNo.includes(query.trim()) || student.courseId.courseName.toLowerCase().includes(query.trim().toLowerCase()));
        setResult(filteredStudents);
    },[query]);
    return(
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-semibold mt-5 sm:text-2xl md:text-4xl">LIST OF STUDENTS</h1>
            <input onChange={(event) => setQuery(event.target.value)} value={query} type="text" placeholder="search student" className="bg-gray-300 mt-5 py-3 px-5 w-[65vw] rounded-full outline-0 sm:w-[60vw] md:w-[50vw] md:py-5"/>

        </div>
    )
}

export default Students;