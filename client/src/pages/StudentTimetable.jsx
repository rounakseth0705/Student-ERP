import { useContext, useEffect } from "react";
import Timetable from "../components/Timetable";
import { UserContext } from "../context/AuthContext.jsx";
import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
import CalendarHeader from "../components/CalendarHeader.jsx";
import homeIcon from "../assets/homeIcon.svg";
import { useNavigate } from "react-router-dom";

const StudentTimetable = () => {
    const { userIdentity, getDate, setSelectedDate, setSelectedDay, getSelectedDay } = useContext(UserContext);
    const { subjects, getSubjects } = useContext(StudentDashboardContext);
    const navigate = useNavigate();
    const handleGetSubjects = async () => {
        await getSubjects(userIdentity.courseId._id,userIdentity.semester);
    }
    const setSelectedDayAndDate = (index) => {
        setSelectedDate(getDate(index));
        setSelectedDay(getSelectedDay(index));
    }
    useEffect(() => {
        handleGetSubjects();
    },[]);
    return(
        <>
            <img onClick={() => navigate("/student-dashboard")} src={homeIcon} alt="homeIcon" className="absolute left-5 top-3.5 w-5 h-5 cursor-pointer sm:left-10 sm:w-8 sm:h-8 sm:top-5"/>
            <CalendarHeader setSelectedDayAndDate={setSelectedDayAndDate} getDate={getDate} toShow="Timetable"/>
            <Timetable filteredSubjects={subjects}/>
        </>
    )
}

export default StudentTimetable;