// import { useNavigate } from "react-router-dom";
// import leftLongArrow from "../assets/leftLongArrow.svg";
// import CalendarHeader from "../components/CalendarHeader";
// import { useContext, useEffect, useRef } from "react";
// import { UserContext } from "../context/AuthContext.jsx";
// import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
// import clockIcon from "../assets/clockIcon.svg";

// const DayWiseAttendence = () => {
//     const { userIdentity, getDate, selectedDate, setSelectedDate, selectedDay, setSelectedDay, getSelectedDay, getCurrentClassTime } = useContext(UserContext);
//     const { todayAttendence, getTodayAttendence } = useContext(StudentDashboardContext);
//     const navigate = useNavigate();
//     const month = useRef(new Date().getMonth());
//     const year = useRef(new Date().getFullYear());
//     const setSelectedDayAndDate = (index) => {
//         setSelectedDate(getDate(index));
//         setSelectedDay(getSelectedDay(index));
//     }
//     const handleGetTodayAttendence = async () => {
//         await getTodayAttendence(selectedDate,month.current,year.current,userIdentity.courseId._id,userIdentity.semester);
//     }
//     useEffect(() => {
//         handleGetTodayAttendence();
//     },[selectedDate]);
//     return(
//         <>
//             <img onClick={() => navigate("/student-dashboard/attendance")} src={leftLongArrow} alt="ArrowIcon" className="absolute left-5 top-2.5 w-7 h-7 cursor-pointer sm:w-9 sm:h-9 sm:top-5 sm:left-10 md:left-15"/>
//             <CalendarHeader setSelectedDayAndDate={setSelectedDayAndDate} getDate={getDate} toShow="Day Wise Attendance"/>
//             <div className="mt-10 mx-5 pb-5 bg-gray-50 shadow-lg rounded sm:mx-20 md:mx-30 lg:mx-50">
//                 { selectedDay !== "Sat" && selectedDay !== "Sun" ?
//                     Array(6).fill("").map((_,index) => {
//                         const currentClassStartTime = getCurrentClassTime(index,55).replace(" am","").replace(" pm","");
//                         const currentClassEndTime = getCurrentClassTime(index,55,true).replace(" am","").replace(" pm","");
//                         const attendance = todayAttendence?.find(attendence => attendence.time.day === selectedDay && attendence.time.classTime === currentClassStartTime);
//                         let isPresent;
//                         if (attendance) {
//                             isPresent = attendance?.studentIds.some(studentId => studentId === userIdentity._id);
//                         }
//                         return todayAttendence?.length > 0 && (
//                             <div key={index} className="flex justify-evenly items-center py-3 border-b">
//                                 <span className="flex justify-between items-center gap-1 md:gap-2 lg:gap-3">
//                                     <img src={clockIcon} alt="clockIcon" className="w-4 h-4 sm:w-5 sm:h-5"/>
//                                     <h1 className="text-sm sm:text-base">{currentClassStartTime}-{currentClassEndTime}</h1>
//                                 </span>
//                                 <span className="flex justify-between items-center gap-3">
//                                     { attendance && isPresent ?
//                                         <h1 className="bg-blue-400 text-white px-1 text-sm sm:text-base">P</h1> : attendance && !isPresent ?
//                                         <h1 className="bg-red-400 text-white px-1 text-sm sm:text-base">A</h1> :
//                                         <h1>Not yet marked</h1>
//                                     }
//                                     <h1>{attendance?.subjectId?.subjectName}</h1>
//                                 </span>
//                             </div>
//                         )
//                     }) : <h1 className="text-center font-semibold">No Attendance available</h1>
//                 }
//             </div>
//         </>
//     )
// }

// export default DayWiseAttendence;

import { useNavigate } from "react-router-dom";
import CalendarHeader from "../components/CalendarHeader";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { StudentDashboardContext } from "../context/StudentDashboardContext.jsx";
// Premium Lucide Icons Ecosystem
import { ArrowLeft, Clock, CheckCircle2, XCircle, AlertCircle, CalendarRange } from "lucide-react";

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
        await getTodayAttendence(selectedDate, month.current, year.current, userIdentity.courseId._id, userIdentity.semester);
    }

    useEffect(() => {
        handleGetTodayAttendence();
    }, [selectedDate]);

    return (
        <div className="bg-slate-950 min-h-screen text-slate-300 font-sans antialiased pb-16">
            
            {/* Header Navigation Panel Block Bar */}
            <div className="w-full px-4 pt-6 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto bg-[#090f1c]/60 border border-slate-900 rounded-2xl px-5 py-4 flex flex-row flex-nowrap items-center justify-between gap-4 shadow-xl">
                    
                    {/* Left Actions: Return to Main Attendance Analytics Hub */}
                    <button 
                        onClick={() => navigate("/student-dashboard/attendance")}
                        className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/40 border border-slate-800/30 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 focus:outline-none shrink-0 flex items-center justify-center"
                        aria-label="Back to attendance overview ledger"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    
                    {/* Centered Secondary Display Heading */}
                    <div className="flex-1 min-w-0 text-center pr-2 sm:pr-10 md:pr-0">
                        <h1 className="text-lg font-bold uppercase tracking-wider text-slate-200 sm:text-xl md:text-2xl font-sans truncate">
                            Roll Call Records
                        </h1>
                    </div>

                    {/* Dynamic layout balancing matrix node block spacer */}
                    <div className="w-[42px] h-[42px] hidden md:block shrink-0 pointer-events-none" aria-hidden="true" />
                </div>
            </div>

            {/* Calendar Selector Component Integration Frame */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <CalendarHeader setSelectedDayAndDate={setSelectedDayAndDate} getDate={getDate} toShow="Day Wise Attendance"/>
            </div>

            {/* Core Attendance Listing Manifest Repository Area */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="bg-[#090f1c] border border-slate-900 rounded-2xl p-4 sm:p-6 shadow-xl">
                    
                    {selectedDay !== "Sat" && selectedDay !== "Sun" ? (
                        <div className="space-y-3">
                            {Array(6).fill("").map((_, index) => {
                                const currentClassStartTime = getCurrentClassTime(index, 55).replace(" am", "").replace(" pm", "");
                                const currentClassEndTime = getCurrentClassTime(index, 55, true).replace(" am", "").replace(" pm", "");
                                const attendance = todayAttendence?.find(attendence => attendence.time.day === selectedDay && attendence.time.classTime === currentClassStartTime);
                                
                                let isPresent;
                                if (attendance) {
                                    isPresent = attendance?.studentIds.some(studentId => studentId === userIdentity._id);
                                }

                                return todayAttendence?.length > 0 && (
                                    <div 
                                        key={index} 
                                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-950/40 border border-slate-900/60 rounded-xl hover:border-slate-800 transition-all group"
                                    >
                                        {/* Left Axis Information Column: Scheduled Class Period Marker */}
                                        <div className="flex items-center gap-2.5 shrink-0 text-slate-400 group-hover:text-slate-200 transition-colors">
                                            <Clock className="w-4 h-4 text-slate-500" />
                                            <span className="text-xs sm:text-sm font-mono font-bold tracking-tight">
                                                {currentClassStartTime} <span className="text-slate-700 mx-0.5">-</span> {currentClassEndTime}
                                            </span>
                                        </div>

                                        {/* Right Context Block Column: Dynamic Verified Status Badge Switch Module */}
                                        <div className="flex items-center justify-between sm:justify-end gap-6 flex-1 min-w-0">
                                            
                                            {/* Course Unit Designation Subject Label Title */}
                                            <h4 className="text-xs sm:text-sm font-bold text-slate-300 truncate sm:order-1 group-hover:text-white transition-colors">
                                                {attendance?.subjectId?.subjectName || <span className="text-slate-600 font-mono italic font-normal">Unassigned Module</span>}
                                            </h4>

                                            {/* Status Badge Component Output Container */}
                                            <div className="shrink-0 sm:order-2">
                                                {attendance && isPresent ? (
                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg tracking-wide uppercase">
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                        <span>Present</span>
                                                    </div>
                                                ) : attendance && !isPresent ? (
                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold rounded-lg tracking-wide uppercase">
                                                        <XCircle className="w-3.5 h-3.5" />
                                                        <span>Absent</span>
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 text-slate-500 text-xs font-semibold rounded-lg font-mono">
                                                        <AlertCircle className="w-3.5 h-3.5 text-slate-600" />
                                                        <span>Pending Mark</span>
                                                    </div>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-950/30 border border-slate-900/50 rounded-xl">
                            <CalendarRange className="w-8 h-8 text-slate-600 mb-2.5" />
                            <h3 className="text-sm font-bold text-slate-400">Recess Operational Window</h3>
                            <p className="text-[11px] text-slate-500 max-w-xs mt-1">
                                No formal class matrices or standard academic attendance monitoring parameters are generated on weekend logs.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default DayWiseAttendence;