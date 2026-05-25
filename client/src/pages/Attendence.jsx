import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/homeIcon.svg";
import { useContext, useRef } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import calendarIcon from "../assets/calendarIcon.svg";
import clipboardCheckIcon from "../assets/clipboardCheckIcon.svg";

const Attendence = () => {
    const { userIdentity } = useContext(UserContext);
    const semester = useRef(userIdentity?.semester);
    const navigate = useNavigate();
    return(
        <div className="bg-blue-100 min-h-screen">
            <div className="flex justify-between items-center px-[2vw] py-[2vh] sm:px-5 sm:py-6 lg:py-4">
                <img onClick={() => navigate("/student-dashboard")} src={homeIcon} alt="homeIcon" className="w-6 h-6 cursor-pointer sm:w-8 sm:h-8 lg:w-10 lg:h-10"/>
                <h1 className="text-blue-950 font-semibold sm:text-2xl lg:text-3xl">Attendance</h1>
                <button onClick={() => navigate("/student-dashboard/timetable")} className="bg-blue-500 text-white text-xs cursor-pointer p-1 rounded sm:text-base">Timetable</button>
            </div>
            <div className="flex flex-col justify-between gap-3 mt-10 mx-10 rounded shadow-lg py-5 px-3 bg-gray-50 font-semibold sm:mx-20 md:mx-30 lg:mx-50 2xl:mx-80 sm:px-10 md:px-12 lg:px-15">
                <span className="flex justify-between items-center">
                    <h1 className="sm:text-2xl">Overall Attendance</h1>
                    <h1 className="sm:text-2xl">{Number(((userIdentity.classesAttended/userIdentity.courseId.classesDelivered[userIdentity.semester-1])*100).toFixed(2))}%</h1>
                </span>
                <span className="flex flex-col py-3">
                    <span className="flex justify-between items-center px-2 sm:px-5">
                        <h1 className="text-xs sm:text-base">Total Classes Delivered</h1>
                        <h1 className="text-xs sm:text-base">{userIdentity?.courseId?.classesDelivered[semester.current-1]}</h1>
                    </span>
                    <span className="flex justify-between items-center px-2 sm:px-5">
                        <h1 className="text-xs sm:text-base">Total Classes Attended</h1>
                        <h1 className="text-xs sm:text-base">{userIdentity.classesAttended}</h1>
                    </span>
                </span>
            </div>
            <div className="grid grid-cols-1 gap-12 mx-15 mt-10 text-white sm:mx-20 md:mx-30 lg:mx-50 2xl:mx-80 sm:text-2xl">
                <div onClick={() => navigate("day-wise")} className="flex justify-center items-center gap-2 bg-blue-500 py-7 px-3 rounded cursor-pointer hover:bg-blue-400 transition-all duration-400 ease-in-out sm:py-10">
                    <img src={calendarIcon} alt="calenderIcon" className="w-8 h-8 sm:w-10 sm:h-10"/>
                    <h1>Day Wise Attendance</h1>
                </div>
                <div onClick={() => navigate("subject-wise")} className="flex justify-center items-center gap-2 bg-blue-500 py-7 px-3 rounded cursor-pointer hover:bg-blue-400 transition-all duration-400 ease-in-out sm:py-10">
                    <img src={clipboardCheckIcon} alt="clipboardCheckIcon" className="w-8 h-8 sm:w-10 sm:h-10"/>
                    <h1>Subject Wise Attendance</h1>
                </div>
            </div>
        </div>
    )
}

export default Attendence;