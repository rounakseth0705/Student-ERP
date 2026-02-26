import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/homeIcon.svg";
import { useContext, useRef } from "react";
import { UserContext } from "../context/AuthContext.jsx";

const Attendence = () => {
    const { userIdentity } = useContext(UserContext);
    const semester = useRef(userIdentity?.semester);
    const navigate = useNavigate();
    return(
        <div>
            <img onClick={() => navigate("/student-dashboard")} src={homeIcon} alt="homeIcon" className="absolute left-10 top-5 w-8 h-8 cursor-pointer"/>
            <h1 className="text-center mt-5 text-4xl text-blue-950 font-semibold">Attendance</h1>
            <div className="flex flex-col justify-between gap-3 mt-10 mx-80 rounded shadow-lg py-5 px-15 bg-gray-50 font-semibold">
                <span className="flex justify-between items-center">
                    <h1 className="text-2xl">Overall Attendance</h1>
                    <h1 className="text-2xl">{userIdentity.attendence}%</h1>
                </span>
                <span className="flex flex-col py-3">
                    <span className="flex justify-between items-center px-5">
                    <h1>Total Classes Delivered</h1>
                    <h1>{userIdentity?.courseId?.classesDelivered[semester.current-1]}</h1>
                </span>
                <span className="flex justify-between items-center px-5">
                    <h1>Total Classes Attended</h1>
                    <h1>{userIdentity.classesAttended}</h1>
                </span>
                </span>
            </div>
            <div className="grid grid-cols-1 gap-12 mx-80 mt-10 text-white text-2xl">
                <div onClick={() => navigate("day-wise")} className="flex justify-center items-center bg-blue-500 py-10 px-5 rounded cursor-pointer hover:bg-blue-400 transition-all duration-400 ease-in-out">Day Wise Attendance</div>
                <div onClick={() => navigate("subject-wise")} className="flex justify-center items-center bg-blue-500 py-10 px-5 rounded cursor-pointer hover:bg-blue-400 transition-all duration-400 ease-in-out">Subject Wise Attendance</div>
            </div>
        </div>
    )
}

export default Attendence;