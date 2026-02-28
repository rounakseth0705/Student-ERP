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
    const [activeAttendanceId, setActiveAttendanceId] = useState(null);
    const handleAttendanceHistory = async () => {
        await attendanceHistory(userIdentity._id);
    }
    const handleArrowOpen = (attendanceId) => {
        setActiveAttendanceId(attendanceId);
        setIsOpen(prev => !prev);
    }
    useEffect(() => {
        handleAttendanceHistory();
    },[]);
    return(
        <>
            <TeacherFeaturesHeader toDisplay="Attendance History"/>
            <div className="mt-5">
                { attendances.length > 0 ?
                    attendances.map((attendance,index) => (
                        <React.Fragment key={index}>
                            <div className="flex justify-between items-center bg-blue-200 rounded shadow-lg">
                                <span className="cursor-pointer px-7">
                                    <img onClick={() => handleArrowOpen(attendance._id)} src={rightArrowBlack} alt="rightArrowBlack" className={`w-5 h-5 duration-300 ${activeIndex === index && isOpen ? "rotate-90" : "rotate-0"}`}/>
                                </span>
                                <h1>{attendance.subjectId.subjectName}</h1>
                                <h1>{attendance.semester}</h1>
                                <h1 className="px-7">{new Date(attendance.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</h1>
                            </div>
                            { (isOpen && activeAttendanceId === attendance._id) &&
                                <div className="bg-blue-300 py-5 rounded">
                                    {
                                        attendance?.studentIds.map((student,index) => (
                                            <div key={index} className="flex justify-evenly items-center py-2">
                                                <h1>name</h1>
                                                <h1>Roll no.</h1>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        </React.Fragment>
                    )) : <div>No attendance has been marked by you in this semester</div>
                }
            </div>
        </>
    )
}

export default AttendenceHistory;