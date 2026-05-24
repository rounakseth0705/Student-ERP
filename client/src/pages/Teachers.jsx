import { useContext } from "react";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
import { useEffect } from "react";
import removeIcon from "../assets/removeIcon.svg";
import homeIcon from "../assets/homeIcon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Teachers = () => {
    const { teachers, getTeachers, deleteTeacher } = useContext(AdminDashboardContext);
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);
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
        const filteredTeachers = teachers.filter((teacher) => teacher.userId.name.toLowerCase().includes(query.trim().toLowerCase()) || teacher.teacherId.includes(query.trim()) || teacher.employeeId.includes(query.trim()) || teacher.courseId.courseName.toLowerCase().includes(query.trim().toLowerCase()));
        setResult(filteredTeachers);
    },[query]);
    return(
        <div className="bg-blue-100 min-h-screen">
            <div className="flex justify-between items-center px-[2vw] py-[2vh] sm:px-5 sm:py-6 lg:py-4">
                <img onClick={() => navigate("/admin-dashboard")} src={homeIcon} alt="homeIcon" className="w-5 h-5 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
                <h1 className="font-semibold sm:text-3xl lg:text-4xl">LIST OF TEACHERS</h1>
                <button className="bg-blue-500 text-white cursor-pointer p-1 rounded text-xs sm:text-base">Create Teacher</button>
            </div>
            <div className="flex flex-col items-center">
                <input onChange={(event) => setQuery(event.target.value)} value={query} type="text" placeholder="search teacher" className="my-2 px-5 py-2 bg-gray-300 outline-0 rounded-full w-[70vw] text-sm sm:text-base sm:my-4 sm:w-100 sm:py-4 md:px-7 md:w-110 lg:py-5 lg:w-150 lg:my-5"/>
                <div className="bg-gray-100 shadow-2xl rounded w-[97vw] py-3 my-2 sm:py-5 sm:px-2 sm:my-4 sm:w-[95vw] md:px-3 lg:my-2 lg:px-4 xl:px-5">
                    <div className="grid grid-cols-4 gap-x-1 gap-y-3 mb-3 mx-auto font-semibold text-blue-950 text-xs sm:text-base sm:gap-x-2 lg:gap-3 lg:mb-4 lg:text-2xl">
                        <h1 className="flex justify-center">NAME</h1>
                        <h1 className="flex justify-center">COURSE</h1>
                        <h1 className="flex justify-center">TEACHER ID</h1>
                        <h1 className="flex justify-center">ACTION</h1>
                    </div>
                    <hr />
                    { query.trim() === "" && teachers.length > 0 ?
                        teachers.map((teacher,index) => (
                            <div key={index} className="grid grid-cols-4 gap-1 my-2 text-xs sm:text-base">
                                <h1 className="flex justify-center">{teacher.userId.name}</h1>
                                <h1 className="flex justify-center">{teacher.courseId.courseName}</h1>
                                <h1 className="flex justify-center">{teacher.teacherId}</h1>
                                <div className="flex justify-center">
                                    <img onClick={() =>  handleDeleteTeacher(teacher.teacherId,teacher.employeeId)} src={removeIcon} alt="removeIcon" className="w-4 h-4 cursor-pointer hover:opacity-60 transition-all duration-400 ease-in-out sm:w-5 sm:h-5"/>
                                </div>
                            </div>
                        )) : query.trim() !== "" && result.length > 0 ?
                        result.map((teacher,index) => (
                            <div key={index} className="grid grid-cols-4 gap-1 my-2 text-xs sm:text-base">
                                <h1 className="flex justify-center">{teacher.userId.name}</h1>
                                <h1 className="flex justify-center">{teacher.courseId.courseName}</h1>
                                <h1 className="flex justify-center">{teacher.teacherId}</h1>
                                <div className="flex justify-center">
                                    <img onClick={() =>  handleDeleteTeacher(teacher.teacherId,teacher.employeeId)} src={removeIcon} alt="removeIcon" className="w-4 h-4 cursor-pointer hover:opacity-60 transition-all duration-400 ease-in-out sm:w-5 sm:h-5"/>
                                </div>
                            </div>
                        )) : <div className="text-center">No teacher found</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Teachers;