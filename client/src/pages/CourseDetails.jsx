import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminDashboardContext } from "../context/AdminDashboardContext.jsx";
import React from "react";
import plusIcon from "../assets/plusIcon.svg";
// import removeIcon from "../assets/removeIcon.svg";
// import editIcon from "../assets/editIcon.svg";
import clockIcon from "../assets/clockIcon.svg";
import leftLongArrow from "../assets/leftLongArrow.svg";
import { useState } from "react";
import CourseDetailsCard from "../components/CourseDetailsCard.jsx";
import { UserContext } from "../context/AuthContext.jsx";
import CalendarHeader from "../components/CalendarHeader.jsx";
import SemesterSubjectList from "../components/SemesterSubjectList.jsx";

const CourseDetails = () => {
    const { course, subjects, getCourse, getSubjects, setSelectedDate, selectedDay, setSelectedDay, currentDate, day } = useContext(UserContext);
    const { deleteCourse } = useContext(AdminDashboardContext);
    const { courseId } = useParams();
    const navigate = useNavigate();
    // const [isEditing, setIsEditing] = useState(false);
    // const [subjectCode, setSubjectCode] = useState("");
    // const [newTeacherId, setNewTeacherId] = useState("");
    // const [day, setDay] = useState(new Date().toLocaleString("en-US", { weekday: "short" }));
    // const [currentDate, setCurrentDate] = useState(new Date().getDate());
    // const [selectedDate, setSelectedDate] = useState(new Date().getDate());
    // const [selectedDay, setSelectedDay] = useState(new Date().toLocaleString("en-US", { weekday: "short" }));
    const handleGetCourse = async () => {
        await getCourse(courseId);
    }
    const handleDeleteCourse = async () => {
        await deleteCourse(course.courseCode);
    }
    const handleGetSubjects = async () => {
        await getSubjects(courseId);
    }
    const getCurrentClassTime = (index,minutesToAdd,isEndTime=false) => {
        const date = new Date();
        date.setHours(9,30,0,0);
        date.setMinutes(date.getMinutes() + (minutesToAdd*index));
        if (index > 3) {
            date.setMinutes(date.getMinutes() + 60);
        }
        if (!isEndTime) {
            return date.toLocaleString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
        }
        if (isEndTime) {
            date.setMinutes(date.getMinutes() + minutesToAdd);
            return date.toLocaleString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
        }
    }
    const getDate = (index) => {
        let dayToShow;
        let totalDays;
        if (day === "Mon") {
            dayToShow = currentDate - 0 + index;
            if (dayToShow < 1) {
                totalDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
                dayToShow = totalDays - dayToShow;
            }
            return dayToShow;
        } else if (day === "Tue") {
            dayToShow = currentDate - 1 + index;
            if (dayToShow < 1) {
                totalDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
                dayToShow = totalDays - dayToShow;
            }
            return dayToShow;
        } else if (day === "Wed") {
            dayToShow = currentDate - 2 + index;
            if (dayToShow < 1) {
                totalDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
                dayToShow = totalDays - dayToShow;
            }
            return dayToShow;
        } else if (day === "Thu") {
            dayToShow = currentDate - 3 + index;
            if (dayToShow < 1) {
                totalDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
                dayToShow = totalDays - dayToShow;
            }
            return dayToShow;
        } else if (day === "Fri") {
            dayToShow = currentDate - 4 + index;
            if (dayToShow < 1) {
                totalDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
                dayToShow = totalDays - dayToShow;
            }
            return dayToShow;
        } else if (day === "Sat") {
            dayToShow = currentDate - 5 + index;
            if (dayToShow < 1) {
                totalDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
                dayToShow = totalDays - dayToShow;
            }
            return dayToShow;
        } else if (day === "Sun") {
            dayToShow = currentDate - 6 + index;
            if (dayToShow < 1) {
                totalDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
                dayToShow = totalDays - dayToShow;
            }
            return dayToShow;
        }
    }
    const getSelectedDay = (index) => {
        if (index === 0) {
            return "Mon";
        } else if (index === 1) {
            return "Tue";
        } else if (index === 2) {
            return "Wed";
        } else if (index === 3) {
            return "Thu";
        } else if (index === 4) {
            return "Fri";
        } else if (index === 5) {
            return "Sat";
        } else if (index === 6) {
            return "Sun";
        }
    }
    const setSelectedDayAndDate = (index) => {
        setSelectedDate(getDate(index));
        setSelectedDay(getSelectedDay(index));
    }
    const handlePreviousWeek = () => {
        // const sevenDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7));
        // setCurrentDate(sevenDaysAgo.getDate());
    }
    const handleNextWeek = () => {
        // const sevenDaysLater = new Date(new Date().setDate(new Date().getDate() + 7));
        // setCurrentDate(sevenDaysLater.getDate());
    }
    useEffect(() => {
        handleGetCourse();
        handleGetSubjects();
    },[]);
    return(
        <>
            <img onClick={() => navigate("/admin-dashboard/courses")} src={leftLongArrow} alt="ArrowIcon" className="absolute left-15 top-5 w-10 h-10 cursor-pointer"/>
            <h1 className="text-center text-blue-950 m-5 text-3xl font-semibold">Course Details</h1>
            <div className="flex flex-col justify-center items-center gap-5">
                <CourseDetailsCard courseName={course.courseName} courseCode={course.courseCode} duration={course.duration} semesters={course.semesters}/>
                <div className="flex justify-center items-center">
                    <button onClick={handleDeleteCourse} className="bg-red-600 text-white rounded mt-2 py-2 px-5 cursor-pointer hover:bg-red-500 transition-all duration-400 ease-in-out sm:mt-5 sm:text-2xl">Delete course</button>
                </div>
            </div>
            <div className="mt-5">
                {
                    Array(course.semesters).fill("").map((_,semester) => {
                        const filteredSubjects = subjects.filter(subject => subject.semester === semester+1);
                        return(
                            <React.Fragment key={semester}>
                                <h1 className="text-white bg-blue-400 font-semibold text-3xl text-center p-3 my-3">{course.courseName} - Semester {semester+1}</h1>
                                {/* <div className="flex justify-center items-center gap-12 sm:gap-50 md:gap-80 lg:gap-150 xl:gap-200">
                                    { filteredSubjects.length > 0 && <h1 className="text-blue-950 text-2xl font-semibold p-2 ml-2 sm:mx-5">Subjects List</h1> }
                                    <button onClick={() => navigate(`/admin-dashboard/courses/${courseId}/${course.courseCode}/${semester+1}/create-subject`)} className="flex justify-center items-center gap-1 bg-blue-600 text-white text-sm rounded cursor-pointer p-2 mr-2 hover:bg-blue-500 transition-all duration-400 ease-in-out sm:text-base sm:mx-5">Add Subject</button>
                                </div> */}
                                <SemesterSubjectList filteredSubjects={filteredSubjects} courseId={courseId} courseCode={course.courseCode} semester={semester+1}/>
                                {/* { filteredSubjects.length > 0 &&
                                    <div className="mt-5 mx-2 bg-blue-50 text-blue-950 text-sm rounded shadow-lg sm:text-base sm:mx-3 md:mx-5 lg:mx-10">
                                        <div className="grid grid-cols-4 font-semibold py-2 sm:px-2">
                                            <h1 className="flex justify-center sm:mx-2 md:mx-2 lg:mx-7">NAME</h1>
                                            <h1 className="flex justify-center sm:mx-2 md:mx-2 lg:mx-7">CODE</h1>
                                            <h1 className="flex justify-center sm:mx-2 md:mx-2 lg:mx-7">TEACHER</h1>
                                            <h1 className="flex justify-center sm:mx-2 md:mx-2 lg:mx-7">ACTION</h1>
                                        </div>
                                        { filteredSubjects.length > 0 &&
                                            filteredSubjects.map((subject,index) => (
                                                <React.Fragment key={index}>
                                                    <hr/>
                                                    <div className="grid grid-cols-4 p-2">
                                                        <h1 className="flex justify-center flex-wrap sm:mx-2 md:mx-2 lg:mx-7">{subject.subjectName}</h1>
                                                        <h1 className="flex justify-center sm:mx-2 md:mx-2 lg:mx-7">{subject.subjectCode}</h1>
                                                        <div className="flex justify-center gap-1 sm:gap-2">
                                                            { isEditing && subject.subjectCode===subjectCode ? <input onChange={(event) => setNewTeacherId(event.target.value)} value={newTeacherId} type="text" className="border rounded px-1 w-20 sm:w-25 md:w-30"/> : <h1 className="sm:mx-2 md:mx-2 lg:mx-7">{subject.teacherId.teacherId}</h1> }
                                                            { (isEditing && subject.subjectCode===subjectCode) && <img onClick={() => handleEditTeacherId(subject.subjectCode,subject.teacherId.teacherId)} src={checkIcon} alt="checkIcon" className="w-5 h-5 cursor-pointer" /> }
                                                        </div>
                                                        <div className="flex justify-center gap-1 sm:gap-2 sm:mx-2 md:gap-3 md:mx-2 lg:mx-7">
                                                            <img onClick={() => {
                                                                setIsEditing(true);
                                                                setSubjectCode(subject.subjectCode);
                                                            }} src={editIcon} alt="editIcon" className="w-4 h-4 cursor-pointer hover:opacity-60 transition-all duration-400 ease-in-out sm:w-5 sm:h-5" />
                                                            <img onClick={() => handleDeleteSubject(subject._id)} src={removeIcon} alt="removeIcon" className="w-4 h-4 cursor-pointer hover:opacity-60 transition-all duration-400 ease-in-out sm:w-5 sm:h-5" />
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            ))
                                        }
                                    </div>
                                } */}
                                {/* <h1 className="text-center mt-15 text-4xl font-semibold text-blue-950">Timetable</h1>
                                <div className="flex justify-between items-center bg-blue-400 mt-5 text-white">
                                    <img onClick={handlePreviousWeek} src={leftArrow} alt="leftArrow" className="w-10 h-10 mx-10 cursor-pointer"/>
                                    <h1 className="my-5 text-2xl font-semibold">{new Date().toLocaleString("en-US", { month: "long" })} ({new Date().getFullYear()})</h1>
                                    <img onClick={handleNextWeek} src={rightArrow} alt="rightArrow" className="w-10 h-10 mx-10 cursor-pointer"/>
                                </div>
                                <div className="bg-blue-300 grid grid-cols-7 mt-1 mx-3 py-3 text-blue-950 sm:mx-10 md:mx-15 xl:px-3">
                                    <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Mon</h1>
                                    <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Tue</h1>
                                    <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Wed</h1>
                                    <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Thu</h1>
                                    <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Fri</h1>
                                    <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Sat</h1>
                                    <h1 className="flex justify-center items-center text-sm sm:text-base sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10">Sun</h1>
                                </div>
                                <div className="grid grid-cols-7 mx-3 py-3 shadow-lg sm:mx-10 md:mx-15 xl:px-3">
                                    {
                                        Array(7).fill("").map((_,index) => (
                                            <h1 onClick={() => setSelectedDayAndDate(index)} key={index} className={`flex justify-center items-center font-semibold rounded-2xl cursor-pointer ${selectedDate === getDate(index) && "bg-amber-500 shadow-md text-white"} sm:mx-3 md:mx-5 lg:mx-7 xl:mx-10`}>{getDate(index)}</h1>
                                        ))
                                    }
                                </div> */}
                                <CalendarHeader setSelectedDayAndDate={setSelectedDayAndDate} getDate={getDate}/>
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
                                                                            <h1 className="text-blue-600 text-sm sm:text-base">{assignedSubject.teacherId.name.toUpperCase()}</h1>
                                                                        </span>
                                                                        <button onClick={() => navigate(`/admin-dashboard/courses/${courseId}/${semester+1}/${selectedDay}/${currentClassStartTime}/updateSchedule`)} className="bg-amber-500 text-white rounded cursor-pointer py-2 px-1.5 hover:bg-amber-400 transition-all duration-400 ease-in-out sm:px-2 md:px-3">Update Schedule</button>
                                                                    </div> :
                                                                    <button onClick={() => navigate(`/admin-dashboard/courses/${courseId}/${semester+1}/${selectedDay}/${currentClassStartTime}/assignSchedule`)} className="flex justify-center items-center gap-1 mx-4 px-2 py-2 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-500 transition-all duration-400 ease-in-out sm:px-5 sm:mx-8 md:mx-10 xl:mx-30">
                                                                        Assign Subject
                                                                        <img src={plusIcon} alt="plusIcon" className="w-5 h-5"/>
                                                                    </button> :
                                                                <div className="mx-6 sm:mx-10 md:mx-15 lg:mx-20 xl:mx-30">No Subject</div>
                                                            }
                                                        </> : <h1 className="mx-auto font-semibold">No timetable available</h1>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </>
    )
}

export default CourseDetails;


// filteredSubjects.map((subject,index) => {
//                                                                     const isAssigned = subject.schedule?.some(schedule => schedule.day === selectedDay && schedule.classTime === currentClassStartTime);
//                                                                     return(
//                                                                         <React.Fragment key={index}>
//                                                                             { isAssigned ?
//                                                                                 <div className="flex flex-col justify-center items-center gap-2 pr-5 sm:flex-row md:gap-5 md:px-3 lg:gap-12 lg:px-5 lg:mx-8 xl:mx-20">
//                                                                                     <span className="flex flex-col justify-center items-center sm:inline">
//                                                                                         <h1>{subject.subjectName}</h1>
//                                                                                         <h1 className="text-blue-600 text-sm sm:text-base">{subject.teacherId.name.toUpperCase()}</h1>
//                                                                                     </span>
//                                                                                     <button onClick={() => navigate(`/admin-dashboard/courses/${courseId}/${semester+1}/${selectedDay}/${currentClassStartTime}/updateSchedule`)} className="bg-amber-500 text-white rounded cursor-pointer py-2 px-1.5 hover:bg-amber-400 transition-all duration-400 ease-in-out sm:px-2 md:px-3">Update Schedule</button>
//                                                                                 </div> :
//                                                                                 <button onClick={() => navigate(`/admin-dashboard/courses/${courseId}/${semester+1}/${selectedDay}/${currentClassStartTime}/assignSchedule`)} key={index} className="flex justify-center items-center gap-1 mx-4 px-2 py-2 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-500 transition-all duration-400 ease-in-out sm:px-5 sm:mx-8 md:mx-10 xl:mx-30">
//                                                                                     Assign Subject
//                                                                                     <img src={plusIcon} alt="plusIcon" className="w-5 h-5"/>
//                                                                                 </button>
//                                                                             }
//                                                                         </React.Fragment>
//                                                                     )
//                                                                 })