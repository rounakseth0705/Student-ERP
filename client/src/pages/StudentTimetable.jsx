// import { useContext, useEffect } from "react";
// import Timetable from "../components/Timetable";
// import { UserContext } from "../context/AuthContext.jsx";
// import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
// import CalendarHeader from "../components/CalendarHeader.jsx";
// import homeIcon from "../assets/homeIcon.svg";
// import { useNavigate } from "react-router-dom";

// const StudentTimetable = () => {
//     const { userIdentity, getDate, setSelectedDate, setSelectedDay, getSelectedDay } = useContext(UserContext);
//     const { subjects, getSubjects } = useContext(StudentDashboardContext);
//     const navigate = useNavigate();
//     const handleGetSubjects = async () => {
//         await getSubjects(userIdentity.courseId._id,userIdentity.semester);
//     }
//     const setSelectedDayAndDate = (index) => {
//         setSelectedDate(getDate(index));
//         setSelectedDay(getSelectedDay(index));
//     }
//     useEffect(() => {
//         handleGetSubjects();
//     },[]);
//     return(
//         <>
//             <img onClick={() => navigate("/student-dashboard")} src={homeIcon} alt="homeIcon" className="absolute left-5 top-3.5 w-5 h-5 cursor-pointer sm:left-10 sm:w-8 sm:h-8 sm:top-5"/>
//             <CalendarHeader setSelectedDayAndDate={setSelectedDayAndDate} getDate={getDate} toShow="Timetable"/>
//             <Timetable filteredSubjects={subjects}/>
//         </>
//     )
// }

// export default StudentTimetable;

import { useContext, useEffect } from "react";
import Timetable from "../components/Timetable";
import { UserContext } from "../context/AuthContext.jsx";
import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
import CalendarHeader from "../components/CalendarHeader.jsx";
import { useNavigate } from "react-router-dom";
// Premium Lucide Icon Asset Ecosystem
import { Home } from "lucide-react";

const StudentTimetable = () => {
    const { userIdentity, getDate, setSelectedDate, setSelectedDay, getSelectedDay } = useContext(UserContext);
    const { subjects, getSubjects } = useContext(StudentDashboardContext);
    const navigate = useNavigate();

    const handleGetSubjects = async () => {
        await getSubjects(userIdentity.courseId._id, userIdentity.semester);
    }

    const setSelectedDayAndDate = (index) => {
        setSelectedDate(getDate(index));
        setSelectedDay(getSelectedDay(index));
    }

    useEffect(() => {
        handleGetSubjects();
    }, []);

    return (
        <div className="bg-slate-950 min-h-screen text-slate-300 font-sans antialiased pb-16">
            
            {/* Dark Dashboard Navigation Header Block Bar Panel Container */}
            <div className="w-full px-4 pt-6 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto bg-[#090f1c]/60 border border-slate-900 rounded-2xl px-5 py-4 flex flex-row flex-nowrap items-center justify-between gap-4 shadow-xl">
                    
                    {/* Left Actions: Return to Main Student Dashboard Workspace Terminal */}
                    <button 
                        onClick={() => navigate("/student-dashboard")}
                        className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/40 border border-slate-800/30 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none shrink-0 flex items-center justify-center"
                        aria-label="Return to student terminal dashboard home"
                    >
                        <Home className="w-5 h-5" />
                    </button>
                    
                    {/* Centered Secondary Display Content Variable Header Label Placement Area */}
                    <div className="flex-1 min-w-0 text-center pr-2 sm:pr-10 md:pr-0">
                        <h1 className="text-lg font-bold uppercase tracking-wider text-slate-200 sm:text-xl md:text-2xl font-sans truncate">
                            Schedule Calendar Overview
                        </h1>
                    </div>

                    {/* Architectural layout balancing element to lock typographic center position */}
                    <div className="w-[42px] h-[42px] hidden md:block shrink-0 pointer-events-none" aria-hidden="true" />

                </div>
            </div>

            {/* Core Timetable Content Segment Stack Layout Grid wrapper */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 space-y-6">
                
                {/* Dynamically Populated Header Calendar Picker Block */}
                <CalendarHeader 
                    setSelectedDayAndDate={setSelectedDayAndDate} 
                    getDate={getDate} 
                    toShow="Timetable"
                />
                
                {/* Dynamically Rendered Filtered Data Class Period Manifest Block Container */}
                <Timetable filteredSubjects={subjects} />
                
            </main>
        </div>
    );
};

export default StudentTimetable;