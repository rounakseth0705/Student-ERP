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
            <img onClick={() => navigate("/student-dashboard/attendence")} src={leftLongArrow} alt="ArrowIcon" className="absolute left-15 top-5 w-10 h-10 cursor-pointer"/>
            <CalendarHeader setSelectedDayAndDate={setSelectedDayAndDate} getDate={getDate} toShow="Day Wise Attendence"/>
            <div className="mt-10 mx-60 pb-5 bg-gray-50 shadow-lg rounded">
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
                                <span className="flex justify-between items-center gap-3">
                                    <img src={clockIcon} alt="clockIcon" className="w-5 h-5"/>
                                    <h1>{currentClassStartTime}-{currentClassEndTime}</h1>
                                </span>
                                <span className="flex justify-between items-center gap-3">
                                    { attendance && isPresent ?
                                        <h1 className="bg-blue-400 text-white px-1">P</h1> : attendance && !isPresent ?
                                        <h1 className="bg-red-400 text-white px-1">A</h1> :
                                        <h1>Attendance not yet marked</h1>
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