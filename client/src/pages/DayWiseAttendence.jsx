import { useNavigate } from "react-router-dom";
import leftLongArrow from "../assets/leftLongArrow.svg";
import CalendarHeader from "../components/CalendarHeader";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
import clockIcon from "../assets/clockIcon.svg";

const DayWiseAttendence = () => {
    const { userIdentity, getDate, selectedDate, setSelectedDate, selectedDay, setSelectedDay, getSelectedDay, getCurrentClassTime } = useContext(UserContext);
    const { todayAttendence, getTodayAttendence } = useContext(StudentDashboardContext);
    const navigate = useNavigate();
    const month = useRef(new Date().getMonth());
    const year = useRef(new Date().getFullYear());
    const setSelectedDayAndDate = (index) => {
        setSelectedDate(getDate(index));
        setSelectedDay(getSelectedDay(index));
    }
    const handleGetTodayAttendence = async () => {
        await getTodayAttendence(selectedDate,month.current,year.current,userIdentity.courseId._id,userIdentity.semester);
    }
    useEffect(() => {
        handleGetTodayAttendence();
    },[selectedDate]);
    return(
        <>
            <img onClick={() => navigate("/student-dashboard/attendance")} src={leftLongArrow} alt="ArrowIcon" className="absolute left-5 top-2.5 w-7 h-7 cursor-pointer sm:w-9 sm:h-9 sm:top-5 sm:left-10 md:left-15"/>
            <CalendarHeader setSelectedDayAndDate={setSelectedDayAndDate} getDate={getDate} toShow="Day Wise Attendance"/>
            <div className="mt-10 mx-5 pb-5 bg-gray-50 shadow-lg rounded sm:mx-20 md:mx-30 lg:mx-50">
                { selectedDay !== "Sat" && selectedDay !== "Sun" ?
                    Array(6).fill("").map((_,index) => {
                        const currentClassStartTime = getCurrentClassTime(index,55).replace(" am","").replace(" pm","");
                        const currentClassEndTime = getCurrentClassTime(index,55,true).replace(" am","").replace(" pm","");
                        const attendance = todayAttendence?.find(attendence => attendence.time.day === selectedDay && attendence.time.classTime === currentClassStartTime);
                        let isPresent;
                        if (attendance) {
                            isPresent = attendance?.studentIds.some(studentId => studentId === userIdentity._id);
                        }
                        return todayAttendence?.length > 0 && (
                            <div key={index} className="flex justify-evenly items-center py-3 border-b">
                                <span className="flex justify-between items-center gap-1 md:gap-2 lg:gap-3">
                                    <img src={clockIcon} alt="clockIcon" className="w-4 h-4 sm:w-5 sm:h-5"/>
                                    <h1 className="text-sm sm:text-base">{currentClassStartTime}-{currentClassEndTime}</h1>
                                </span>
                                <span className="flex justify-between items-center gap-3">
                                    { attendance && isPresent ?
                                        <h1 className="bg-blue-400 text-white px-1 text-sm sm:text-base">P</h1> : attendance && !isPresent ?
                                        <h1 className="bg-red-400 text-white px-1 text-sm sm:text-base">A</h1> :
                                        <h1>Not yet marked</h1>
                                    }
                                    <h1>{attendance?.subjectId?.subjectName}</h1>
                                </span>
                            </div>
                        )
                    }) : <h1 className="text-center font-semibold">No Attendance available</h1>
                }
            </div>
        </>
    )
}

export default DayWiseAttendence;