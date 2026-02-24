import { useNavigate } from "react-router-dom";
import leftLongArrow from "../assets/leftLongArrow.svg";
import CalendarHeader from "../components/CalendarHeader";
import { useContext } from "react";
import { UserContext } from "../context/AuthContext.jsx";

const DayWiseAttendence = () => {
    const { getDate, setSelectedDate, setSelectedDay, getSelectedDay } = useContext(UserContext);
    const navigate = useNavigate();
    const setSelectedDayAndDate = (index) => {
        setSelectedDate(getDate(index));
        setSelectedDay(getSelectedDay(index));
    }
    return(
        <div>
            <img onClick={() => navigate("/student-dashboard/attendence")} src={leftLongArrow} alt="ArrowIcon" className="absolute left-15 top-5 w-10 h-10 cursor-pointer"/>
            <CalendarHeader setSelectedDayAndDate={setSelectedDayAndDate} getDate={getDate} toShow="Day Wise Attendence"/>
        </div>
    )
}

export default DayWiseAttendence;