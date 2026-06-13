// import { useContext, useEffect } from "react";
// import { UserContext } from "../context/AuthContext.jsx";
// import clockIcon from "../assets/clockIcon.svg";
// import plusIcon from "../assets/plusIcon.svg";
// import { useNavigate } from "react-router-dom";
// import removeIcon from "../assets/removeIcon.svg";
// import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";

// const Timetable = ({ filteredSubjects, courseId, semester }) => {
//     const { userIdentity, getCurrentClassTime, selectedDay } = useContext(UserContext);
//     const { deleteSchedule } = useContext(AdminDashboardContext);
//     const navigate = useNavigate();
//     const handleDeleteSchedule = async (subjectId) => {
//         await deleteSchedule(subjectId,selectedDay);
//     }
//     return(
//         <div className="my-2 mx-3 py-5 px-1 rounded-2xl shadow-lg sm:mx-10 sm:px-3 md:mx-15 md:px-4 lg:px-10">
//             {
//                 Array(6).fill("").map((_,classIndex) => {
//                     const currentClassStartTime = getCurrentClassTime(classIndex,55).replace(" am","").replace(" pm","");
//                     const currentClassEndTime = getCurrentClassTime(classIndex,55,true).replace(" am","").replace(" pm","");
//                     const assignedSubject = filteredSubjects.find(subject => subject.schedule?.some(schedule => schedule.day === selectedDay && schedule.classTime === currentClassStartTime));
//                     return(
//                         <div key={classIndex} className="flex justify-between border rounded my-2 mx-2 py-5 sm:mx-4">
//                             { selectedDay !== "Sat" && selectedDay !== "Sun" ?
//                                 <>
//                                     <div className="flex flex-col justify-center items-center gap-1 text-sm pl-5 sm:text-base md:flex-row md:gap-2 md:px-3 lg:px-5 lg:mx-8 xl:mx-20">
//                                         <img src={clockIcon} alt="clockIcon" className="w-4 h-4 sm:w-5 sm:h-5"/>
//                                         <h1 className="text-xs sm:text-base">{currentClassStartTime}-{currentClassEndTime}</h1>
//                                     </div>
//                                     { filteredSubjects.length > 0 ?
//                                         assignedSubject ?
//                                             <div className="flex flex-col justify-center items-center gap-2 pr-5 sm:flex-row md:gap-5 md:px-3 lg:gap-12 lg:px-5 lg:mx-8 xl:mx-20">
//                                                 <span className="flex flex-col justify-center items-center sm:inline">
//                                                     <h1 className="text-xs sm:text-base">{assignedSubject.subjectName}</h1>
//                                                     <h1 className="text-blue-600 text-xs sm:text-base">{assignedSubject.teacherId.userId?.name.toUpperCase()}</h1>
//                                                 </span>
//                                                 { !userIdentity && <button onClick={() => navigate(`/admin-dashboard/courses/${assignedSubject._id}/${courseId}/${semester}/${selectedDay}/${currentClassStartTime}/updateSchedule`)} className="bg-amber-500 text-white rounded cursor-pointer py-2 px-1.5 hover:bg-amber-400 transition-all duration-400 ease-in-out text-xs sm:text-base sm:px-2 md:px-3">Update Schedule</button> }
//                                                 { !userIdentity &&
//                                                     <img onClick={() => handleDeleteSchedule(assignedSubject._id)} src={removeIcon} alt="removeIcon" className="w-4 h-4 cursor-pointer hover:opacity-60 transition-all duration-400 ease-in-out sm:w-5 sm:h-5"/>
//                                                 }
//                                             </div> :
//                                             !userIdentity ?
//                                                 <button onClick={() => navigate(`/admin-dashboard/courses/${courseId}/${semester}/${selectedDay}/${currentClassStartTime}/assignSchedule`)} className="flex justify-center items-center gap-1 mx-4 px-2 py-2 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-500 transition-all duration-400 ease-in-out text-xs sm:text-base sm:px-5 sm:mx-8 md:mx-10 xl:mx-30">
//                                                 Assign Subject
//                                                 <img src={plusIcon} alt="plusIcon" className="w-4 h-4 sm:w-5 sm:h-5"/>
//                                                 </button> :
//                                                 <h1 className="mx-6 text-xs sm:text-base sm:mx-10 md:mx-15 lg:mx-20 xl:mx-30">Not yet scheduled</h1> :
//                                         <div className="mx-6 text-xs sm:text-base sm:mx-10 md:mx-15 lg:mx-20 xl:mx-30">No Subject</div>
//                                     }
//                                 </> : <h1 className="text-xs mx-auto font-semibold sm:text-base">No timetable available</h1>
//                             }
//                         </div>
//                     )
//                 })
//             }
//         </div>
//     )
// }

// export default Timetable;

import { useContext, useEffect } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
// Premium Lucide Icons Ecosystem
import { Clock, Plus, Trash2, CalendarDays, AlertTriangle } from "lucide-react";

const Timetable = ({ filteredSubjects, courseId, semester }) => {
    const { userIdentity, getCurrentClassTime, selectedDay } = useContext(UserContext);
    const { deleteSchedule } = useContext(AdminDashboardContext);
    const navigate = useNavigate();

    const handleDeleteSchedule = async (subjectId) => {
        await deleteSchedule(subjectId, selectedDay);
    }

    return (
        <div className="w-full bg-[#090f1c] border border-slate-900 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
            
            {/* Header Interactive Metadata Section Panel Banner */}
            <div className="flex items-center gap-2 pb-2 border-b border-slate-900/60">
                <CalendarDays className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-200 tracking-tight">
                    Schedule Manifest Matrix <span className="text-slate-500 font-mono text-xs font-semibold ml-1">({selectedDay})</span>
                </h3>
            </div>

            {/* Weekend Logical Filter Safeguard Evaluator Area */}
            {selectedDay !== "Sat" && selectedDay !== "Sun" ? (
                <div className="space-y-3">
                    {Array(6).fill("").map((_, classIndex) => {
                        const currentClassStartTime = getCurrentClassTime(classIndex, 55).replace(" am", "").replace(" pm", "");
                        const currentClassEndTime = getCurrentClassTime(classIndex, 55, true).replace(" am", "").replace(" pm", "");
                        const assignedSubject = filteredSubjects.find(subject => 
                            subject.schedule?.some(schedule => schedule.day === selectedDay && schedule.classTime === currentClassStartTime)
                        );

                        return (
                            <div 
                                key={classIndex} 
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-950/40 border border-slate-900 rounded-xl hover:border-slate-800/80 transition-all group"
                            >
                                {/* Left Frame Block Column: Time Axis Point Indication */}
                                <div className="flex items-center gap-2.5 shrink-0 text-slate-400 group-hover:text-slate-200 transition-colors">
                                    <Clock className="w-4 h-4 text-slate-500" />
                                    <span className="text-xs sm:text-sm font-mono font-bold tracking-tight">
                                        {currentClassStartTime} <span className="text-slate-700 mx-0.5">-</span> {currentClassEndTime}
                                    </span>
                                </div>

                                {/* Right Frame Block Column: Structural Slot Assignment Switch Pattern Logic */}
                                <div className="flex-1 flex flex-row items-center justify-between sm:justify-end gap-4 min-w-0">
                                    {filteredSubjects.length > 0 ? (
                                        assignedSubject ? (
                                            <div className="flex items-center justify-between sm:justify-end gap-3.5 flex-1 min-w-0">
                                                
                                                {/* Text Elements Vector Container Column Block */}
                                                <div className="text-left sm:text-right min-w-0">
                                                    <h4 className="text-xs sm:text-sm font-bold text-slate-200 truncate group-hover:text-white transition-colors">
                                                        {assignedSubject.subjectName}
                                                    </h4>
                                                    <p className="text-[10px] sm:text-xs font-bold font-mono text-blue-400 uppercase tracking-wide mt-0.5 truncate">
                                                        {assignedSubject.teacherId.userId?.name}
                                                    </p>
                                                </div>

                                                {/* Modifiers Container Buttons Clustered Track Row Area */}
                                                {!userIdentity && (
                                                    <div className="flex items-center gap-1.5 shrink-0">
                                                        <button 
                                                            onClick={() => navigate(`/admin-dashboard/courses/${assignedSubject._id}/${courseId}/${semester}/${selectedDay}/${currentClassStartTime}/updateSchedule`)} 
                                                            className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 text-amber-500 hover:text-amber-400 hover:border-slate-700 text-xs font-semibold rounded-lg transition-all active:scale-95 cursor-pointer focus:outline-none"
                                                        >
                                                            Update
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDeleteSchedule(assignedSubject._id)}
                                                            className="p-1.5 bg-slate-900 border border-slate-800 text-slate-500 hover:text-rose-400 hover:border-rose-950 rounded-lg transition-all active:scale-95 cursor-pointer"
                                                            title="Delete Schedule Segment"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                )}

                                            </div>
                                        ) : !userIdentity ? (
                                            /* Administrative Subject Allocation Deployment Entry Trigger Pin Pointer */
                                            <button 
                                                onClick={() => navigate(`/admin-dashboard/courses/${courseId}/${semester}/${selectedDay}/${currentClassStartTime}/assignSchedule`)} 
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 hover:border-blue-500 text-xs font-bold rounded-xl shadow-md active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none"
                                            >
                                                <span>Assign Subject</span>
                                                <Plus className="w-3.5 h-3.5" />
                                            </button>
                                        ) : (
                                            <span className="text-xs sm:text-sm font-medium text-slate-600 font-mono italic">
                                                No lecture scheduled
                                            </span>
                                        )
                                    ) : (
                                        <span className="text-xs sm:text-sm text-slate-600 font-medium font-mono italic">
                                            No subject database configuration
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-950/30 border border-slate-900 rounded-xl">
                    <AlertTriangle className="w-7 h-7 text-slate-600 mb-2" />
                    <h4 className="text-xs sm:text-sm font-bold text-slate-400">Recess Intermission Block</h4>
                    <p className="text-[11px] text-slate-600 max-w-xs mt-0.5">
                        No standard timetable modules or academic tracking courses are distributed or required on weekend schedules.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Timetable;