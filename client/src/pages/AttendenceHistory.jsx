import { useContext } from "react";
import TeacherFeaturesHeader from "../components/TeacherFeaturesHeader.jsx";
import { TeacherDashboardContext } from "../context/TeacherDashboardContext.jsx";
import { useEffect } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import rightArrowBlack from "../assets/rightArrowBlack.svg";
import { useState } from "react";
import React from "react";

const AttendenceHistory = () => {
    const { userIdentity } = useContext(UserContext);
    const { attendanceHistory, attendances } = useContext(TeacherDashboardContext);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [activeAttendanceId, setActiveAttendanceId] = useState(null);
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);
    const handleAttendanceHistory = async () => {
        await attendanceHistory(userIdentity._id);
    }
    const handleArrowOpen = (attendanceId,index) => {
        setActiveIndex(index);
        setActiveAttendanceId(attendanceId);
        setIsOpen(prev => !prev);
    }
    useEffect(() => {
        handleAttendanceHistory();
    },[]);
    useEffect(() => {
        const filteredAttendances = attendances.filter(attendance => attendance.subjectId.subjectName.toLowerCase().includes(query.trim().toLowerCase()) || new Date(attendance.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).includes(query.trim()));
        setResult(filteredAttendances);
    },[query]);
    return(
        <>
            <TeacherFeaturesHeader toDisplay="Attendance History"/>
            { attendances.length > 0 &&
                <div className="my-5 text-center">
                    <input onChange={(event) => setQuery(event.target.value)} value={query} type="text" placeholder="search attendance" className="w-[65vw] outline-0 rounded-3xl bg-gray-200 px-3 py-3 sm:px-5 sm:w-[50vw] md:w-[40vw] lg:w-[30vw]"/>
                </div>
            }
            <div className="mt-5 mx-3 sm:mx-10 md:mx-15 lg:mx-25 xl:mx-30">
                { attendances.length > 0 && query.trim() === "" ?
                    attendances.map((attendance,index) => (
                        <React.Fragment key={index}>
                            <div className="flex justify-between items-center bg-blue-200 rounded shadow-lg my-5 p-3 text-xs sm:text-base">
                                <span className="mx-1 sm:mx-5 lg:mx-10">
                                    <img onClick={() => handleArrowOpen(attendance._id,index)} src={rightArrowBlack} alt="rightArrowBlack" className={`cursor-pointer w-5 h-5 duration-300 ${activeIndex === index && isOpen ? "rotate-90" : "rotate-0"}`}/>
                                </span>
                                <h1 className="mx-1 sm:mx-5 lg:mx-10">{attendance.subjectId.subjectName}</h1>
                                <h1 className="mx-1 sm:mx-5 lg:mx-10">Semester {attendance.semester}</h1>
                                <h1 className="mx-1 sm:mx-5 lg:mx-10">{new Date(attendance.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
                            </div>
                            { (isOpen && activeAttendanceId === attendance._id) &&
                                <div className="bg-blue-300 mx-20 py-2 rounded">
                                    {
                                        attendance?.studentIds.map((student,index) => (
                                            <div key={index} className="flex justify-evenly items-center py-1">
                                                <h1>{index+1}.</h1>
                                                <h1>{student.userId.name}</h1>
                                                <h1>{student.rollNo}</h1>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </React.Fragment>
                    )) : result.length > 0 && query.trim() !== "" ?
                    result.map((attendance,index) => (
                        <React.Fragment key={index}>
                            <div className="flex justify-between items-center bg-blue-200 rounded shadow-lg my-5 p-3 text-sm sm:text-base">
                                <span className="mx-1 sm:mx-5 lg:mx-10">
                                    <img onClick={() => handleArrowOpen(attendance._id,index)} src={rightArrowBlack} alt="rightArrowBlack" className={`cursor-pointer w-5 h-5 duration-300 ${activeIndex === index && isOpen ? "rotate-90" : "rotate-0"}`}/>
                                </span>
                                <h1 className="mx-1 sm:mx-5 lg:mx-10">{attendance.subjectId.subjectName}</h1>
                                <h1 className="mx-1 sm:mx-5 lg:mx-10">Semester {attendance.semester}</h1>
                                <h1 className="mx-1 sm:mx-5 lg:mx-10">{new Date(attendance.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
                            </div>
                            { (isOpen && activeAttendanceId === attendance._id) &&
                                <div className="bg-blue-300 mx-20 py-2 rounded">
                                    {
                                        attendance?.studentIds.map((student,index) => (
                                            <div key={index} className="flex justify-evenly items-center py-1">
                                                <h1>{index+1}.</h1>
                                                <h1>{student.userId.name}</h1>
                                                <h1>{student.rollNo}</h1>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </React.Fragment>
                    )) : <div className="text-center">You haven't marked any attendance in this semester</div>
                }
            </div>
        </>
    )
}

export default AttendenceHistory;