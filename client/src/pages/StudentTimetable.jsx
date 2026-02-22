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
        await getSubjects(userIdentity.courseId,userIdentity.semester);
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
            <img onClick={() => navigate("/student-dashboard")} src={homeIcon} alt="homeIcon" className="absolute left-10 top-5 w-8 h-8 cursor-pointer"/>
            <CalendarHeader setSelectedDayAndDate={setSelectedDayAndDate} getDate={getDate}/>
            <Timetable filteredSubjects={subjects}/>
        </>
    )
}

export default StudentTimetable;