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
                <input onChange={(event) => setQuery(event.target.value)} value={query} type="text" placeholder="search teacher" className="m-5 px-5 py-3 bg-gray-300 outline-0 rounded-full w-80 sm:w-100 md:py-5 md:w-110 lg:w-150"/>
                <div className="p-5 w-120 bg-blue-100 shadow-lg rounded sm:w-150 md:w-200 lg:w-250 xl:w-350">
                    <div className="grid grid-cols-5 gap-3 my-5 mx-auto font-semibold text-blue-950 md:text-2xl">
                        <h1 className="flex justify-center border">TEACHER NAME</h1>
                        <h1 className="flex justify-center border">COURSE CODE</h1>
                        <h1 className="flex justify-center border">TEACHER ID</h1>
                        <h1 className="flex justify-center border">EMPLOYEE ID</h1>
                        <h1 className="flex justify-center border">ACTION</h1>
                    </div>
                    { query.trim() === "" && teachers.length > 0 ?
                        teachers.map((teacher,index) => (
                            <div key={index} className="grid grid-cols-5 gap-1 my-2">
                                <h1 className="flex justify-center border">{teacher.name}</h1>
                                <h1 className="flex justify-center border">{teacher.courseId.courseCode}</h1>
                                <h1 className="flex justify-center border">{teacher.teacherId}</h1>
                                <h1 className="flex justify-center border">{teacher.employeeId}</h1>
                                <div className="flex justify-center border">
                                    <img onClick={() =>  handleDeleteTeacher(teacher.teacherId,teacher.employeeId)} src={removeIcon} alt="removeIcon" className="w-5 h-5 cursor-pointer hover:opacity-60 transition-all duration-400 ease-in-out"/>
                                </div>
                            </div>
                        )) : query.trim() !== "" && result.length > 0 ?
                        result.map((teacher,index) => (
                            <div key={index} className="grid grid-cols-5 gap-1 my-2">
                                <h1 className="flex justify-center border">{teacher.name}</h1>
                                <h1 className="flex justify-center border">{teacher.courseId.courseCode}</h1>
                                <h1 className="flex justify-center border">{teacher.teacherId}</h1>
                                <h1 className="flex justify-center border">{teacher.employeeId}</h1>
                                <div className="flex justify-center border">
                                    <img onClick={() =>  handleDeleteTeacher(teacher.teacherId,teacher.employeeId)} src={removeIcon} alt="removeIcon" className="w-5 h-5 cursor-pointer hover:opacity-60 transition-all duration-400 ease-in-out"/>
                                </div>
                            </div>
                        )) : <div className="text-center">No teacher found</div>
                    }
                </div>
        </div>
        </>
    )
}

export default Teachers;