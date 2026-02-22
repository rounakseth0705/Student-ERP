import { useContext, useEffect } from "react";
import { UserContext } from "../context/AuthContext.jsx";
import clockIcon from "../assets/clockIcon.svg";
import plusIcon from "../assets/plusIcon.svg";
import { useNavigate } from "react-router-dom";

const Timetable = ({ filteredSubjects, courseId, semester }) => {
    const { userIdentity, getCurrentClassTime, selectedDay } = useContext(UserContext);
    const navigate = useNavigate();
    return(
        <div className="my-2 mx-3 py-5 px-1 rounded-2xl shadow-lg sm:mx-10 sm:px-3 md:mx-15 md:px-4 lg:px-10">
            {
                Array(6).fill("").map((_,classIndex) => {
                    const currentClassStartTime = getCurrentClassTime(classIndex,55).replace(" am","").replace(" pm","");
                    const currentClassEndTime = getCurrentClassTime(classIndex,55,true).replace(" am","").replace(" pm","");
                    const assignedSubject = filteredSubjects.find(subject => subject.schedule?.some(schedule => schedule.day === selectedDay && schedule.classTime === currentClassStartTime));
                    return(
                        <div key={classIndex} className="flex justify-between border rounded my-2 mx-2 py-5 sm:mx-4">
                            { selectedDay !== "Sat" && selectedDay !== "Sun" ?
                                <>
                                    <div className="flex flex-col justify-center items-center gap-1 text-sm pl-3 sm:text-base md:flex-row md:gap-2 md:px-3 lg:px-5 lg:mx-8 xl:mx-20">
                                        <img src={clockIcon} alt="clockIcon" className="w-5 h-5"/>
                                        <h1>{currentClassStartTime}-{currentClassEndTime}</h1>
                                    </div>
                                    { filteredSubjects.length > 0 ?
                                        assignedSubject ?
                                            <div className="flex flex-col justify-center items-center gap-2 pr-5 sm:flex-row md:gap-5 md:px-3 lg:gap-12 lg:px-5 lg:mx-8 xl:mx-20">
                                                <span className="flex flex-col justify-center items-center sm:inline">
                                                    <h1>{assignedSubject.subjectName}</h1>
                                                    <h1 className="text-blue-600 text-sm sm:text-base">{assignedSubject.teacherId.userId?.name.toUpperCase()}</h1>
                                                </span>
                                                { !userIdentity && <button onClick={() => navigate(`/admin-dashboard/courses/${courseId}/${semester}/${selectedDay}/${currentClassStartTime}/updateSchedule`)} className="bg-amber-500 text-white rounded cursor-pointer py-2 px-1.5 hover:bg-amber-400 transition-all duration-400 ease-in-out sm:px-2 md:px-3">Update Schedule</button> }
                                            </div> :
                                            !userIdentity ?
                                                <button onClick={() => navigate(`/admin-dashboard/courses/${courseId}/${semester}/${selectedDay}/${currentClassStartTime}/assignSchedule`)} className="flex justify-center items-center gap-1 mx-4 px-2 py-2 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-500 transition-all duration-400 ease-in-out sm:px-5 sm:mx-8 md:mx-10 xl:mx-30">
                                                Assign Subject
                                                <img src={plusIcon} alt="plusIcon" className="w-5 h-5"/>
                                                </button> :
                                                <h1 className="mx-6 sm:mx-10 md:mx-15 lg:mx-20 xl:mx-30">Not yet scheduled</h1> :
                                        <div className="mx-6 sm:mx-10 md:mx-15 lg:mx-20 xl:mx-30">No Subject</div>
                                    }
                                </> : <h1 className="mx-auto font-semibold">No timetable available</h1>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Timetable;