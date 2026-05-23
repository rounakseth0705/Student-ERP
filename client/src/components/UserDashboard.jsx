import { useNavigate } from "react-router-dom";
import calendarIcon from "../assets/calendarIcon.svg";
import alarmClockIcon from "../assets/alarmClockIcon.svg";
import openBookIcon from "../assets/openBookIcon.svg";
import bookIcon from "../assets/bookIcon.svg";
import notesIcon from "../assets/notesIcon.svg";
import chalkboardPersonIcon from "../assets/chalkboardPerson.svg";
import magnifyingGlassIcon from "../assets/magnifyingGlassIcon.svg";
import infoIcon from "../assets/infoIcon.svg";
import markIcon from "../assets/markIcon.svg";
import clipboardUserIcon from "../assets/clipboardUser.svg";
import userGraduateIcon from "../assets/userGraduateIcon.svg";
import plusIcon from "../assets/plusIcon.svg";

const UserDashboard = ({ role, option1, option2, option3, option4, option5, option6, dashboard, navigate1, navigate2, navigate3, navigate4, navigate5, navigate6 }) => {
    const navigate = useNavigate();
    return(
        <>
            <div className="flex items-center gap-4 mt-[3vh] mx-[4vw] py-[2vh] px-[2vw] rounded-2xl shadow-lg sm:gap-5 sm:mx-[2vw] sm:px-[5vw] lg:mt-[4vh]">
                <img src={magnifyingGlassIcon} alt="magnifierIcon" className="w-5 h-5"/>
                <input type="text" placeholder="Search modules..." className="outline-none text-gray-600"/>
            </div>
            <div className="grid gird-rows-6 grid-cols-1 gap-7 text-white font-semibold my-[5vh] mx-12 h-[75vh] sm:h-[60vh] sm:my-10 sm:mx-15 md:mx-20 lg:mx-40 lg:h-[75vh] sm:grid-rows-3 sm:grid-cols-2">
                <div onClick={() => navigate(`/${dashboard}/${navigate1}`)} className="flex items-center justify-center gap-5 rounded-2xl bg-red-400 hover:scale-105 hover:shadow-lg hover:shadow-red-400 active:scale-105 active:shadow-lg active:shadow-red-400 transition-all duration-800 ease-in-out cursor-pointer">
                    <h1 className="sm:text-2xl">{option1}</h1>
                    <img src={role==="student" ? calendarIcon : role==="admin" ? chalkboardPersonIcon : openBookIcon} alt="calendarIcon" className="w-10 h-10 sm:w-20 sm:h-20"/>
                </div>
                <div onClick={() => navigate(`/${dashboard}/${navigate2}`)} className="flex items-center justify-center gap-5 rounded-2xl bg-purple-400 hover:scale-105 hover:shadow-lg hover:shadow-purple-400 active:scale-105 active:shadow-lg active:shadow-purple-400 transition-all duration-800 ease-in-out cursor-pointer">
                    <h1 className="sm:text-2xl">{option2}</h1>
                    <img src={role==="student" ? alarmClockIcon : role==="admin" ? plusIcon : infoIcon} alt="alarmClockIcon" className="w-10 h-10 sm:w-20 sm:h-20"/>
                </div>
                <div onClick={() => navigate(`/${dashboard}/${navigate3}`)} className="flex items-center justify-center gap-5 rounded-2xl bg-orange-400 hover:scale-105 hover:shadow-lg hover:shadow-orange-400 active:scale-105 active:shadow-lg active:shadow-orange-400 transition-all duration-800 ease-in-out cursor-pointer">
                    <h1 className="sm:text-2xl">{option3}</h1>
                    <img src={role==="student" ? openBookIcon : role==="admin" ? userGraduateIcon : notesIcon} alt="openBookIcon" className="w-10 h-10 sm:w-20 sm:h-20"/>
                </div>
                <div onClick={() => navigate(`/${dashboard}/${navigate4}`)} className="flex items-center justify-center gap-5 rounded-2xl bg-green-400 hover:scale-105 hover:shadow-lg hover:shadow-green-400 active:scale-105 active:shadow-lg active:shadow-green-400 transition-all duration-800 ease-in-out cursor-pointer">
                    <h1 className="sm:text-2xl">{option4}</h1>
                    <img src={role==="student" ? notesIcon : role==="admin" ? plusIcon : markIcon} alt="notesIcon" className="w-10 h-10 sm:w-20 sm:h-20"/>
                </div>
                <div onClick={() => navigate(`/${dashboard}/${navigate5}`)} className="flex items-center justify-center gap-5 rounded-2xl bg-blue-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500 active:scale-105 active:shadow-lg active:shadow-blue-500 transition-all duration-800 ease-in-out cursor-pointer">
                    <h1 className="sm:text-2xl">{option5}</h1>
                    <img src={role==="student" ? bookIcon : role==="admin" ? bookIcon : userGraduateIcon} alt="bookIcon" className="w-10 h-10 sm:w-20 sm:h-20"/>
                </div>
                <div onClick={() => navigate(`/${dashboard}/${navigate6}`)} className="flex items-center justify-center gap-5 rounded-2xl bg-indigo-600 hover:scale-105 hover:shadow-lg hover:shadow-indigo-600 active:scale-105 active:shadow-lg active:shadow-indigo-600 transition-all duration-800 ease-in-out cursor-pointer">
                    <h1 className="sm:text-2xl">{option6}</h1>
                    <img src={role==="student" ? bookIcon : clipboardUserIcon} alt="bookIcon" className="w-10 h-10 sm:w-20 sm:h-20"/>
                </div>
            </div>
        </>
    )
}

export default UserDashboard;