import { useContext } from "react";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
import { useEffect } from "react";
import removeIcon from "../assets/removeIcon.svg";
import { useState } from "react";

const Teachers = () => {
    const { teachers, getTeachers, deleteTeacher } = useContext(AdminDashboardContext);
    const [query, setQuery] = useState("");
    const [result, setResult] = useState("");
    const handleGetTeachers = async () => {
        await getTeachers();
    }
    const handleDeleteTeacher = async (teacherId,employeeId) => {
        await deleteTeacher(teacherId,employeeId);
    }
    useEffect(() => {
        handleGetTeachers();
    },[]);
    useEffect(() => {
        const filteredTeachers = teachers.filter((teacher) => teacher.name.toLowerCase().includes(query.trim()) || teacher.teacherId.includes(query.trim()) || teacher.employeeId.includes(query.trim()) || teacher.courseId.courseCode.toLowerCase().includes(query.trim()));
        setResult(filteredTeachers);
    },[query]);
    return(
        <>
            <h1 className="text-center text-4xl font-semibold mt-5">LIST OF TEACHERS</h1>
            <div className="flex flex-col items-center">
                <input onChange={(event) => setQuery(event.target.value)} value={query} type="text" placeholder="search teacher" className="m-5 p-5 bg-gray-300 outline-0 rounded-full w-150"/>
                <div className="p-5 w-350 bg-blue-100 shadow-lg rounded">
                    <div className="grid grid-cols-6 gap-3 my-5 mx-auto font-semibold text-blue-950 text-2xl">
                        <h1>S.NO.</h1>
                        <h1>TEACHER NAME</h1>
                        <h1>COURSE CODE</h1>
                        <h1>TEACHER ID</h1>
                        <h1>EMPLOYEE ID</h1>
                        <h1>ACTION</h1>
                    </div>
                    { query.trim() === "" && teachers.length > 0 ?
                        teachers.map((teacher,index) => (
                            <div key={index} className="grid grid-cols-6 gap-1 my-2">
                                <h1 className="pl-5 ml-3">{index+1}</h1>
                                <h1 className="ml-3">{teacher.name}</h1>
                                <h1 className="ml-3">{teacher.courseId.courseCode}</h1>
                                <h1 className="ml-3">{teacher.teacherId}</h1>
                                <h1 className="ml-3">{teacher.employeeId}</h1>
                                <img onClick={() =>  handleDeleteTeacher(teacher.teacherId,teacher.employeeId)} src={removeIcon} alt="removeIcon" className="ml-8 w-5 h-5 cursor-pointer hover:opacity-60 transition-all duration-400 ease-in-out"/>
                            </div>
                        )) : query.trim() !== "" && result.length > 0 ?
                        result.map((teacher,index) => (
                            <div key={index} className="grid grid-cols-6 gap-1 my-2">
                                <h1 className="pl-5 ml-3">{index+1}</h1>
                                <h1 className="ml-3">{teacher.name}</h1>
                                <h1 className="ml-3">{teacher.courseId.courseCode}</h1>
                                <h1 className="ml-3">{teacher.teacherId}</h1>
                                <h1 className="ml-3">{teacher.employeeId}</h1>
                                <img onClick={() =>  handleDeleteTeacher(teacher.teacherId,teacher.employeeId)} src={removeIcon} alt="removeIcon" className="ml-8 w-5 h-5 cursor-pointer hover:opacity-60 transition-all duration-400 ease-in-out"/>
                            </div>
                        )) : <div className="text-center">No teacher found</div>
                    }
                </div>
        </div>
        </>
    )
}

export default Teachers;